var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var multer  = require('multer');
var busboy = require('busboy');
require ('./models/users');
require('./models/products');
require('./config/passport');
require('./models/categories');
require('./models/stores');

var date = Date.now();

mongoose.connect('mongodb://localhost/products');


var Product = require('./models/products');
var User = require('./models/users');
var Category = require('./models/categories');
var routes = require('./routes/routes');
var users = require('./routes/users');
var Store = require('./models/stores');

var auth = jwt({secret: 'jurgenz', userProperty: 'payload'});



var app = express();
done = false;

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
app.use(multer({ dest: './public/images',
    rename: function (fieldname, filename) {
        return '_' + date;
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    }
}));

var router = express.Router();

app.post('/api/photo',function(req,res){
    if(done==true){
        console.log(req.files);
    }

});

//router params for user ID

router.param('user', function(req, res, next, id) {
    var query = User.findById(id);

    query.exec(function (err, user){
        if (err) { return next(err); }
        if (!user) { return next(new Error('can\'t find user')); }

        req.user = user;
        return next();
    });
});

//router params to find product by user ID

router.param('products', function(req, res, next, id) {
    var query = Product.find({user:id});

    query.exec(function (err, products) {
        if (err) {return next(err);}
        if (!products) { return next()}

        req.products = products;
        return next();
    })

});

//router params to find category by ID

router.param('category', function(req, res, next, id) {
    var query = Category.findById(id);
    query.exec(function(err, category){
        if (err) {return next(err); }
        if (!category) { return next(new Error('cant find category')); }

        req.category = category;
        return next ();
    })
});

//router params for all stores

router.param('stores', function(req, res, next, id) {
    var query = Store.findById(id);
    query.exec(function(err, stores) {
        if (err) {return next(err); }
        if (!stores) { return next(new Error('Store not found')); }

        req.stores = stores;
        return next();
    })
});

router.param('product', function(req, res, next, id){
    var query = Product.findById(id);
    query.exec(function(err, products){
        if (err) {return next(err);}
        if(!products) {return next();}

        req.product = products;
        return next()
    })
});
//get all products API

router.get('/user/products/:products', function(req, res) {
    res.json(req.products);

});

//get all stores from a user

router.get('/user/:user', function(req, res){
    req.user.populate('stores', function(err, store) {
        if (err) {
            return next(err);
        }

        res.json(store);
    });
});

//get all stores from user >> stores

router.get('/user/:user/:stores/', function(req, res) {
    req.stores.populate('categories', function(err, category) {
        if (err) {
            return next(err);
        }
        res.json(category);
    });
});

//get all products in a user >> store >> category

router.get('/user/:user/:stores/:category', function(req, res) {
    req.category.populate('products', function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

//get all information about product

router.get('/user/:user/:stores/:category/:product', function(req, res) {
    req.product.populate('category store', function(err, post) {
        if (err) {return next(err);}

        res.json(post);
    })
});

router.post('/user/:user/stores', function(req, res, next) {
    var store = new Store(req.body);
    store.post = req.post;

    store.save(function(err, store) {
        if(err) {return next(err); }

        req.user.stores.push(err, store);
        req.user.save(function(err, stores) {
            if(err){return next(err); }

            res.json(stores);
        })
    })
});

router.post('/user/:user/:stores/category', function(req, res, next) {
    var category = new Category(req.body);
    category.post = req.post;

    category.save(function(err, category) {
        req.stores.categories.push(category);
        req.stores.save(function(err, category) {
            if(err){return next(err) ;}

            res.json(category);
        })
    })
});


router.post('/user/:user/:stores/:category/products', auth, function(req, res, next) {
    var product = new Product(req.body);
    product.post = req.post;
    product.user = req.payload._id;
    product.category = req.category;
    product.store = req.stores;
    product.storeId = req.stores._id;
    product.categoryId = req.category._id;
    product.image = '_' + date + '.jpg';

    product.save(function(err, product){
        if(err) {return next(err); }

        req.category.products.push(product);
        req.category.save(function(err, product){
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
app.get('/login', routes.login);
app.get('/register', routes.register);
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
