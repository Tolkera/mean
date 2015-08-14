var mongoose = require('mongoose');

var sprintSchema = mongoose.Schema({
    created: Date,
    finish: Date,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

var Sprint = mongoose.model('Sprint', sprintSchema);