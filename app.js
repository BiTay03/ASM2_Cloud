var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// khai báo biến router => để import đường dẫn file code vào router => biến router lưu giá trị import đường dẫn vào file router đó
var indexRouter = require('./routes/index'); // require = import, tương đương file index trong routers
var productRouter = require('./routes/admin/product');
var categoryRouter = require('./routes/admin/category');

var app = express();

//1. config mongoose
var mongoose = require('mongoose');
var uri = 'mongodb+srv://Minhvjp03:bivjp03@cluster0.tyhuvvm.mongodb.net/Toy'; // uri + dbname: phone
mongoose
  .connect(uri)
  .then(() => console.log('Connect to DB succeed !'))
  .catch((err) => console.log(err));

//2. config body-parser
var bodyParser = require('body-parser');
//2.1 Config body_parser library
app.use(bodyParser.urlencoded({ extended: false }));

// 3. import eual hbs
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// khai báo router, gán đường dẫn ở trên web tương ứng vs chạy trang code ở local
app.use('/', indexRouter); // đầu vào của router rồi mới vào các router con nằm trong file indexRouter
// app.use('/users', usersRouter);
// app.use('/admin', adminRouter);
app.use('/product', productRouter); //admin => Khi gõ đường dẫn product thì sẽ nhảy vào mục routes/admin/product => Mục đích của tạo biến router để lưu giá trị import đường dẫn của file router một trang view của mình muốn tạo
app.use('/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//4. config port (for cloud deployment)
app.listen(process.env.PORT || 3001);

module.exports = app;
