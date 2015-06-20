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

