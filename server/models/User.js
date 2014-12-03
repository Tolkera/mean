var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({username: '1', password: '123'});
        }
    })
}

exports.createDefaultUsers = createDefaultUsers;