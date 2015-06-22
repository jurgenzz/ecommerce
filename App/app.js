var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
require ('./models/users');
require('./models/products');
require('./config/passport');

mongoose.connect('mongodb://localhost/products');


var Product = require('./models/products');
var User = require('./models/users');
var routes = require('./routes/routes');
var users = require('./routes/users');

var auth = jwt({secret: 'jurgenz', userProperty: 'payload'});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

var router = express.Router();

router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function (err, user){
        if (err) { return next(err); }
        if (!user) { return next(new Error('can\'t find user')); }

        req.user = user;
        return next();
    });
});


router.get('/user/:user', function(req, res) {
    req.user.populate('products', function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});


router.post('/user/:user/products', function(req, res, next) {
    var product = new Product(req.body);
    product.post = req.post;

    product.save(function(err, product){
        if(err) {return next(err); }

        req.user.products.push(product);
        req.user.save(function(err, product){
            if(err){ return next(err); }

            res.json(product);
        })
    })
});

router.post('/register', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function (err){
        if(err){ return next(err); }

        return res.json({token: user.generateJWT()})
    });
});

router.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }

        if(user){
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

app.use('/api', router);

app.get('/', routes.index);
//app.get('/login', routes.login);
//app.get('/register', routes.register);
app.get('/dash', routes.dash);
app.get('/users', users);
app.get('/dash/:name', routes.partials);
app.get('*', routes.index);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
