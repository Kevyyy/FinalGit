var express = require('express');
var router = express.Router()
var passport = require('passport');
var product = require('../config/models/product');
var Cart = require('../config/models/cart');
var Order = require('../config/models/order');
var csrf = require('csurf');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true });


var csrfProtection = csrf();
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { 
  title: '' ,
  style:'home.css'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { 
  title: '' ,
  style:'login.css'
  });
});


//router.use(csrfProtection);

router.get('/signup', function(req, res, next) {
  res.render('signup', { 
  title: '' ,
  style:'signup.css',
  //csrfToken: req.csrfToken()
  });
});

router.get('/', function(req, res){
   res.render('index');
  });


router.get('/shopping', function(req, res, next) {
  product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize));
    }
      res.render('shopping', { 
        title:'Shopping Cart', 
        products: productChunks,
        style:'shopping.css',
    });
  });
});



//login
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });


router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/shopping',
  failureRedirect: '/signup',
  failureFlash: true
 }));

router.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.hbs', {
  style:'profile.css',
   user:req.user
  });
 });

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
   return next();
 
  res.redirect('/');
 };

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});


router.get('/addcart/:id',function(req,res,next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  product.findById(productId, function(err, foundproduct){
    if (err){
      return res.redirect('/shopping')
    }
    cart.add(foundproduct, foundproduct._id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shopping');
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next) {
  if (!req.session.cart) {
    console.log(req.session.cart);
    return res.render('shopping-cart', {
      products: null,
      style:'shopping-cart.css'})};
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart', { 
  products: cart.generateArray(),
  totalPrice: cart.totalPrice,
  title: '' ,
  style:'shopping-cart.css',
  });
});

router.get('/checkout', function(req, res, next) {
var stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

res.render("checkout",{
stripePublicKey: stripePublicKey,
style:'checkout.css',
});
});

router.post('/checkout', function(req, res, next) {
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  const stripe = require('stripe')('sk_test_8NkaaWBV0Uyhy84hka8O2fFt007xFkVErG');
  const token = req.body.stripeToken; 
  console.log("gothereee!");
  (async () => {
    const charge = await stripe.charges.create({
      amount:  cart.totalPrice*100,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    });
  })();
  var order = new Order({
    cart: cart,
    address: req.body.address,
    name: req.body.name,
});
console.log(order);
order.save(function(err, result) {
  if (err) {
    throw (err);
  }
    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/shopping');
});
});


module.exports = router;
//end login


