var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckedSchema = new Schema({
    name: String,
    email: String,
    checked: String
});

module.exports = mongoose.model('checked', CheckedSchema);