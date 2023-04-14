"use strict";

var sdkVersion = exports.sdkVersion = require('../package').version;
var userAgent = exports.userAgent = 'MeliSDK/Meli-node-SDK ' + sdkVersion + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + ')';

var default_options = exports.default_options = {
  'mobile': false,
  'schema': 'http',
  'host': 'api.mercadolibre.com',
  'headers': {}
};
