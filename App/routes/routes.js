
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