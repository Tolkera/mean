var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required'},
    featured: {type: Boolean, required: '{PATH} is required'},
    published: {type: Date, required: '{PATH} is required'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

exports.createDefaultCourses = function(){
    Course.find({}).exec(function(err, collection){
        if(collection.length === 0){
            Course.create({title: 'Ext', featured: true, published: new Date('8/1/20'), tags: ['a', 'b', 'c']});
            Course.create({title: 'Backbone', featured: false, published: new Date('9/1/20'), tags: ['c', 'b', 'd']});
            Course.create({title: 'Angular', featured: true, published: new Date('10/1/20'), tags: ['d', 'e', 'c']});
            Course.create({title: 'Require', featured: true, published: new Date('11/1/20'), tags: ['e', 'f', 'd']});
        }
    })
};