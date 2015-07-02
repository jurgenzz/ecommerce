
exports.index = function(req, res){
    res.render('index');
};

exports.dash = function(req, res){
    res.render('dash/index');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('dash/' + name);
};


exports.login = function(req, res) {
    res.render('login')
};

exports.register = function(req, res) {
    res.render('register')
};

exports.order = function(req, res) {
    res.render('orders/order')
};

exports.orders = function (req, res) {
    var name = req.params.name;
    res.render('orders/' + name);
};

exports.docs = function (req, res) {
    res.render('docs/index')
};

exports.started = function (req, res) {
    res.render('docs/started')
};

exports.about = function (req, res) {
    res.render('docs/about')
};

exports.test = function(req, res) {
    res.render('test')
};