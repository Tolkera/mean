var User = require('mongoose').model('User'),
    Sprint = require('mongoose').model('Sprint'),
    Task = require('mongoose').model('Task'),
    _ = require('underscore');

exports.addSprint = function(req, res, next){
    var sprintData = req.body;

    Sprint.create(sprintData, function(err, sprint){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            User.update({ _id: req.user._id},{ $push: { sprints: sprint._id} }).exec();
            User.update({ _id: req.user._id}, {currentSprint: sprint._id}).exec(function(err, user){
                if (err){
                    res.status(400);
                    return res.send({reason: err.toString()})
                } else {
                    res.send(sprint)
                }
            });
            sprintData.tasks.forEach(function(task){
                Task.update({ _id: task._id}, {$set: {"sprint.current": true, "sprint.planned": task.planned}}).exec(function(err, task){
                    if (err){
                        res.status(400);
                        return res.send({reason: err.toString()})
                    }
                })
            })
        }
    })
};

exports.getCurrentSprint = function(req, res, next){
    var sprintId = req.params.id;
    Sprint.findOne({_id: sprintId}).populate('tasks').exec(function(err, sprint){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            res.send(sprint)
        }
    })
};

exports.finishSprint = function(req, res, next){

    User.update({ _id: req.user._id}, {$unset: {currentSprint: ""}}).exec(function(err, user){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            Sprint.findOne({_id: req.params.id}).exec(function(err, sprint){
                if(err){
                    res.status(400);
                    return res.send({reason: err.toString()})
                }
                sprint.tasks.forEach(function(task){
                    Task.update({_id: task}, {$set: {
                        "sprint.current": false,
                        "sprint.spent": 0,
                        "sprint.planned": 0
                    }
                    }).exec(function(err, task){
                        if(err){
                            res.status(400);
                            return res.send({reason: err.toString()})
                        }
                    });
                });
                return res.send(req.user);
            });
        }
    })
};


exports.updateTaskHours = function(req, res, next){
    Task.update({ _id: req.body._id}, {$set: {"sprint.spent": req.body.sprint.spent}}).exec(function(err, task){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            res.send(task);
        }
    })
};


exports.editSprint = function(req, res, next){

    var sprintData = {
        created: req.body.created,
        finish: req.body.finish,
        tasks: _.pluck(req.body.tasks, '_id')
    };
    var tasks = req.body.tasks;

    Sprint.update({ _id: req.params.id}, sprintData).exec(function(err, sprint){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            _.each(tasks, function(task){
                Task.update({_id: task._id}, {$set: {
                    "sprint.current": true,
                    "sprint.planned": task.sprint.planned
                }
                }).exec(function(err, task){
                    if(err){
                        res.status(400);
                        return res.send({reason: err.toString()})
                    }
                });
            });
            _.each(req.body.removedTasks, function(task){
                Task.update({_id: task}, {$set: {
                    "sprint.current": false,
                    "sprint.planned": 0,
                    "sprint.spent": 0
                }
                }).exec(function(err, task){
                    if(err){
                        res.status(400);
                        return res.send({reason: err.toString()})
                    }
                });
            });
           res.send(req.user);
        }
    })

};

