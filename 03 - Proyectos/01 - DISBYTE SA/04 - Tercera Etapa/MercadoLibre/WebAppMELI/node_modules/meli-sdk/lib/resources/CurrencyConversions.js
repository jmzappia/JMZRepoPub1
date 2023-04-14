"use strict";

var api = require('../api');

function currencyConversions(){
  var baseUrl = '/currency_conversions/';
  var ret = {
    baseUrl: baseUrl,
    search: function(from, to, date, options){
      if(typeof date === 'function'){
        options = date;
      }
      var query = 'search?from=' + from + '&to=' + to + ((typeof date !== 'undefined' && typeof date !== 'function')? '&date=' + date : '');
      return api.executeHttp('GET', this.baseUrl + query , {}, options);
    }
  };

  return ret;
}

module.exports = currencyConversions;
