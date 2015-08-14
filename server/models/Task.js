var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: {type: String, required: '{PATH} is required'},
    closed: {type: Boolean, default: false},
    total: {type: Number, default: 0},
    created: {type: Date, required: '{PATH} is required'},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    sprint: {
        current: {type: Boolean, default: false},
        spent: {type: Number, default: 0},
        planned: {type: Number, default: 0}
    }
});

var Task = mongoose.model('Task', taskSchema);