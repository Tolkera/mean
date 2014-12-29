var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.createUser = function(req, res, next){
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashedPwd = encrypt.hashedPwd(userData.salt, userData.password);

    User.create(userData, function(err, user){
        if (err){
            if(err.toString().indexOf('E11000') > -1){
                err = new Error('Duplicate user name')
            }
            res.status(400);
            return res.send({reason: err.toString()})
        }
        req.logIn(user, function(err){
            if(err){return next(err)}
            res.send(user);
        })
    })
};

exports.updateUser = function(req, res, next){
   var userUpdates = req.body;

   if(req.user._id != userUpdates._id){
       res.status(403);
       res.end();
   }

    req.user.firstName = userUpdates.firstName;
    req.user.username = userUpdates.username;
    req.user.tasks = userUpdates.tasks;

    if(userUpdates.password && userUpdates.password.length > 0){
        req.user.salt = encrypt.createSalt();
        req.user.hashedPwd = encrypt.hashedPwd(req.user.salt, userUpdates.password);
    }

    req.user.save(function(err){
        if(err){
            req.status(400);
            return res.send({reason: err.toString()})
        } else {
            res.send(req.user)
        }
    })
};
