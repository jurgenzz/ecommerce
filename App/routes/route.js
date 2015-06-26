//var express = require('express');
//var passport = require('passport');
//var jwt = require('express-jwt');
//var router = express.Router();
//var mongoose = require('mongoose');
//var User = mongoose.model('User');
//var Product = mongoose.model('Products');
//
//
//router.param('user', function(req, res, next, id) {
//    var query = User.findById(id);
//
//    query.exec(function (err, user){
//        if (err) { return next(err); }
//        if (!user) { return next(new Error('can\'t find user')); }
//
//        req.user = user;
//        return next();
//    });
//});
//
//
//router.get('/user/:user', function(req, res) {
//    req.user.populate('products', function(err, post) {
//        if (err) { return next(err); }
//
//        res.json(post);
//    });
//});
//
//
//router.post('/user/:user/products', function(req, res, next) {
//    var product = new Product(req.body);
//    product.post = req.post;
//
//    product.save(function(err, product){
//        if(err) {return next(err); }
//
//        req.user.products.push(product);
//        req.user.save(function(err, product){
//            if(err){ return next(err); }
//
//            res.json(product);
//        })
//    })
//});
//
//router.post('/register', function(req, res, next){
//    if(!req.body.username || !req.body.password){
//        return res.status(400).json({message: 'Please fill out all fields'});
//    }
//
//    var user = new User();
//
//    user.username = req.body.username;
//
//    user.setPassword(req.body.password);
//
//    user.save(function (err){
//        if(err){ return next(err); }
//
//        return res.json({token: user.generateJWT()})
//    });
//});
//
//router.post('/login', function(req, res, next){
//    if(!req.body.username || !req.body.password){
//        return res.status(400).json({message: 'Please fill out all fields'});
//    }
//
//    passport.authenticate('local', function(err, user, info){
//        if(err){ return next(err); }
//
//        if(user){
//            return res.json({token: user.generateJWT()});
//        } else {
//            return res.status(401).json(info);
//        }
//    })(req, res, next);
//});
//
