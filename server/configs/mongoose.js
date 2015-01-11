var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    taskModel = require('../models/Task'),
    categoryModel = require('../models/Category');

module.exports = function(config){

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('database open')
    });
};
