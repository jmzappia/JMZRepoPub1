'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server Iniciado\n');

    var meli = require('mercadolibre');
    var meliObject = new meli.Meli(client_id, client_secret, [access_token], [refresh_token]);

    print(meliObject.getAuthURL(redirect_uri));
    print(meliObject.authorize(code, redirect_uri, callback));
    print(meliObject.get(path, [params,], callback));

    print(meliObject.post(path, body, [params,], callback));

    url = http;
    datos = "Activando...";
    respuesta = requests.post(url, json = datos);

    como_json = respuesta.json();
    print("La respuesta del servidor es:");
    print(como_json);

    form_data = [('color', 'blanco'), ('color', 'verde'), ('idioma', 'es')];
    resp = requests.post('url', data = form_data);

}).listen(port);



