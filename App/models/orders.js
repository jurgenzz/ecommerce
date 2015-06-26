var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrdersSchema = new Schema({
    name: String,
    email: String,
    count: String,
    productId: String,
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    user: String
});

module.exports = mongoose.model('Orders', OrdersSchema);