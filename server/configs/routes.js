module.exports = function(app){

    app.get('/components/*', function(req, res){
        res.render('../../public/components/' + req.params[0]);
    });

    app.get('*', function(req, res){
        res.render('index')
    });
};

