// Línea de comandos --- $ npm i whatsapp-web.js
// Instalar qrcode-terminal para generar código QR. --- $ npm i qrcode-terminal

const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
// Primero muestra el código QR,
// que se puede escanear en su aplicación WhatsApp -> dispositivos vinculados y agregar un nuevo dispositivo

// Después de escanear con éxito, debería recibir el mensaje
"¡El cliente está listo!"

// "Escuchar" mensajes
client.on('message', message => {
    console.log(message.body);
});

client.on('message', message => {
    if(message.body === '!ping') {
        message.reply('pong');
    }
});

// Guardar sesión
const fs = require('fs');
const { Client } = require('whatsapp-web.js');

// Path donde se almacenará la escucha
const SESSION_FILE_PATH = './session.json';

// Cargar la sesión almacenada anteriormente
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Guardar valores
const client = new Client({
    session: sessionData
});

// Guardar la sesión con valores autenticados
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

// Descarga de medios
client.on('message', async msg => {
    if(msg.hasMedia) {
        const media = await msg.downloadMedia();
}
});

// Envío de medios
const { MessageMedia } = require('whatsapp-web.js');

const media = new MessageMedia('image/png', base64Image);
chat.sendMessage(media);

// Función para solucionar el Stack Overflow usando imágenes y videos

$(document).ready(function() {

    $('#searchbtn').bind('click' || 'enter',function(e) {
        if ($.trim($('#searchBox').val()) !== '') {
            $('#videos').append('<img src="img/loading.gif" alt="loading" class="loading" />');
            getVideos(e);
        }
    });
});

function getVideos(e) {
    e.preventDefault();
    var text = 'text='+$('#searchBox').val();
    $.ajax({
        url: 'getVideos.php',
        dataType: 'xml',
        type: 'POST',
        data: text,
        success: function(data) {                               
            $('#videos').append("<h1> </h1>");

            var xmlString = data;

            if ($(xmlString).find('feed').children('entry').length == 0) {
                $('#videos').append('<p class="noResults">Disculpame. Fallé. Intentá de nuevo!</p>');
            } else {
                var videoTitle = [];

                $(xmlString).find('title').each(function() 
                { 
                videoTitle.push($(this).text()) });

                $('#videos').append('<ul>');

                $(xmlString).find('entry').each(function(i) {
                    if (i == '40') {
                        return(false);
                    }
                    var vidInfo = '';
                    vidInfo += "<p>"+videoTitle[i]+"</p>";
                    $('#videos ul').append('<li>'+vidInfo+'</li>');
                });
            }
        },
        error: function(data) {
                console.log('Error: ' + data);
        }

    })
};