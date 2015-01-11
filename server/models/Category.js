var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {type: String, required: '{PATH} is required'},
    closed: {type: Boolean, default: false},
    date: {type: Date, required: '{PATH} is required'},
    tasks: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
    ]
});

var Category = mongoose.model('Category', categorySchema);