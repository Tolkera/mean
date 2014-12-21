var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: String, required: '{PATH} is required', unique: true},
    firstName: {type: String, required: '{PATH} is required'},
    hashedPwd: {type: String, required: '{PATH} is required'},
    salt: {type: String, required: '{PATH} is required'},
    courses: [String]
});

userSchema.methods = {
    authenticate: function(pwdEntered){
        return encrypt.hashedPwd(this.salt, pwdEntered) === this.hashedPwd;
    }
};

var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function(){
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt = encrypt.createSalt();
            var hash = encrypt.hashedPwd(salt, '123');
            User.create({username: '1', salt: salt, hashedPwd: hash});
        }
    })
};