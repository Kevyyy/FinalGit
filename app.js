if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

var stripe = require('stripe')
var createError = require('http-errors');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
var express = require('express');
const formDataMW = require('express-form-data')
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var expresshbs = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var csrf = require('csurf');
var expressValidator = require('express-validator');
var url = process.env.MONGODB_URI ||'mongodb://localhost:27017/shopping';
mongoose.connect(url, {useNewUrlParser: true });
var usersRouter = require('./routes/users');
require('./config/user_login.js')(passport);
var indexRouter= require('./routes/index');
var sellerRouter= require('./routes/seller');
var productRouter= require('./routes/products');
var app = express();
var cors = require('cors')

//cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// view engine setup
app.engine('.hbs', expresshbs({defaultLayout:'layout', extname:'.hbs'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');


app.use(logger('dev'));
app.use(formDataMW.parse())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend/build')));


app.use(session({
  secret: 'justasecret',
  resave:false,
  saveUninitialized: false,
  store: new mongoStore({mongooseConnection:mongoose.connection}),
  cookie:{maxAge:100*60*1000}
 }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  res.locals.seller = req.isSeller;
  next();
});


app.use('/', indexRouter);
app.use('/seller', sellerRouter);
app.use('/products',productRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



/*app.use('/users', usersRouter);*/




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;

