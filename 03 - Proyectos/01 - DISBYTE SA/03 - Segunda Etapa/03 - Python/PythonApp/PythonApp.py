import psycopg2;
import csv;

conn = psycopg2.connect("host=127.0.0.1 dbname=postgres user=postgres password=22112490")
cur  = conn.cursor()

cur.execute("""
    CREATE TABLE DISBITE_Test(
    "Id_Test_1" int IDENTITY(1,1),
	"Categoria_Nivel_1" character varying(50),
	"Categoria_Nivel_2" character varying(50),
	"Categoria_Nivel_3" character varying(50),
	"Categoria_Nivel_4" character varying(50),
	"Categoria_Nivel_5" character varying(50),
	"Categoria_Nivel_6" character varying(50),
	"Categoria_Nivel_7" character varying(50),
	"Codigo_Categoria_Nivel1" character varying(15),
	"Codigo_Categoria_Nivel2" character varying(15),
	"Codigo_Categoria_Nivel3" character varying(15),
	"Codigo_Categoria_Nivel4" character varying(15),
	"Codigo_Categoria_Nivel5" character varying(15),
	"Codigo_Categoria_Nivel6" character varying(15),
	"Codigo_Categoria_Nivel7" character varying(15),
	"Categoria_Completa" character varying(200),
	"Codigo_de_Publicacion" character varying(15),
	"Sitio" character varying(5),
	"Titulo_Publicacion" character varying(100),
	"Codigo_Vendedor" numeric(15,0),
	"Nickname_Vendedor" character varying(50),
	"Categoria_del_Vendedor" character varying(10),
	"Vendedor_No_Profesional" numeric(1,0),
	"Vendedor_Profesional" numeric(1,0),
	"PrecioMonedaLocal" numeric(30,2),
	"PrecioUsd" character varying(60),
	"Precio_Original" character varying(60),
	"Moneda" character varying(5),
	"Unidades_Vendidas" numeric(15),
	"Monto_Vendido_Moneda_Local" character varying(60),
	"Monto_Vendido_USD" character varying(60),
	"Tasa_de_conversion" character varying(60),
	"Tipo_de_Exposicion" character varying(15),
	"Foto_Publicacion" character varying(200),
	"Link_a_Publicacion" character varying(200),
	"Esta_en_Oferta" character varying(20),
	"Nuevo" numeric(2),
	"Usado" numeric(2),
	"Estado" character varying(15),
	"Ofrece_MercadoPago" character varying(25),
	"Provincia" character varying(50),
	"Ciudad" character varying(50),
	"Codigo_Tienda_Oficial" character varying(10),
	"Nombre_Tienda_Oficial" character varying(50),
	"Ofrece_Envio_Gratis" character varying(15),
	"Ofrece_MercadoEnvios" character varying(15),
	"Mes" date,
	"Marca" character varying(200),
	"Cancelaciones_Unidades" numeric(10),
	"Cancelaciones_Moneda_Local" numeric(30,2),
	"Cancelaciones_USD" character varying(60),
	
PRIMARY KEY ("Id_Test_1"),

)

)
""")

cur  = conn.cursor()
with open('Normal.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) 
    for row in reader:
        cur.execute(
        "INSERT INTO users VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        row
    )

conn.commit()


cur = conn.cursor()
with open('Normal.csv', 'r') as f:
    next(f) |
    cur.copy_from(f, 'Id_Test_1', sep=',')

conn.commit()