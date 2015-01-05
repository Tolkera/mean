var Task = require('mongoose').model('Task');

exports.createTask = function(req, res, next){
    var taskData = req.body;

    Task.create(taskData, function(err, task){
        if (err){
            if(err.toString().indexOf('E11000') > -1){
                err = new Error('Duplicate user name')
            }
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            res.send(task);
        }
    })
};

exports.getTasks = function(req, res, next){
    var userId = req.query.userId;
    Task.find({userId: userId}).exec(function(err, collection){
        res.send(collection)
    });
};

exports.updateTask = function(req, res, next){
    var taskUpdates = req.body;

    Task.update({_id: taskUpdates._id}, {$set: {
        done: req.body.done,
        name: req.body.name
    }}).exec(function(err, collection){
        if(err) {
            req.status(400);
            return res.send({reason: err.toString()})
        }
        res.send(req.user)
    });
};

exports.deleteTask = function(req, res, next){
    console.log(req.query._id);
    Task.remove({_id: req.query._id}).exec(function(err){
        if(err) {
            req.status(400);
            return res.send({reason: err.toString()})
        } else {
            res.send(req.user)
        }
    });
};
