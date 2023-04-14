from tkinter.tix import ROW
import pandas as pd
import os as os
import pyodbc as pyodbc
import csv as csv

contenido = os.listdir(__path__)
csvarchivo = []

for csvarchivo in contenido:
    if os.path.isfile(os.path.join(__path__, contenido)) and contenido.endswith('.csv'):
        csvarchivo.append(contenido)

print(csvarchivo)

data = pd.read_csv (r'csvarchivo')   
df = pd.DataFrame(data)

print(df)

conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=localhost\SQLDEVELOPER;'
                      'Database=ML;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()

cursor.execute('''
		IF NOT EXIST dbo.DBTest01( 
			CREATE TABLE [dbo].[DBTest01](
				[Id_Test_1] [int] IDENTITY(1,1) NOT NULL,
				[Categoria_Nivel_1] [varchar](50) NULL,
				[Categoria_Nivel_2] [varchar](50) NULL,
				[Categoria_Nivel_3] [varchar](50) NULL,
				[Categoria_Nivel_4] [varchar](50) NULL,
				[Categoria_Nivel_5] [varchar](50) NULL,
				[Categoria_Nivel_6] [varchar](50) NULL,
				[Categoria_Nivel_7] [varchar](50) NULL,
				[Codigo_Categoria_Nivel1] [varchar](15) NULL,
				[Codigo_Categoria_Nivel2] [varchar](15) NULL,
				[Codigo_Categoria_Nivel3] [varchar](15) NULL,
				[Codigo_Categoria_Nivel4] [varchar](15) NULL,
				[Codigo_Categoria_Nivel5] [varchar](15) NULL,
				[Codigo_Categoria_Nivel6] [varchar](15) NULL,
				[Codigo_Categoria_Nivel7] [varchar](15) NULL,
				[Categoria_Completa] [varchar](200) NULL,
				[Codigo_de_Publicacion] [varchar](15) NULL,
				[Sitio] [varchar](5) NULL,
				[Titulo_Publicacion] [varchar](100) NULL,
				[Codigo_Vendedor] [numeric](15, 0) NULL,
				[Nickname_Vendedor] [varchar](50) NULL,
				[Categoria_del_Vendedor] [varchar](10) NULL,
				[Vendedor_No_Profesional] [numeric](1, 0) NULL,
				[Vendedor_Profesional] [numeric](1, 0) NULL,
				[PrecioMonedaLocal] [numeric](30, 2) NULL,
				[PrecioUsd] [varchar](60) NULL,
				[Precio_Original] [varchar](60) NULL,
				[Moneda] [varchar](5) NULL,
				[Unidades_Vendidas] [numeric](15, 0) NULL,
				[Monto_Vendido_Moneda_Local] [varchar](60) NULL,
				[Monto_Vendido_USD] [varchar](60) NULL,
				[Tasa_de_conversion] [varchar](60) NULL,
				[Tipo_de_Exposicion] [varchar](15) NULL,
				[Foto_Publicacion] [varchar](200) NULL,
				[Link_a_Publicacion] [varchar](200) NULL,
				[Esta_en_Oferta] [varchar](20) NULL,
				[Nuevo] [numeric](2, 0) NULL,
				[Usado] [numeric](2, 0) NULL,
				[Estado] [varchar](15) NULL,
				[Ofrece_MercadoPago] [varchar](25) NULL,
				[Provincia] [varchar](50) NULL,
				[Ciudad] [varchar](50) NULL,
				[Codigo_Tienda_Oficial] [varchar](10) NULL,
				[Nombre_Tienda_Oficial] [varchar](50) NULL,
				[Ofrece_Envio_Gratis] [varchar](15) NULL,
				[Ofrece_MercadoEnvios] [varchar](15) NULL,
				[Mes] [date] NULL,
				[Marca] [varchar](200) NULL,
				[Cancelaciones_Unidades] [numeric](10, 0) NULL,
				[Cancelaciones_Moneda_Local] [numeric](30, 2) NULL,
				[Cancelaciones_USD] [varchar](60) NULL,
			PRIMARY KEY CLUSTERED 
			(
				[Id_Test_1] ASC
			)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
			) ON [PRIMARY]
		GO
		)
 ''')

for row in df.itertuples():
    cursor.execute('''
                INSERT INTO DBTest01 ([Id_Test_1],
									[Categoria_Nivel_1]
									[Categoria_Nivel_2] 
									[Categoria_Nivel_3] 
									[Categoria_Nivel_4] 
									[Categoria_Nivel_5] 
									[Categoria_Nivel_6] 
									[Categoria_Nivel_7] 
									[Codigo_Categoria_Nivel1] 
									[Codigo_Categoria_Nivel2] 
									[Codigo_Categoria_Nivel3] 
									[Codigo_Categoria_Nivel4] 
									[Codigo_Categoria_Nivel5] 
									[Codigo_Categoria_Nivel6] 
									[Codigo_Categoria_Nivel7] 
									[Categoria_Completa] 
									[Codigo_de_Publicacion] 
									[Sitio] 
									[Titulo_Publicacion] 
									[Codigo_Vendedor] 
									[Nickname_Vendedor] 
									[Categoria_del_Vendedor] 
									[Vendedor_No_Profesional] 
									[Vendedor_Profesional] 
									[PrecioMonedaLocal] 
									[PrecioUsd] 
									[Precio_Original] 
									[Moneda] 
									[Unidades_Vendidas] 
									[Monto_Vendido_Moneda_Local] 
									[Monto_Vendido_USD]		
									[Tasa_de_conversion] 
									[Tipo_de_Exposicion] 
									[Foto_Publicacion] 
									[Link_a_Publicacion] 
									[Esta_en_Oferta] 
									[Nuevo] 
									[Usado] 
									[Estado] 
									[Ofrece_MercadoPago] 
									[Provincia] 
									[Ciudad] 
									[Codigo_Tienda_Oficial] 
									[Nombre_Tienda_Oficial] 
									[Ofrece_Envio_Gratis] 
									[Ofrece_MercadoEnvios] 
									[Mes] 
									[Marca] 
									[Cancelaciones_Unidades] 
									[Cancelaciones_Moneda_Local] 
									[Cancelaciones_USD] 
					 VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,??,?,?,?,?,?,?,?,?,?)
                ''',
                ROW.Categoria_Nivel_1,
				ROW.Categoria_Nivel_2,
				ROW.Categoria_Nivel_3,
				ROW.Categoria_Nivel_4,
				ROW.Categoria_Nivel_5,
				ROW.Categoria_Nivel_6,
				ROW.Categoria_Nivel_7,
				ROW.Codigo_Categoria_Nivel1,
				ROW.Codigo_Categoria_Nivel2,
				ROW.Codigo_Categoria_Nivel3,
				ROW.Codigo_Categoria_Nivel4,
				ROW.Codigo_Categoria_Nivel5,
				ROW.Codigo_Categoria_Nivel6,
				ROW.Codigo_Categoria_Nivel7,
				ROW.Categoria_Completa,
				ROW.Codigo_de_Publicacion,
				ROW.Sitio,
				ROW.Titulo_Publicacion,
				ROW.Codigo_Vendedor,
				ROW.Nickname_Vendedor,
				ROW.Categoria_del_Vendedor,
				ROW.Vendedor_No_Profesional,
				ROW.Vendedor_Profesional,
				ROW.PrecioMonedaLocal,
			    ROW.PrecioUsd,
				ROW.Precio_Original,
				ROW.Moneda,
				ROW.Unidades_Vendidas,
				ROW.Monto_Vendido_Moneda_Local,
			    ROW.Monto_Vendido_USD,
				ROW.Tasa_de_conversion,
				ROW.Tipo_de_Exposicion,
				ROW.Foto_Publicacion,
				ROW.Link_a_Publicacion,
				ROW.Esta_en_Oferta,
				ROW.Nuevo,
				ROW.Usado,
				ROW.Estado,
				ROW.Ofrece_MercadoPago,
				ROW.Provincia,
				ROW.Ciudad,
				ROW.Codigo_Tienda_Oficial,
				ROW.Nombre_Tienda_Oficial,
				ROW.Ofrece_Envio_Gratis,
				ROW.Ofrece_MercadoEnvios,
				ROW.Mes,
				ROW.Marca,
				ROW.Cancelaciones_Unidades,
				ROW.Cancelaciones_Moneda_Local,
				ROW.Cancelaciones_USD,

                )

conn.commit()