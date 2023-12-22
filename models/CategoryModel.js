var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema({
  name: String,
  country: String,
});
var CategoryModel = mongoose.model('categories', CategorySchema);
module.exports = CategoryModel;
// Một model tương ứng vs 1 trang router trong 1 trang router đó có các router con và 1 trang router có một model(data-base) để lưu data của 1 trang đó