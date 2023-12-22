var express = require('express'); // framework
const ProductModel = require('../models/ProductModel');
var router = express.Router(); // khai báo router

/* GET home page. */
// khai báo router hiển thị product ra trang home => Hiển thị cho người dùng xem
router.get('/', async (req, res, next) => {
  var products = await ProductModel.find({});
  res.render('index', {products}); // render chạy file index.hbs(Lưu ý: phải đúng file view index.hbs)
});

// Làm thế nào để sử dụng layout của từng trang riêng biệt ???


module.exports = router;
