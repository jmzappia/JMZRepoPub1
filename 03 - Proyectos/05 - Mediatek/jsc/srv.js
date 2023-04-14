function srvjs() {
	const http = require('http')
	const fs = require('fs')

	const servidor = http.createServer((pedido, respuesta) => {
		const url = new URL('http://localhost:3000' + pedido.url)
		let camino = 'static' + url.pathname
		if (camino == 'static/')
			camino = 'static/index.html'
		fs.stat(camino, error => {
			if (!error) {
				fs.readFile(camino, (error, contenido) => {
					if (error) {
						respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
						respuesta.write('Error interno')
						respuesta.end()
					} else {
						respuesta.writeHead(200, { 'Content-Type': 'text/html' })
						respuesta.write(contenido)
						respuesta.end()
					}
				})
			} else {
				respuesta.writeHead(404, { 'Content-Type': 'text/html' })
				respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
				respuesta.end()
			}
		})
	})

	servidor.listen(3000)

	alert('Servidor web iniciado')

}

