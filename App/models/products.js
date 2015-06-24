var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    desc: String,
    price: String,
    user: String,
    storeId: String,
    categoryId: String,
    image: String,
    store: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model('Product', ProductSchema);