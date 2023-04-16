USE [DISBYTETest]
GO

/****** Object:  Table [dbo].[DBTest01]    Script Date: 26/3/2023 13:01:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

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

