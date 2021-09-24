#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var http = require('http');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

module.exports = server;
