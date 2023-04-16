"use strict";

var api = require('../api');
var generator = require('../generator');

function currency(){
  var baseUrl = '/currencies/';
  var operations = ['get'];
  var ret = {
    baseUrl: baseUrl,
    list: function(options){
      return api.executeHttp('GET', this.baseUrl, {}, options);
    }
  };

  ret = generator.mix(ret, operations);
  return ret;
}

module.exports = currency;
