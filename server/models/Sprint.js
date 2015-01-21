var mongoose = require('mongoose');

var sprintSchema = mongoose.Schema({
    created: Date,
    finish: Date,
    contents: [{
        categoryInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: false},
        tasks: [{
            taskInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Task', index: false},
            planned: Number,
            spent: {type: Number, default: 0}
        }]
    }]
});

var Sprint = mongoose.model('Sprint', sprintSchema);