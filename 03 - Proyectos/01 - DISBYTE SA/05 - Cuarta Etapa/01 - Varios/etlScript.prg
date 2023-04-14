SET DATE FRENCH
SET TALK OFF
SET CENTURY on
SET SAFETY OFF

SELECT 1
USE etl ALIAS etl
ZAP 

SELECT 2
USE tabla ALIAS tabla

PUBLIC numId, valorDolar
numId      = 0
valorDolar = 65.39

SELECT tabla
GO top
DO WHILE NOT EOF()
   numId = numId + 1
   SELECT etl
   APPEND BLANK 
   replace id_test_1   WITH numId
   replace descrip     WITH tabla.rubro
   replace cod_pub     WITH tabla.cod_venta
   replace pub         WITH tabla.vendedor
   replace cod_vemd    WITH tabla.cod_vend
   replace vemd        WITH tabla.vendedor
   replace precio_loc  WITH tabla.precio_pe
   replace precio_usd  WITH (tabla.precio_pe * valorDolar)
   replace precio_ori  WITH tabla.precio_pe
   replace moneda      WITH tabla.moneda
   replace uni_vem     WITH tabla.cantidad
   replace monto_ven   WITH tabla.precio_tot
   replace v_dolar     WITH (tabla.precio_tot * valorDolar)
   replace monto_usd   WITH v_dolar
   replace oferta      WITH tabla.oferta
   replace estado      WITH tabla.nuevo
   replace mercado_p   WITH tabla.merc_pago
   replace provinciia  WITH tabla.provincia
   replace ciudad      WITH tabla.ciudad
   replace envio       WITH tabla.entrega
   replace mes         WITH tabla.mes
   replace marca       WITH tabla.comprador
   
   SELECT tabla
   SKIP

ENDDO 


CLOSE ALL
RETURN
   