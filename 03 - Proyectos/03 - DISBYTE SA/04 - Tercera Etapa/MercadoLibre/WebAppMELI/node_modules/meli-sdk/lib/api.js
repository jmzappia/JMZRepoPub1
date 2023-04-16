"use strict";

var rc = require('./restClient');
var config = require('./config');
var utils = require('./utils');

var setOptions = exports.setOptions = function setOptions(options){
  if(typeof options === 'object'){
    config.default_options = utils.merge(config.default_options, options);
  }
};

function executeHttp(http_method, path, data, http_options) {
  if (typeof http_options === "undefined") {
    http_options = null;
  }
  if (!http_options) {
    http_options = config.default_options;
  } else {
    http_options = utils.merge(config.default_options, http_options);
  }

  return rc.invoke(http_method, path, data, http_options);
}

exports.executeHttp  = executeHttp;
