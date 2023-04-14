"use strict";

var http = require('http');
var https = require('https');
var qs = require('querystring');
var config = require('./config');
var Q = require('q');

exports.invoke = function(method, path, data, options_param){
  var client = http;
  var deferred = Q.defer();

  if (method === 'GET') {
    if (typeof data !== 'string') {
      data = qs.stringify(data);
    }
    if (data) {
      path = path + "?" + data;
      data = "";
    }
  } else if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }

  var http_options = {};

  if(options_param){
    http_options = JSON.parse(JSON.stringify(options_param));

    if (!http_options.headers) {
      http_options.headers = {};
    }

    http_options.path = path;
    http_options.method = method;

    if (data) {
      http_options.headers['Content-Length'] = Buffer.byteLength(data, 'utf-8');
    }

    if (!http_options.headers.Accept) {
      http_options.headers.Accept = 'application/json';
    }

    if (!http_options.headers['Content-Type']) {
      http_options.headers['Content-Type'] = 'application/json';
    }

    http_options.headers['User-Agent'] = config.userAgent;
  }

  var req = client.request(http_options);

  req.on('error', function(err){
    console.log('Error with request: ' + err.message);
    deferred.reject(err);
  });

  req.on('response', function(res){
    var buffer = '';
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      buffer += chunk;
    });

    res.on('end', function(){
      deferred.resolve(JSON.parse(buffer));
    });

  });

  if(data){
    req.write(data);
  }

  req.end();

  return deferred.promise;
};
