const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '.env')})

const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const db = require('./config/db')
const {port = 3000} = require('./config')

const index = require('./routes')
const auth = require('./routes/auth')
const order = require('./routes/order')
const question = require('./routes/question')

const notification = require('./routes/notification')

const app = express()

var client_id = 'jzappia';
var client_secret = '123456';
var access_token = '';
var refresh_token = '';

var meli = require('mercadolibre');
var meliObject = new meli.Meli(client_id, client_secret, [access_token], [refresh_token]);

meliObject.getAuthURL(redirect_uri) 
meliObject.authorize(code, redirect_uri, callback) 
meliObject.get(path, [params,] callback) 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/auth', auth)
app.use('/order', order)
app.use('/question', question)
app.use('/notification', notification)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

let server

function startServer() {
  return new Promise((resolve, reject) => {
    try {
      server = app.listen(port, () => {
        resolve(server)
      })
    } catch (error) {
      reject(error)
    }
  })
}

function closeServer() {
  return new Promise(resolve => {
    if (!server || !server.close) {
      return resolve()
    }

    server.close(resolve)
  })
}

let dbConnection = null

async function setup() {
  await Promise.all([
    db.connect()
      .then(connection => {
        const {connection: {name, host, port}} = connection
        console.log(`db connection open: ${host}:${port}/${name}`)
        dbConnection = connection
      }),
    startServer()
      .then(server => console.log(`Listening en puerto ${server.address().port} (${app.get('env')})`))
  ])

  console.log('App activa.')
}

async function shutdown(code = 0) {
  await closeServer()
  if (dbConnection) {
    await db.disconnect(dbConnection)
  }
  process.exitCode = code
}

process.on('SIGINT', async () => {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
  await shutdown()
})

process.on('SIGTERM', async () => {
  console.log('\nGracefully shutting down from SIGTERM')
  await shutdown()
})

setup()
  .catch(async error => {
    console.error('Error inesperado:', error)
    await shutdown(1)
  })

meliObject.get('sites/MLA/categories', function (err, res) {
    console.log(err, res);
    returns:
        err = null
        res = [ 
                { id: 'MLA5725', name: 'Accesorios para Vehículos' },
                { id: 'MLA1071', name: 'Animales y Mascotas' },
                { id: 'MLA1367', name: 'Antigüedades' },
                { id: 'MLA1368', name: 'Arte y Artesanías' },
                { id: 'MLA1743', name: 'Autos, Motos y Otros' },
                { id: 'MLA1384', name: 'Bebés' },

        ]
    
});


returns:
       err = null
       res = [ 
               { id: 'MLA5725', name: 'Accesorios para Vehículos' },
               { id: 'MLA1071', name: 'Animales y Mascotas' },
               { id: 'MLA1367', name: 'Antigüedades' },
               { id: 'MLA1368', name: 'Arte y Artesanías' },
               { id: 'MLA1743', name: 'Autos, Motos y Otros' },
               { id: 'MLA1384', name: 'Bebés' },
               
        ]


meliObject.get('users', {
    ids: [145925943, 145925951]
}, function (err, res) {
    console.log(err, res);
    returns:
         err = null
         res = [ 
                 { 
                     id: 145925943,
                     nickname: 'TETE2780570',
                     registration_date: '2013-09-17T14:20:30.000-04:00',
                     country_id: 'AR',
                     address: { state: 'AR-C', city: 'Palermo' },
                     user_type: 'normal',
                     tags: [ 'normal', 'test_user', 'user_info_verified' ],
                     logo: null,
                     points: 100,
                     site_id: 'MLA',
                     permalink: 'http://perfil.mercadolibre.com.ar/TETE2780570',
                     seller_reputation:
                      { level_id: null,
                        power_seller_status: null,
                        transactions: [Object] },
                     buyer_reputation: { tags: [] },
                     status: { site_status: 'deactive' } 
                 },
                 {
                     id: 145925951,
                     nickname: 'TETE1341752',
                     registration_date: '2013-09-17T14:20:43.000-04:00',
                     country_id: 'AR',
                     address: { state: 'AR-C', city: 'Palermo' },
                     user_type: 'normal',
                     tags: [ 'normal', 'test_user', 'user_info_verified' ],
                     logo: null,
                     points: 100,
                     site_id: 'MLA',
                     permalink: 'http://perfil.mercadolibre.com.ar/TETE1341752',
                     seller_reputation:
                      { level_id: null,
                        power_seller_status: null,
                        transactions: [Object] },
                     buyer_reputation: { tags: [] },
                     status: { site_status: 'deactive' } 
                 }
         ]
 });


returns:
        err = null
        res = [ 
                { 
                    id: 145925943,
                    nickname: 'TETE2780570',
                    registration_date: '2013-09-17T14:20:30.000-04:00',
                    country_id: 'AR',
                    address: { state: 'AR-C', city: 'Palermo' },
                    user_type: 'normal',
                    tags: [ 'normal', 'test_user', 'user_info_verified' ],
                    logo: null,
                    points: 100,
                    site_id: 'MLA',
                    permalink: 'http://perfil.mercadolibre.com.ar/TETE2780570',
                    seller_reputation:
                     { level_id: null,
                       power_seller_status: null,
                       transactions: [Object] },
                    buyer_reputation: { tags: [] },
                    status: { site_status: 'deactive' } 
                },
                {
                    id: 145925951,
                    nickname: 'TETE1341752',
                    registration_date: '2013-09-17T14:20:43.000-04:00',
                    country_id: 'AR',
                    address: { state: 'AR-C', city: 'Palermo' },
                    user_type: 'normal',
                    tags: [ 'normal', 'test_user', 'user_info_verified' ],
                    logo: null,
                    points: 100,
                    site_id: 'MLA',
                    permalink: 'http://perfil.mercadolibre.com.ar/TETE1341752',
                    seller_reputation:
                     { level_id: null,
                       power_seller_status: null,
                       transactions: [Object] },
                    buyer_reputation: { tags: [] },
                    status: { site_status: 'deactive' } 
                }
        ]


var meli = require('mercadolibre');
var meliObject = new meli.Meli(client_id, client_secret, [access_token], [refresh_token]);

print(meliObject.getAuthURL(redirect_uri));
print(meliObject.authorize(code, redirect_uri, callback));
print(meliObject.get(path, [params,], callback));

print(meliObject.post(path, body, [params,], callback));

url = http;
datos = "Activando...";
respuesta = requests.post(url, json = datos);

como_json = respuesta.json()
print("La respuesta del servidor es:")
print(como_json)

form_data =[('color', 'blanco'), ('color', 'verde'), ('idioma', 'es')]
resp = requests.post('url', data = form_data)

module.exports = app;

