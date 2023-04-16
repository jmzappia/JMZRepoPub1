 DROP TABLE IF EXISTS etl;
 CREATE TABLE etl (
`ID_TEST_1`                        Integer, 
`DESCRIP`                          Character(60), 
`COD_PUB`                          Character(10), 
`PUB`                              Character(100), 
`COD_VEMD`                         Character(10), 
`VEMD`                             Character(100), 
`PRECIO_LOC`                       Numeric(20,2), 
`PRECIO_USD`                       Numeric(20,2), 
`PRECIO_ORI`                       Numeric(20,2), 
`MONEDA`                           Character(5), 
`UNI_VEM`                          Integer, 
`MONTO_VEN`                        Numeric(20,2), 
`V_DOLAR`                          Numeric(14,2), 
`MONTO_USD`                        Numeric(20,2), 
`OFERTA`                           Character(15), 
`ESTADO`                           Character(10), 
`MERCADO_P`                        Character(20), 
`PROVINCIIA`                       Character(20), 
`CIUDAD`                           Character(30), 
`ENVIO`                            Character(15), 
`MES`                              DateTime, 
`MARCA`                            Character(60));
insert into etl values(1,'Equipos de Magnetoterapia','MLA6142067','PLAGASONIX-1','4749','PLAGASONIX-1',94400.00,6172816.00,94400.00,'ARS',1,94400.00,6172816.00,6172816.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Paternal','VERDADERO','2021-01-01','EULER');
insert into etl values(2,'Otros','MLA6736157','NOVACEKDENTAL','14235','NOVACEKDENTAL',220000.00,14385800.00,220000.00,'ARS',1,220000.00,14385800.00,14385800.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Recoleta','FALSO','2021-01-01','DTE');
insert into etl values(3,'Otros','MLA8783251','ENVAPLUS PACHECO','64418','ENVAPLUS PACHECO',10900.00,712751.00,10900.00,'ARS',1,10900.00,712751.00,712751.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','General Pacheco','FALSO','2021-01-01','HDA');
insert into etl values(4,'Equipos de Magnetoterapia','MLA6955386','BIOSALUD 359','16138','BIOSALUD 359',2650562.00,173320249.18,2650562.00,'ARS',3,7951686.00,519960747.54,519960747.54,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Mataderos','VERDADERO','2021-01-01','KERTRAN');
insert into etl values(5,'Otros','MLA8783338','ENVAPLUS PACHECO','64418','ENVAPLUS PACHECO',14600.00,954694.00,14600.00,'ARS',2,23980.00,1568052.20,1568052.20,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','General Pacheco','FALSO','2021-01-01','HDA');
insert into etl values(6,'Otros','MLA7171834','HUEMULTACTICO','22295','HUEMULTACTICO',31030.00,2029051.70,31030.00,'ARS',1,29940.00,1957776.60,1957776.60,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Florencio Varela','FALSO','2021-01-01','HUEMULTCTICO');
insert into etl values(7,'Equipos de Magnetoterapia','MLA7586671','MAGNETOSALUD','9369','MAGNETOSALUD',327500.00,21415225.00,327500.00,'ARS',3,982500.00,64245675.00,64245675.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Saavedra','VERDADERO','2021-01-01','KERTRANKITDEKINESIOLOGIAEQUIPODEMAGNETOTERAPIADE4SALIDASCOND');
insert into etl values(8,'Equipos de Magnetoterapia','MLA8021376','SOLEDADDIVECCHIA','43427','SOLEDADDIVECCHIA',43000.00,2811770.00,43000.00,'ARS',7,297000.00,19420830.00,19420830.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Ramos Mejia','VERDADERO','2021-01-01','MAGNETOTERAPIA');
insert into etl values(9,'Otros','MLA9018050','CONCEPTOSALUD','25235','CONCEPTOSALUD',54000.00,3531060.00,54000.00,'ARS',1,54000.00,3531060.00,3531060.00,'Sin Oferta','Nuevo','VERDADERO','C«rdoba','C«rdoba','VERDADERO','2021-01-01','CONCEPTOSALUD');
insert into etl values(10,'Equipos de Magnetoterapia','MLA6925444','BIOSALUD 359','16138','BIOSALUD 359',1171597.00,76610727.83,1171597.00,'ARS',1,1171597.00,76610727.83,76610727.83,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Mataderos','VERDADERO','2021-01-01','BIOMAG');
insert into etl values(11,'Otros','MLA7702005','T2JOVEN','15099','T2JOVEN',21750.00,1422232.50,21750.00,'ARS',2,40700.00,2661373.00,2661373.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Palermo','VERDADERO','2021-01-01','BSNMEDICAL');
insert into etl values(12,'Otros','MLA8348848','PORTEóAPUEYRREDON','36485','PORTEóAPUEYRREDON',4250.00,277907.50,4250.00,'ARS',1,4250.00,277907.50,277907.50,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Recoleta','FALSO','2021-01-01','ELIT');
insert into etl values(13,'Otros','MLA6850780','MARCOS.E.M','13327','MARCOS.E.M',83000.00,5427370.00,83000.00,'ARS',3,249000.00,16282110.00,16282110.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Caballito','FALSO','2021-01-01','XIANGPENG');
insert into etl values(14,'Otros','MLA8119420','INDUSTRIASDEBRECENSA','44745','INDUSTRIASDEBRECENSA',358800.00,23461932.00,358800.00,'ARS',5,1744000.00,114040160.00,114040160.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Caballito','FALSO','2021-01-01','INDUSTRIASDEBRECEN');
insert into etl values(15,'Otros','MLA8359003','DITECMA ARG','49210','DITECMA ARG',1690.00,110509.10,1690.00,'ARS',8,13520.00,884072.80,884072.80,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Don Torcuato Este','FALSO','2021-01-01','DITECMA');
insert into etl values(16,'Otros','MLA8579686','SUPERI FARMA','28795','SUPERI FARMA',8510.00,556468.90,8510.00,'ARS',2,14800.00,967772.00,967772.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Belgrano','FALSO','2021-01-01','OPTIUM');
insert into etl values(17,'Otros','MLA8987975','LEMA6447045','29907','LEMA6447045',4000.00,261560.00,4000.00,'ARS',1,3500.00,228865.00,228865.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','La Plata','FALSO','2021-01-01','ABBOTT');
insert into etl values(18,'Equipos de Magnetoterapia','MLA6265619','PLAGASONIX-1','4749','PLAGASONIX-1',129980.00,8499392.20,129980.00,'ARS',2,259960.00,16998784.40,16998784.40,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Paternal','VERDADERO','2021-01-01','PLAGASONIXINDUSTRIAARGENTINA');
insert into etl values(19,'Otros','MLA8998392','JUANPABLOCAPRINI','3767','JUANPABLOCAPRINI',620.00,40541.80,620.00,'ARS',1,620.00,40541.80,40541.80,'Sin Oferta','Usado','VERDADERO','Salta','La MontaØa','FALSO','2021-01-01','STRYKER');
insert into etl values(20,'Centrðfugas Digitales','MLA6428429','T2JOVEN','15099','T2JOVEN',385000.00,25175150.00,385000.00,'ARS',1,385000.00,25175150.00,25175150.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Palermo','VERDADERO','2021-01-01','ARCANO');
insert into etl values(21,'Otros','MLA7396829','LACASADELKINE','10581','LACASADELKINE',60000.00,3923400.00,60000.00,'ARS',2,120000.00,7846800.00,7846800.00,'Sin Oferta','Nuevo','VERDADERO','C«rdoba','C«rdoba','VERDADERO','2021-01-01','LACASADEKINE');
insert into etl values(22,'Otros','MLA8705984','DIANI TUS','18956','DIANI TUS',34000.00,2223260.00,34000.00,'ARS',3,97500.00,6375525.00,6375525.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Olivos','FALSO','2021-01-01','Sin Marca');
insert into etl values(23,'Equipos de Magnetoterapia','MLA6162912','MAGNETOSALUD','9369','MAGNETOSALUD',197630.00,12923025.70,197630.00,'ARS',4,790520.00,51692102.80,51692102.80,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Saavedra','VERDADERO','2021-01-01','KERTRANKERTRANEQUIPODEMAGNETOTERAPIADE4SALIDASDOSSOLENOIDESP');
insert into etl values(24,'Otros','MLA6727164','CIENTTFICA SOMACO','23195','CIENTTFICA SOMACO',4402.00,287846.78,4402.00,'ARS',1,4402.00,287846.78,287846.78,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Ituzaing«','FALSO','2021-01-01','PELAB');
insert into etl values(25,'Otros','MLA8688578','OXIGENOTERAPIA AVELLANEDA','20983','OXIGENOTERAPIA AVELLANEDA',249900.00,16340961.00,249900.00,'ARS',2,499800.00,32681922.00,32681922.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Avellaneda','FALSO','2021-01-01','YUWELL');
insert into etl values(26,'Otros','MLA8798372','SUMEDDIEGO','7672','SUMEDDIEGO',27500.00,1798225.00,27500.00,'ARS',1,27500.00,1798225.00,1798225.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Lanos Este','FALSO','2021-01-01','CHINA');
insert into etl values(27,'Desfibriladores Externos','MLA8862752','EMERMED911','32220','EMERMED911',89990.00,5884446.10,89990.00,'ARS',1,89990.00,5884446.10,5884446.10,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Lanos Este','VERDADERO','2021-01-01','EMERGAB');
insert into etl values(28,'Equipos de Magnetoterapia','MLA7551242','GALMED.','9773','GALMED.',99990.00,6538346.10,99990.00,'ARS',52,5199480.00,339993997.20,339993997.20,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Floresta','VERDADERO','2021-01-01','GALMED');
insert into etl values(29,'Otros','MLA8698924','DISTRIBUIDORA HANNA','18663','DISTRIBUIDORA HANNA',4800.00,313872.00,4800.00,'ARS',2,9600.00,627744.00,627744.00,'Sin Oferta','Nuevo','VERDADERO','Misiones','Posadas','FALSO','2021-01-01','MCM');
insert into etl values(30,'Otros','MLA7455184','ADRY-AOR2007','598','ADRY-AOR2007',38000.00,2484820.00,38000.00,'ARS',2,76000.00,4969640.00,4969640.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Parque Chacabuco','FALSO','2021-01-01','Sin Marca');
insert into etl values(31,'Otros','MLA7863371','LOQUENECESITES101','14134','LOQUENECESITES101',359899.00,23533795.61,359899.00,'ARS',4,1439596.00,94135182.44,94135182.44,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','San Cristobal','FALSO','2021-01-01','CONFORTMAS');
insert into etl values(32,'Otros','MLA7871076','BRIMABE','17801','BRIMABE',3800.00,248482.00,3800.00,'ARS',1,3800.00,248482.00,248482.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Belgrano','FALSO','2021-01-01','TENSO');
insert into etl values(33,'Equipos de Magnetoterapia','MLA8816180','GALMED.','9773','GALMED.',119990.00,7846146.10,119990.00,'ARS',16,1919840.00,125538337.60,125538337.60,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Floresta','VERDADERO','2021-01-01','GALMED');
insert into etl values(34,'Equipos de Magnetoterapia','MLA6958031','BIOSALUD 359','16138','BIOSALUD 359',2849181.00,186307945.59,2849181.00,'ARS',1,2849181.00,186307945.59,186307945.59,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Mataderos','VERDADERO','2021-01-01','KERTRAN');
insert into etl values(35,'Otros','MLA8772922','IGMAINSUMOSHOSPITALARIOS','31875','IGMAINSUMOSHOSPITALARIOS',87000.00,5688930.00,87000.00,'ARS',1,87000.00,5688930.00,5688930.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','San Miguel','FALSO','2021-01-01','AURINCO');
insert into etl values(36,'Otros','MLA8781545','LA5454999','58024','LA5454999',165000.00,10789350.00,165000.00,'ARS',1,165000.00,10789350.00,10789350.00,'Sin Oferta','Usado','VERDADERO','Buenos Aires','Quilmes Oeste','FALSO','2021-01-01','CAM');
insert into etl values(37,'Equipos de Magnetoterapia','MLA8829133','MARIODDP','9397','MARIODDP',174990.00,11442596.10,174990.00,'ARS',1,154990.00,10134796.10,10134796.10,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Mataderos','VERDADERO','2021-01-01','MDS');
insert into etl values(38,'Otros','MLA8993732','INSUMOSMEDICOSTBA','67497','INSUMOSMEDICOSTBA',5540.00,362260.60,5540.00,'ARS',1,5540.00,362260.60,362260.60,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Microcentro','FALSO','2021-01-01','SANICOL');
insert into etl values(39,'Otros','MLA8003163','LAB DISCOUNT','14348','LAB DISCOUNT',101025.00,6606024.75,101025.00,'ARS',2,180322.00,11791255.58,11791255.58,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Balvanera','FALSO','2021-01-01','CHINCAN');
insert into etl values(40,'Otros','MLA8412698','TEKIP','1594','TEKIP',100000.00,6539000.00,100000.00,'ARS',1,95000.00,6212050.00,6212050.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Buenos Aires','FALSO','2021-01-01','TEKIP');
insert into etl values(41,'Centrðfugas Digitales','MLA8854981','AGUILAR EQUIPAMIENTOS','21129','AGUILAR EQUIPAMIENTOS',225750.00,14761792.50,225750.00,'ARS',1,225750.00,14761792.50,14761792.50,'Sin Oferta','Nuevo','VERDADERO','Santa Fe','Rosario','VERDADERO','2021-01-01','BIOKAN');
insert into etl values(42,'Otros','MLA6157252','FERMINDELVALLESEIDMANN','14600','FERMINDELVALLESEIDMANN',3990.00,260906.10,3990.00,'ARS',3,11970.00,782718.30,782718.30,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Balvanera','FALSO','2021-01-01','GERMANIA');
insert into etl values(43,'Otros','MLA7286247','SYNCROTECH','12136','SYNCROTECH',13500.00,882765.00,13500.00,'ARS',1,13500.00,882765.00,882765.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Palermo','FALSO','2021-01-01','SYNCROTECH');
insert into etl values(44,'Otros','MLA7840804','NESTOR LAREU','43159','NESTOR LAREU',3500.00,228865.00,3500.00,'ARS',5,17500.00,1144325.00,1144325.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Quilmes Oeste','FALSO','2021-01-01','LICONMDICA');
insert into etl values(45,'Otros','MLA8585691','APICOLA VAIROLATTI','28732','APICOLA VAIROLATTI',7910.00,517234.90,7910.00,'ARS',5,39550.00,2586174.50,2586174.50,'Sin Oferta','Nuevo','VERDADERO','C«rdoba','San Francisco','FALSO','2021-01-01','Sin Marca');
insert into etl values(46,'Otros','MLA8773486','INSUMOS WUAU','8010','INSUMOS WUAU',34900.00,2282111.00,34900.00,'ARS',1,34900.00,2282111.00,2282111.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Flores','FALSO','2021-01-01','TEN20');
insert into etl values(47,'Otros','MLA6967460','ICOMSALUD','13673','ICOMSALUD',2500.00,163475.00,2500.00,'ARS',2,5000.00,326950.00,326950.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','San Miguel','FALSO','2021-01-01','CLERICOT');
insert into etl values(48,'Equipos de Magnetoterapia','MLA7389430','ATHENEAMEDICAL','1651','ATHENEAMEDICAL',373000.00,24390470.00,373000.00,'ARS',1,373000.00,24390470.00,24390470.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Villa Crespo','VERDADERO','2021-01-01','ATHENEA');
insert into etl values(49,'Otros','MLA6685995','SOPORTEVITALSRL','22755','SOPORTEVITALSRL',30000.00,1961700.00,30000.00,'ARS',2,58000.00,3792620.00,3792620.00,'Sin Oferta','Nuevo','VERDADERO','Capital Federal','Capital Federal','FALSO','2021-01-01','RESPIRONICS');
insert into etl values(50,'Otros','MLA8660866','CEGENSCEGENSSA','28004','CEGENSCEGENSSA',159000.00,10397010.00,159000.00,'ARS',2,318000.00,20794020.00,20794020.00,'Sin Oferta','Nuevo','VERDADERO','Buenos Aires','Jos? Clemente Paz','VERDADERO','2021-01-01','ANALYTICALINDUSTRIES');
