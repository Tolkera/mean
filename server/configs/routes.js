var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses');

module.exports = function(app){

    app.get('/components/*', function(req, res){
        res.render('../../public/components/' + req.params[0]);
    });
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCourseDetails);

    app.post('/login', auth.authenticate);
    app.post('/logout', function(req, res){
        req.logout();
        res.end()
    });

    app.all('/api/*', function(req, res){
        res.send(404);
    });

    app.get('*', function(req, res){
        if(req.user) {
            res.render('index', {
                bootstrappedUser: {
                    _id: req.user._id,
                    username: req.user.username,
                    firstName: req.user.firstName,
                    courses: req.user.courses,
                    tasks: req.user.tasks
                }
            })
        } else {
            res.render('index')
        }
    });
};

