var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
  name: String,
  color: String,
  image: String,
  price: String,
  category: { // populate:
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'categories', //'categories': collection
  },
  //Relationship : products(many) - categorys(one)
  quantity: Number,
  date: String,
});

var ProductModel = mongoose.model('products', ProductSchema); // 'products' : collection
module.exports = ProductModel;
