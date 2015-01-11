var Task = require('mongoose').model('Task'),
    Category = require('mongoose').model('Category');

exports.createTask = function(req, res, next){
    var taskData = req.body;

    Task.create(taskData, function(err, task){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            Category.update({ _id: taskData.category },{ $push: { tasks: task._id} }).exec(function(error, category){
                res.send(task);
            });
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
    Task.remove({_id: req.query._id}).exec(function(err, collection){
        if(err) {
            req.status(400);
            return res.send({reason: err.toString()})
        } else {
            console.log(collection);
            res.send(req.user)
        }
    });
};
