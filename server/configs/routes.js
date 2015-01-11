var auth = require('./auth'),
    users = require('../controllers/users'),
    tasks = require('../controllers/tasks'),
    categories = require('../controllers/categories');


module.exports = function(app){

    app.get('/components/*', function(req, res){
        res.render('../../public/components/' + req.params[0]);
    });
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    app.post('/api/tasks', tasks.createTask);
    app.get('/api/tasks', tasks.getTasks);
    app.put('/api/tasks', tasks.updateTask);
    app.delete('/api/tasks', tasks.deleteTask);

    app.post('/api/categories', categories.createCategory);
    app.get('/api/categories', categories.getCategories);
    app.put('/api/categories', categories.updateCategory);
    app.delete('/api/categories', categories.deleteCategory);

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
                    firstName: req.user.firstName
                }
            })
        } else {
            res.render('index')
        }
    });
};

