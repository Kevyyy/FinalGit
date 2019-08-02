if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
var stripe = require('stripe')
var createError = require('http-errors');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
var express = require('express');
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
mongoose.connect('mongodb://localhost/shopping',{ useNewUrlParser: true });

var usersRouter = require('./routes/users');
require('./config/user_login.js')(passport);
var indexRouter= require('./routes/index');
var app = express();

// view engine setup
app.engine('.hbs', expresshbs({defaultLayout:'layout', extname:'.hbs'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use(session({
  secret: 'justasecret',
  resave:false,
  saveUninitialized: false,
  store: new mongoStore({mongooseConnection:mongoose.connection}),
  cookie:{maxAge:180*60*1000}
 }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);

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

