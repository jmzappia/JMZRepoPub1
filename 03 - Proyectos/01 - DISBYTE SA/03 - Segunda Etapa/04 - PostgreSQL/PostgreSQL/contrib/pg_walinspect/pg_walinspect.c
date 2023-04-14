/*-------------------------------------------------------------------------
 *
 * pg_walinspect.c
 *		  Functions to inspect contents of PostgreSQL Write-Ahead Log
 *
 * Copyright (c) 2022-2023, PostgreSQL Global Development Group
 *
 * IDENTIFICATION
 *		  contrib/pg_walinspect/pg_walinspect.c
 *
 *-------------------------------------------------------------------------
 */
#include "postgres.h"

#include "access/xlog.h"
#include "access/xlog_internal.h"
#include "access/xlogreader.h"
#include "access/xlogrecovery.h"
#include "access/xlogstats.h"
#include "access/xlogutils.h"
#include "funcapi.h"
#include "miscadmin.h"
#include "utils/array.h"
#include "utils/builtins.h"
#include "utils/pg_lsn.h"

/*
 * NOTE: For any code change or issue fix here, it is highly recommended to
 * give a thought about doing the same in pg_waldump tool as well.
 */

PG_MODULE_MAGIC;

PG_FUNCTION_INFO_V1(pg_get_wal_block_info);
PG_FUNCTION_INFO_V1(pg_get_wal_record_info);
PG_FUNCTION_INFO_V1(pg_get_wal_records_info);
PG_FUNCTION_INFO_V1(pg_get_wal_records_info_till_end_of_wal);
PG_FUNCTION_INFO_V1(pg_get_wal_stats);
PG_FUNCTION_INFO_V1(pg_get_wal_stats_till_end_of_wal);

static void ValidateInputLSNs(XLogRecPtr start_lsn, XLogRecPtr *end_lsn);
static XLogRecPtr GetCurrentLSN(void);
static XLogReaderState *InitXLogReaderState(XLogRecPtr lsn);
static XLogRecord *ReadNextXLogRecord(XLogReaderState *xlogreader);
static void GetWALRecordInfo(XLogReaderState *record, Datum *values,
							 bool *nulls, uint32 ncols);
static void GetWALRecordsInfo(FunctionCallInfo fcinfo,
							  XLogRecPtr start_lsn,
							  XLogRecPtr end_lsn);
static void GetXLogSummaryStats(XLogStats *stats, ReturnSetInfo *rsinfo,
								Datum *values, bool *nulls, uint32 ncols,
								bool stats_per_record);
static void FillXLogStatsRow(const char *name, uint64 n, uint64 total_count,
							 uint64 rec_len, uint64 total_rec_len,
							 uint64 fpi_len, uint64 total_fpi_len,
							 uint64 tot_len, uint64 total_len,
							 Datum *values, bool *nulls, uint32 ncols);
static void GetWalStats(FunctionCallInfo fcinfo,
						XLogRecPtr start_lsn,
						XLogRecPtr end_lsn,
						bool stats_per_record);
static void GetWALBlockInfo(FunctionCallInfo fcinfo, XLogReaderState *record);

/*
 * Return the LSN up to which the server has WAL.
 */
static XLogRecPtr
GetCurrentLSN(void)
{
	XLogRecPtr	curr_lsn;

	/*
	 * We determine the current LSN of the server similar to how page_read
	 * callback read_local_xlog_page_no_wait does.
	 */
	if (!RecoveryInProgress())
		curr_lsn = GetFlushRecPtr(NULL);
	else
		curr_lsn = GetXLogReplayRecPtr(NULL);

	Assert(!XLogRecPtrIsInvalid(curr_lsn));

	return curr_lsn;
}

/*
 * Intialize WAL reader and identify first valid LSN.
 */
static XLogReaderState *
InitXLogReaderState(XLogRecPtr lsn)
{
	XLogReaderState *xlogreader;
	ReadLocalXLogPageNoWaitPrivate *private_data;
	XLogRecPtr	first_valid_record;

	/*
	 * Reading WAL below the first page of the first segments isn't allowed.
	 * This is a bootstrap WAL page and the page_read callback fails to read
	 * it.
	 */
	if (lsn < XLOG_BLCKSZ)
		ereport(ERROR,
				(errmsg("could not read WAL at LSN %X/%X",
						LSN_FORMAT_ARGS(lsn))));

	private_data = (ReadLocalXLogPageNoWaitPrivate *)
		palloc0(sizeof(ReadLocalXLogPageNoWaitPrivate));

	xlogreader = XLogReaderAllocate(wal_segment_size, NULL,
									XL_ROUTINE(.page_read = &read_local_xlog_page_no_wait,
											   .segment_open = &wal_segment_open,
											   .segment_close = &wal_segment_close),
									private_data);

	if (xlogreader == NULL)
		ereport(ERROR,
				(errcode(ERRCODE_OUT_OF_MEMORY),
				 errmsg("out of memory"),
				 errdetail("Failed while allocating a WAL reading processor.")));

	/* first find a valid recptr to start from */
	first_valid_record = XLogFindNextRecord(xlogreader, lsn);

	if (XLogRecPtrIsInvalid(first_valid_record))
		ereport(ERROR,
				(errmsg("could not find a valid record after %X/%X",
						LSN_FORMAT_ARGS(lsn))));

	return xlogreader;
}

/*
 * Read next WAL record.
 *
 * By design, to be less intrusive in a running system, no slot is allocated
 * to reserve the WAL we're about to read. Therefore this function can
 * encounter read errors for historical WAL.
 *
 * We guard against ordinary errors trying to read WAL that hasn't been
 * written yet by limiting end_lsn to the flushed WAL, but that can also
 * encounter errors if the flush pointer falls in the middle of a record. In
 * that case we'll return NULL.
 */
static XLogRecord *
ReadNextXLogRecord(XLogReaderState *xlogreader)
{
	XLogRecord *record;
	char	   *errormsg;

	record = XLogReadRecord(xlogreader, &errormsg);

	if (record == NULL)
	{
		ReadLocalXLogPageNoWaitPrivate *private_data;

		/* return NULL, if end of WAL is reached */
		private_data = (ReadLocalXLogPageNoWaitPrivate *)
			xlogreader->private_data;

		if (private_data->end_of_wal)
			return NULL;

		if (errormsg)
			ereport(ERROR,
					(errcode_for_file_access(),
					 errmsg("could not read WAL at %X/%X: %s",
							LSN_FORMAT_ARGS(xlogreader->EndRecPtr), errormsg)));
		else
			ereport(ERROR,
					(errcode_for_file_access(),
					 errmsg("could not read WAL at %X/%X",
							LSN_FORMAT_ARGS(xlogreader->EndRecPtr))));
	}

	return record;
}

/*
 * Get a single WAL record info.
 */
static void
GetWALRecordInfo(XLogReaderState *record, Datum *values,
				 bool *nulls, uint32 ncols)
{
	const char *id;
	RmgrData	desc;
	uint32		fpi_len = 0;
	StringInfoData rec_desc;
	StringInfoData rec_blk_ref;
	uint32		main_data_len;
	int			i = 0;

	desc = GetRmgr(XLogRecGetRmid(record));
	id = desc.rm_identify(XLogRecGetInfo(record));

	if (id == NULL)
		id = psprintf("UNKNOWN (%x)", XLogRecGetInfo(record) & ~XLR_INFO_MASK);

	initStringInfo(&rec_desc);
	desc.rm_desc(&rec_desc, record);

	/* Block references. */
	initStringInfo(&rec_blk_ref);
	XLogRecGetBlockRefInfo(record, false, true, &rec_blk_ref, &fpi_len);

	main_data_len = XLogRecGetDataLen(record);

	values[i++] = LSNGetDatum(record->ReadRecPtr);
	values[i++] = LSNGetDatum(record->EndRecPtr);
	values[i++] = LSNGetDatum(XLogRecGetPrev(record));
	values[i++] = TransactionIdGetDatum(XLogRecGetXid(record));
	values[i++] = CStringGetTextDatum(desc.rm_name);
	values[i++] = CStringGetTextDatum(id);
	values[i++] = UInt32GetDatum(XLogRecGetTotalLen(record));
	values[i++] = UInt32GetDatum(main_data_len);
	values[i++] = UInt32GetDatum(fpi_len);
	values[i++] = CStringGetTextDatum(rec_desc.data);
	values[i++] = CStringGetTextDatum(rec_blk_ref.data);

	Assert(i == ncols);
}


/*
 * Store a set of block information from a single record (FPI and block
 * information).
 */
static void
GetWALBlockInfo(FunctionCallInfo fcinfo, XLogReaderState *record)
{
#define PG_GET_WAL_BLOCK_INFO_COLS 11
	int			block_id;
	ReturnSetInfo *rsinfo = (ReturnSetInfo *) fcinfo->resultinfo;

	for (block_id = 0; block_id <= XLogRecMaxBlockId(record); block_id++)
	{
		DecodedBkpBlock *blk;
		BlockNumber blkno;
		RelFileLocator rnode;
		ForkNumber	fork;
		Datum		values[PG_GET_WAL_BLOCK_INFO_COLS] = {0};
		bool		nulls[PG_GET_WAL_BLOCK_INFO_COLS] = {0};
		int			i = 0;

		if (!XLogRecHasBlockRef(record, block_id))
			continue;

		blk = XLogRecGetBlock(record, block_id);

		(void) XLogRecGetBlockTagExtended(record, block_id,
										  &rnode, &fork, &blkno, NULL);

		values[i++] = LSNGetDatum(record->ReadRecPtr);
		values[i++] = Int16GetDatum(block_id);
		values[i++] = ObjectIdGetDatum(blk->rlocator.spcOid);
		values[i++] = ObjectIdGetDatum(blk->rlocator.dbOid);
		values[i++] = ObjectIdGetDatum(blk->rlocator.relNumber);
		values[i++] = Int64GetDatum((int64) blkno);

		if (fork >= 0 && fork <= MAX_FORKNUM)
			values[i++] = CStringGetTextDatum(forkNames[fork]);
		else
			ereport(ERROR,
					(errcode(ERRCODE_INTERNAL_ERROR),
					 errmsg_internal("invalid fork number: %u", fork)));

		/* Block data */
		if (blk->has_data)
		{
			bytea	   *raw_data;

			/* Initialize bytea buffer to copy the data to */
			raw_data = (bytea *) palloc(blk->data_len + VARHDRSZ);
			SET_VARSIZE(raw_data, blk->data_len + VARHDRSZ);

			/* Copy the data */
			memcpy(VARDATA(raw_data), blk->data, blk->data_len);
			values[i++] = PointerGetDatum(raw_data);
		}
		else
		{
			/* No data, so set this field to NULL */
			nulls[i++] = true;
		}

		if (blk->has_image)
		{
			PGAlignedBlock buf;
			Page		page;
			bytea	   *raw_page;
			int			bitcnt;
			int			cnt = 0;
			Datum	   *flags;
			ArrayType  *a;

			page = (Page) buf.data;

			/* Full page image exists, so let's save it */
			if (!RestoreBlockImage(record, block_id, page))
				ereport(ERROR,
						(errcode(ERRCODE_INTERNAL_ERROR),
						 errmsg_internal("%s", record->errormsg_buf)));

			/* Initialize bytea buffer to copy the FPI to */
			raw_page = (bytea *) palloc(BLCKSZ + VARHDRSZ);
			SET_VARSIZE(raw_page, BLCKSZ + VARHDRSZ);

			/* Take a verbatim copy of the FPI */
			memcpy(VARDATA(raw_page), page, BLCKSZ);

			values[i++] = PointerGetDatum(raw_page);
			values[i++] = UInt32GetDatum(blk->bimg_len);

			/* FPI flags */
			bitcnt = pg_popcount((const char *) &blk->bimg_info,
								 sizeof(uint8));
			/* Build set of raw flags */
			flags = (Datum *) palloc0(sizeof(Datum) * bitcnt);

			if ((blk->bimg_info & BKPIMAGE_HAS_HOLE) != 0)
				flags[cnt++] = CStringGetTextDatum("HAS_HOLE");
			if (blk->apply_image)
				flags[cnt++] = CStringGetTextDatum("APPLY");
			if ((blk->bimg_info & BKPIMAGE_COMPRESS_PGLZ) != 0)
				flags[cnt++] = CStringGetTextDatum("COMPRESS_PGLZ");
			if ((blk->bimg_info & BKPIMAGE_COMPRESS_LZ4) != 0)
				flags[cnt++] = CStringGetTextDatum("COMPRESS_LZ4");
			if ((blk->bimg_info & BKPIMAGE_COMPRESS_ZSTD) != 0)
				flags[cnt++] = CStringGetTextDatum("COMPRESS_ZSTD");

			Assert(cnt <= bitcnt);
			a = construct_array_builtin(flags, cnt, TEXTOID);
			values[i++] = PointerGetDatum(a);
		}
		else
		{
			/* No full page image, so store NULLs for all its fields */
			memset(&nulls[i], true, 3 * sizeof(bool));
			i += 3;
		}

		Assert(i == PG_GET_WAL_BLOCK_INFO_COLS);

		tuplestore_putvalues(rsinfo->setResult, rsinfo->setDesc,
							 values, nulls);
	}

#undef PG_GET_WAL_FPI_BLOCK_COLS
}

/*
 * Get information about all the blocks saved in WAL records between start
 * and end LSNs. This produces information about the full page images with
 * their relation information, and the data saved in each block associated
 * to a record. Decompression is applied to the full page images, if
 * necessary.
 */
Datum
pg_get_wal_block_info(PG_FUNCTION_ARGS)
{
	XLogRecPtr	start_lsn = PG_GETARG_LSN(0);
	XLogRecPtr	end_lsn = PG_GETARG_LSN(1);
	XLogReaderState *xlogreader;
	MemoryContext old_cxt;
	MemoryContext tmp_cxt;

	ValidateInputLSNs(start_lsn, &end_lsn);

	InitMaterializedSRF(fcinfo, 0);

	xlogreader = InitXLogReaderState(start_lsn);

	tmp_cxt = AllocSetContextCreate(CurrentMemoryContext,
									"pg_get_block_fpi_info temporary cxt",
									ALLOCSET_DEFAULT_SIZES);

	while (ReadNextXLogRecord(xlogreader) &&
		   xlogreader->EndRecPtr <= end_lsn)
	{
		/* Use the tmp context so we can clean up after each tuple is done */
		old_cxt = MemoryContextSwitchTo(tmp_cxt);

		GetWALBlockInfo(fcinfo, xlogreader);

		/* clean up and switch back */
		MemoryContextSwitchTo(old_cxt);
		MemoryContextReset(tmp_cxt);

		CHECK_FOR_INTERRUPTS();
	}

	MemoryContextDelete(tmp_cxt);
	pfree(xlogreader->private_data);
	XLogReaderFree(xlogreader);

	PG_RETURN_VOID();
}

/*
 * Get WAL record info.
 */
Datum
pg_get_wal_record_info(PG_FUNCTION_ARGS)
{
#define PG_GET_WAL_RECORD_INFO_COLS 11
	Datum		result;
	Datum		values[PG_GET_WAL_RECORD_INFO_COLS] = {0};
	bool		nulls[PG_GET_WAL_RECORD_INFO_COLS] = {0};
	XLogRecPtr	lsn;
	XLogRecPtr	curr_lsn;
	XLogReaderState *xlogreader;
	TupleDesc	tupdesc;
	HeapTuple	tuple;

	lsn = PG_GETARG_LSN(0);
	curr_lsn = GetCurrentLSN();

	if (lsn > curr_lsn)
		ereport(ERROR,
				(errcode(ERRCODE_INVALID_PARAMETER_VALUE),
				 errmsg("WAL input LSN must be less than current LSN"),
				 errdetail("Current WAL LSN on the database system is at %X/%X.",
						   LSN_FORMAT_ARGS(curr_lsn))));

	/* Build a tuple descriptor for our result type. */
	if (get_call_result_type(fcinfo, NULL, &tupdesc) != TYPEFUNC_COMPOSITE)
		elog(ERROR, "return type must be a row type");

	xlogreader = InitXLogReaderState(lsn);

	if (!ReadNextXLogRecord(xlogreader))
		ereport(ERROR,
				(errcode(ERRCODE_INVALID_PARAMETER_VALUE),
				 errmsg("could not read WAL at %X/%X",
						LSN_FORMAT_ARGS(xlogreader->EndRecPtr))));

	GetWALRecordInfo(xlogreader, values, nulls, PG_GET_WAL_RECORD_INFO_COLS);

	pfree(xlogreader->private_data);
	XLogReaderFree(xlogreader);

	tuple = heap_form_tuple(tupdesc, values, nulls);
	result = HeapTupleGetDatum(tuple);

	PG_RETURN_DATUM(result);
#undef PG_GET_WAL_RECORD_INFO_COLS
}

/*
 * Validate start and end LSNs coming from the function inputs.
 *
 * If end_lsn is found to be higher than the current LSN reported by the
 * cluster, use the current LSN as the upper bound.
 */
static void
ValidateInputLSNs(XLogRecPtr start_lsn, XLogRecPtr *end_lsn)
{
	XLogRecPtr	curr_lsn = GetCurrentLSN();

	if (start_lsn > curr_lsn)
		ereport(ERROR,
				(errcode(ERRCODE_INVALID_PARAMETER_VALUE),
				 errmsg("WAL start LSN must be less than current LSN"),
				 errdetail("Current WAL LSN on the database system is at %X/%X.",
						   LSN_FORMAT_ARGS(curr_lsn))));

	if (start_lsn > *end_lsn)
		ereport(ERROR,
				(errcode(ERRCODE_INVALID_PARAMETER_VALUE),
				 errmsg("WAL start LSN must be less than end LSN")));

	if (*end_lsn > curr_lsn)
		*end_lsn = curr_lsn;
}

/*
 * Get info and data of all WAL records between start LSN and end LSN.
 */
static void
GetWALRecordsInfo(FunctionCallInfo fcinfo, XLogRecPtr start_lsn,
				  XLogRecPtr end_lsn)
{
#define PG_GET_WAL_RECORDS_INFO_COLS 11
	XLogReaderState *xlogreader;
	ReturnSetInfo *rsinfo = (ReturnSetInfo *) fcinfo->resultinfo;
	Datum		values[PG_GET_WAL_RECORDS_INFO_COLS] = {0};
	bool		nulls[PG_GET_WAL_RECORDS_INFO_COLS] = {0};
	MemoryContext old_cxt;
	MemoryContext tmp_cxt;

	Assert(start_lsn <= end_lsn);

	InitMaterializedSRF(fcinfo, 0);

	xlogreader = InitXLogReaderState(start_lsn);

	tmp_cxt = AllocSetContextCreate(CurrentMemoryContext,
									"GetWALRecordsInfo temporary cxt",
									ALLOCSET_DEFAULT_SIZES);

	while (ReadNextXLogRecord(xlogreader) &&
		   xlogreader->EndRecPtr <= end_lsn)
	{
		/* Use the tmp context so we can clean up after each tuple is done */
		old_cxt = MemoryContextSwitchTo(tmp_cxt);

		GetWALRecordInfo(xlogreader, values, nulls,
						 PG_GET_WAL_RECORDS_INFO_COLS);

		tuplestore_putvalues(rsinfo->setResult, rsinfo->setDesc,
							 values, nulls);

		/* clean up and switch back */
		MemoryContextSwitchTo(old_cxt);
		MemoryContextReset(tmp_cxt);

		CHECK_FOR_INTERRUPTS();
	}

	MemoryContextDelete(tmp_cxt);
	pfree(xlogreader->private_data);
	XLogReaderFree(xlogreader);

#undef PG_GET_WAL_RECORDS_INFO_COLS
}

/*
 * Get info and data of all WAL records between start LSN and end LSN.
 */
Datum
pg_get_wal_records_info(PG_FUNCTION_ARGS)
{
	XLogRecPtr	start_lsn = PG_GETARG_LSN(0);
	XLogRecPtr	end_lsn = PG_GETARG_LSN(1);

	ValidateInputLSNs(start_lsn, &end_lsn);
	GetWALRecordsInfo(fcinfo, start_lsn, end_lsn);

	PG_RETURN_VOID();
}

/*
 * Fill single row of record counts and sizes for an rmgr or record.
 */
static void
FillXLogStatsRow(const char *name,
				 uint64 n, uint64 total_count,
				 uint64 rec_len, uint64 total_rec_len,
				 uint64 fpi_len, uint64 total_fpi_len,
				 uint64 tot_len, uint64 total_len,
				 Datum *values, bool *nulls, uint32 ncols)
{
	double		n_pct,
				rec_len_pct,
				fpi_len_pct,
				tot_len_pct;
	int			i = 0;

	n_pct = 0;
	if (total_count != 0)
		n_pct = 100 * (double) n / total_count;

	rec_len_pct = 0;
	if (total_rec_len != 0)
		rec_len_pct = 100 * (double) rec_len / total_rec_len;

	fpi_len_pct = 0;
	if (total_fpi_len != 0)
		fpi_len_pct = 100 * (double) fpi_len / total_fpi_len;

	tot_len_pct = 0;
	if (total_len != 0)
		tot_len_pct = 100 * (double) tot_len / total_len;

	values[i++] = CStringGetTextDatum(name);
	values[i++] = Int64GetDatum(n);
	values[i++] = Float8GetDatum(n_pct);
	values[i++] = Int64GetDatum(rec_len);
	values[i++] = Float8GetDatum(rec_len_pct);
	values[i++] = Int64GetDatum(fpi_len);
	values[i++] = Float8GetDatum(fpi_len_pct);
	values[i++] = Int64GetDatum(tot_len);
	values[i++] = Float8GetDatum(tot_len_pct);

	Assert(i == ncols);
}

/*
 * Get summary statistics about the records seen so far.
 */
static void
GetXLogSummaryStats(XLogStats *stats, ReturnSetInfo *rsinfo,
					Datum *values, bool *nulls, uint32 ncols,
					bool stats_per_record)
{
	MemoryContext old_cxt;
	MemoryContext tmp_cxt;
	uint64		total_count = 0;
	uint64		total_rec_len = 0;
	uint64		total_fpi_len = 0;
	uint64		total_len = 0;
	int			ri;

	/*
	 * Each row shows its percentages of the total, so make a first pass to
	 * calculate column totals.
	 */
	for (ri = 0; ri <= RM_MAX_ID; ri++)
	{
		if (!RmgrIdIsValid(ri))
			continue;

		total_count += stats->rmgr_stats[ri].count;
		total_rec_len += stats->rmgr_stats[ri].rec_len;
		total_fpi_len += stats->rmgr_stats[ri].fpi_len;
	}
	total_len = total_rec_len + total_fpi_len;

	tmp_cxt = AllocSetContextCreate(CurrentMemoryContext,
									"GetXLogSummaryStats temporary cxt",
									ALLOCSET_DEFAULT_SIZES);

	for (ri = 0; ri <= RM_MAX_ID; ri++)
	{
		uint64		count;
		uint64		rec_len;
		uint64		fpi_len;
		uint64		tot_len;
		RmgrData	desc;

		if (!RmgrIdIsValid(ri))
			continue;

		if (!RmgrIdExists(ri))
			continue;

		desc = GetRmgr(ri);

		if (stats_per_record)
		{
			int			rj;

			for (rj = 0; rj < MAX_XLINFO_TYPES; rj++)
			{
				const char *id;

				count = stats->record_stats[ri][rj].count;
				rec_len = stats->record_stats[ri][rj].rec_len;
				fpi_len = stats->record_stats[ri][rj].fpi_len;
				tot_len = rec_len + fpi_len;

				/* Skip undefined combinations and ones that didn't occur */
				if (count == 0)
					continue;

				old_cxt = MemoryContextSwitchTo(tmp_cxt);

				/* the upper four bits in xl_info are the rmgr's */
				id = desc.rm_identify(rj << 4);
				if (id == NULL)
					id = psprintf("UNKNOWN (%x)", rj << 4);

				FillXLogStatsRow(psprintf("%s/%s", desc.rm_name, id), count,
								 total_count, rec_len, total_rec_len, fpi_len,
								 total_fpi_len, tot_len, total_len,
								 values, nulls, ncols);

				tuplestore_putvalues(rsinfo->setResult, rsinfo->setDesc,
									 values, nulls);

				/* clean up and switch back */
				MemoryContextSwitchTo(old_cxt);
				MemoryContextReset(tmp_cxt);
			}
		}
		else
		{
			count = stats->rmgr_stats[ri].count;
			rec_len = stats->rmgr_stats[ri].rec_len;
			fpi_len = stats->rmgr_stats[ri].fpi_len;
			tot_len = rec_len + fpi_len;

			old_cxt = MemoryContextSwitchTo(tmp_cxt);

			FillXLogStatsRow(desc.rm_name, count, total_count, rec_len,
							 total_rec_len, fpi_len, total_fpi_len, tot_len,
							 total_len, values, nulls, ncols);

			tuplestore_putvalues(rsinfo->setResult, rsinfo->setDesc,
								 values, nulls);

			/* clean up and switch back */
			MemoryContextSwitchTo(old_cxt);
			MemoryContextReset(tmp_cxt);
		}
	}

	MemoryContextDelete(tmp_cxt);
}

/*
 * Get WAL stats between start LSN and end LSN.
 */
static void
GetWalStats(FunctionCallInfo fcinfo, XLogRecPtr start_lsn, XLogRecPtr end_lsn,
			bool stats_per_record)
{
#define PG_GET_WAL_STATS_COLS 9
	XLogReaderState *xlogreader;
	XLogStats	stats = {0};
	ReturnSetInfo *rsinfo = (ReturnSetInfo *) fcinfo->resultinfo;
	Datum		values[PG_GET_WAL_STATS_COLS] = {0};
	bool		nulls[PG_GET_WAL_STATS_COLS] = {0};

	Assert(start_lsn <= end_lsn);

	InitMaterializedSRF(fcinfo, 0);

	xlogreader = InitXLogReaderState(start_lsn);

	while (ReadNextXLogRecord(xlogreader) &&
		   xlogreader->EndRecPtr <= end_lsn)
	{
		XLogRecStoreStats(&stats, xlogreader);

		CHECK_FOR_INTERRUPTS();
	}

	pfree(xlogreader->private_data);
	XLogReaderFree(xlogreader);

	GetXLogSummaryStats(&stats, rsinfo, values, nulls,
						PG_GET_WAL_STATS_COLS,
						stats_per_record);

#undef PG_GET_WAL_STATS_COLS
}

/*
 * Get stats of all WAL records between start LSN and end LSN.
 */
Datum
pg_get_wal_stats(PG_FUNCTION_ARGS)
{
	XLogRecPtr	start_lsn = PG_GETARG_LSN(0);
	XLogRecPtr	end_lsn = PG_GETARG_LSN(1);
	bool		stats_per_record = PG_GETARG_BOOL(2);

	ValidateInputLSNs(start_lsn, &end_lsn);
	GetWalStats(fcinfo, start_lsn, end_lsn, stats_per_record);

	PG_RETURN_VOID();
}

/*
 * The following functions have been removed in newer versions in 1.1, but
 * they are kept around for compatibility.
 */
Datum
pg_get_wal_records_info_till_end_of_wal(PG_FUNCTION_ARGS)
{
	XLogRecPtr	start_lsn = PG_GETARG_LSN(0);
	XLogRecPtr	end_lsn = GetCurrentLSN();

	if (start_lsn > end_lsn)
		ereport(ERROR,
				(errcode(ERRCODE_INVALID_PARAMETER_VALUE),
				 errmsg("WAL start LSN must be less than current LSN"),
				 errdetail("Current WAL LSN on the database system is at %X/%X.",
						   LSN_FORMAT_ARGS(end_lsn))));

	GetWALRecordsInfo(fcinfo, start_lsn, end_lsn);

	PG_RETURN_VOID();
}

Datum
pg_get_wal_stats_till_end_of_wal(PG_FUNCTION_ARGS)
{
	XLogRecPtr	start_lsn = PG_GETARG_LSN(0);
	XLogRecPtr	end_lsn = GetCurrentLSN();
	bool		stats_per_record = PG_GETARG_BOOL(1);

	if (start_lsn > end_lsn)
		ereport(ERROR,
				(errcode(ERRCODE_INVALID_PARAMETER_VALUE),
				 errmsg("WAL start LSN must be less than current LSN"),
				 errdetail("Current WAL LSN on the database system is at %X/%X.",
						   LSN_FORMAT_ARGS(end_lsn))));

	GetWalStats(fcinfo, start_lsn, end_lsn, stats_per_record);

	PG_RETURN_VOID();
}
