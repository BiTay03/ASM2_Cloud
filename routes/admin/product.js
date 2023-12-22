var express = require('express'); // framework
var router = express.Router(); // khai báo router
var ProductModel = require('../../models/ProductModel');
var CategoryModel = require('../../models/CategoryModel'); // ../ back ra thư mục to 

router.get('/', async (req, res) => { // bản chất ở đây là localhost:3000/product khác hoàn toàn với trang localhost:3000 render ra trang home vì đã khai báo trong app.js
  var products = await ProductModel.find({}).populate('category'); // populate(..): Gọi ra trường tham chiếu đến từ bảng này đến bảng kia
  //Path: views/product/index.hbs
  res.render('admin/product/index', { products, layout:'layout_admin' });
})


router.get('/add', async (req, res) => {
  var categories = await CategoryModel.find({});
  res.render('admin/product/add', { categories, layout:'layout_admin' });
})

router.post('/add', async (req, res) => {
  var products = req.body;
  await ProductModel.create(products);
  res.redirect('/product');
})


router.get('/delete/:id', async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  res.redirect('/product');
})

router.get('/deleteall', async (req, res) => {
  //SQL: DELETE FROM brands
  //     TRUNCATE TABLE brands
  await ProductModel.deleteMany();
  console.log('Delete all Product succeed !');
  res.redirect('/Product'); // sau khi xoá xong chuyển hướng về trang product 
})

router.get('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var product = await ProductModel.findById(id);
  var category = await CategoryModel.find({});
  res.render('admin/product/edit', { product, category, layout: 'layout_admin' });
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var product = req.body;
  try {
     await ProductModel.findByIdAndUpdate(id, product);
     console.log('update succeed !');
  } catch (err) {
     console.log('update failed. Error: ' + err);
  }
  res.redirect('/product');
})

module.exports = router;
