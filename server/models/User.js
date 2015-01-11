var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: String, required: '{PATH} is required', unique: true},
    firstName: {type: String, required: '{PATH} is required'},
    hashedPwd: {type: String, required: '{PATH} is required'},
    salt: {type: String, required: '{PATH} is required'},
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

userSchema.methods = {
    authenticate: function(pwdEntered){
        return encrypt.hashedPwd(this.salt, pwdEntered) === this.hashedPwd;
    }
};

var User = mongoose.model('User', userSchema);