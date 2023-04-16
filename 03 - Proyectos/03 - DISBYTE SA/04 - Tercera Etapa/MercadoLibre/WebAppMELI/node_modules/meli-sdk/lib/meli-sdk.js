"use strict";

var configuration = require('./config');
var api = require('./api');

module.exports = function(){

  function configure(options){
    api.setOptions(options);
  }

  return {
    configure: configure,
    configuration: configuration.default_options,
    version: configuration.sdkVersion,
    currency: require('./resources/Currency')(),
    currencyConversions: require('./resources/CurrencyConversions')()
  };
};
