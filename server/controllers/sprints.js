var User = require('mongoose').model('User'),
    Sprint = require('mongoose').model('Sprint');

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
            })
        }
    })
};

exports.getCurrentSprint = function(req, res, next){
    var sprintId = req.params.id;
    Sprint.findOne({_id: sprintId}).populate('contents.tasks.taskInfo contents.categoryInfo').exec(function(err, sprint){
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
            res.send(req.user)
        }
    })
};

exports.updateSprint = function(req, res, next){

    var sprintData = req.body;

    Sprint.findOne({ _id: req.params.id}).exec(function(err, sprint){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            sprint.contents.forEach(function(category){
                category.tasks.forEach(function(task){
                  if(task._id == sprintData._id) {
                      task.spent = sprintData.spent;
                      sprint.save(function(err){
                          if(err){
                              req.status(400);
                              return res.send({reason: err.toString()})
                          } else {
                              res.send(req.user)
                          }
                      })

                  }
                })
            });
        }
    })
};

