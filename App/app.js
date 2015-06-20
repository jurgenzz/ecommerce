var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products');


var Product = require('./models/products');
var routes = require('./routes/routes');
var users = require('./routes/users');



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

var router = express.Router();
router.route('/products')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var product = new Product();      // create a new instance of the Bear model
        product.name = req.body.name;
        product.desc = req.body.desc;
        product.price = req.body.price; // set the bears name (comes from the request)

        // save the bear and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'product created!' });
        });

    })

    .get(function(req, res) {
        Product.find(function (err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });
app.use('/api', router);

app.get('/', routes.index);
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
