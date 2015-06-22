var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model('Store', storeSchema);