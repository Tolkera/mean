var express = require('express');
var mongoose = require('mongoose');
var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || "dev";
var config = require('./server/configs/config')[env];

require('./server/configs/express')(app, config);
require('./server/configs/mongoose')(config);
require('./server/configs/routes')(app);

app.listen(config.port);
console.log('listening on ' + config.port );