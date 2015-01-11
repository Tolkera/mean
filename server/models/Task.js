var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: {type: String, required: '{PATH} is required'},
    closed: {type: Boolean, default: false},
    spent: {type: Number},
    date: {type: Date, required: '{PATH} is required'},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

var Task = mongoose.model('Task', taskSchema);