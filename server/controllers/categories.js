var Category = require('mongoose').model('Category'),
    User = require('mongoose').model('User'),
    Task = require('mongoose').model('Task');

exports.createCategory = function(req, res, next){
    var categoryData = req.body;

    Category.create(categoryData, function(err, category){
        if (err){
            res.status(400);
            return res.send({reason: err.toString()})
        } else {
            User.update({ _id: req.user._id},{ $push: { categories: category._id} }).exec(function(error, user){
                 res.send(category);
            })
        }
    });
};

exports.getCategories = function(req, res, next){

    User.findOne({_id: req.user._id}).exec(function(err, user){
        if(err){
            return res.send({reason: err.toString()})
        } else {
             Category.find({_id : {$in: user.categories}}).populate('tasks').exec(function(err, categories){
                 res.send(categories);
             })
        }
    });
};

exports.updateCategory = function(req, res, next){
    var categoryUpdates = req.body;

    Category.update({_id: req.params.id}, {$set: { name: categoryUpdates.name}}).exec(function(err, category){
            if(err) {
                req.status(400);
                return res.send({reason: err.toString()})
            } else {
                res.send(req.user)
            }
        });
};


exports.deleteCategory = function(req, res, next){
    var categoryId = req.params.id;
    Category.remove({_id: categoryId}).exec(function(err){
        if(err) {
            req.status(400);
            return res.send({reason: err.toString()})
        } else {
            User.update({_id: req.user._id}, {$pull: {categories: categoryId}}).exec();
            Task.remove({category: categoryId}).exec();
            res.send(req.user);
        }
    });
};