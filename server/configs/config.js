var path = require('path');
var rootPath = path.normalize(__dirname + "/../..");

module.exports = {
    dev: {
        rootPath: rootPath,
        db: 'mongodb://localhost/gmot',
        port: process.env.PORT || 3030
    },
    prod: {
        rootPath: rootPath,
        db: 'mongodb://gmot:gmot2@ds053310.mongolab.com:53310/gmot',
        port: process.env.PORT || 80
    }
};