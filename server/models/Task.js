var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: {type: String, required: '{PATH} is required'},
    done: {type: Boolean},
    date: {type: Date, required: '{PATH} is required'},
    userId: {type: String}
});

var Task = mongoose.model('Task', taskSchema);