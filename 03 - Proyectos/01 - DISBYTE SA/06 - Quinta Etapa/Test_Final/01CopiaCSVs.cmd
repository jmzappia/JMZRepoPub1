@echo off
prompt $p$g
verify on

cd ml/data

run node.exe convertir.js

copy MLCSV.csv ..\Mongo_To_CSV\MLCSV.csv

cd..
cd..

echo %date%
echo %time%

echo MLCSV_%date:~-4,4%-%date:~-7,2%-%date:~-10,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%.csv

%variable:~startIndex,numChars%

cd CSV_To_SQL
del /F /A /Q *.*
cd..

copy ML\Mongo_To_CSV\MLCSV.csv CSV_To_SQL\MLCSV_%date:~-4,4%-%date:~-7,2%-%date:~-10,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%.csv

run python.exe CSV_To_SQL\PyToMSSQL.py
