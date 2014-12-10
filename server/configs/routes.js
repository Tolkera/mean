var auth = require('./auth'),
    users = require('../controllers/users');

module.exports = function(app){

    app.get('/components/*', function(req, res){
        res.render('../../public/components/' + req.params[0]);
    });
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.post('/login', auth.authenticate);
    app.post('/logout', function(req, res){
        req.logout();
        res.end()
    });

    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        })
    });
};

