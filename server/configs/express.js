var express = require('express'),
    logger = require('morgan'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

module.exports = function(app, config){

//    app.set('views', config.rootPath + '/server/views');
    app.set('views', config.rootPath + '/public/views');
    app.set('view engine', 'jade');
    //  app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    })).use(bodyParser.json());
    app.use(session({
        secret: 'gmot',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + '/public/'));

};