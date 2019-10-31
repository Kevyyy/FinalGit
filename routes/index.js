var express = require('express');
var router = express.Router()
var passport = require('passport');
var product = require('../config/models/product');
var Cart = require('../config/models/cart');
var Order = require('../config/models/order');
var csrf = require('csurf');
var mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
//mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true });
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping';
mongoose.connect(url, { useNewUrlParser: true });
var mysql = require('mysql');
var dbconfig = require('../config/models/database_config');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var Messages = require('../config/models/messages');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true });
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping';
mongoose.connect(url, { useNewUrlParser: true });
var csrfProtection = csrf();
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: '',
    style: 'home.css'
  });
});
router.post('/')
router.get('/messageRoom/:id', function (req, res) {
  
  let sellerId=req.params.id

  console.log("sellerId:", sellerId);
/*
 * fetch the seller data and seller Profile Data from the database
 *  @returns {Promise<void>}
 * 
 */
function fetchSellerData() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM seller WHERE id = ?', [sellerId],
      function (error, rows) {
        if (error) return reject(error);

        var string = JSON.stringify(rows)
        var sellerdata = JSON.parse(string);
        console.log("whaaaat", sellerdata);
        resolve(sellerdata);
      })
  }).catch((error)=>console.log(error));
}
  /***
 * generate a room number for the socket.IO client
 * @returns {Promise<string>} roomId of the seller
 */
  function generateRoomNumber(sellerdata) {
  
    console.log("sellerData2", sellerdata)
    console.log("requser",req.user)
    const user = req.user[0].id;
    console.log("req.user:",req.user)

     return new Promise((resolve, reject) => {
      var seller = (sellerdata[0].id);
      var roomName = "user" + user + "seller" + seller
      resolve(roomName)
    }).catch((error)=>console.log(error)); 
  }

  /**
   * Send the Data to client
   * @param {Object} sellerData
   * @param {Object} 
   * 
   */
  async function sendRoomNumber(){
    sellerdata = await fetchSellerData()
    await console.log("Seller data", sellerdata)
    roomNumber = await generateRoomNumber(sellerdata)
    res.json(roomNumber)
  }

  sendRoomNumber()
})


router.post('/chatbar', function (req, res, next) {

});
router.get('/getContact', function (req, res, next) {
  userId = req.user[0].id
  userType = req.user[0].type
  switch (userType) {
    case 'customer':
      connection.query('SELECT conversations.*,seller.*,seller_Profile.* FROM conversations JOIN seller ON conversations.seller_id = seller.id JOIN seller_profile ON conversations.seller_id = seller_Profile.seller_id AND conversations.customer_id=?'
        , [req.user[0].id],
        function (err, rows) {
          if (err)
          throw err
          console.log("sfasdf",rows)
          res.json(rows)
        });
      break;
    case 'seller':
      connection.query('SELECT conversations.*,customer.* FROM conversations JOIN customer ON conversations.customer_id = customer.id AND conversations.seller_id=?'
        , [req.user[0].id],
        function (err, rows) {
          res.json(rows)
        });
      break;
    // code block
  }
})
router.get('/getConversation/:room',(req,res)=>{
  room=req.params.room
  Messages.find({ room: room },function(err,conversation){
    if (err) return err
    res.json(conversation)
  })

})
router.get('/t', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: '',
    style: 'login.css'
  });
});
router.get('/login-seller', function (req, res, next) {
  res.render('login-seller', {
    title: '',
    style: 'login.css'
  });
});
router.get('/chat', function (req, res, next) {
  res.render('chat', {
    title: 'chat',
    style: 'chat.css'
  });
})
router.get('/chatIndividual', function (req, res, next) {
  res.render('chatIndividual', {
    title: 'chatIndividual',
    style: 'chatIndividual.css'
  });
})
//router.use(csrfProtection);
/*router.post('/sendreview',function(req,res,next){
  var review =req.body.review
  connect.query('UPDATE transaction SET review = ? WHERE seller_id=?',[review,id]
})*/ 
router.get('/getReview/', function (req, res, next) {
  userId=req.user[0].id
  connection.query('SELECT * transaction_Item WHERE stock_seller_id = ? '
    , [userId],
    function (err, rows) {
      res.json(rows)
    })
});

router.get('/signup', function (req, res, next) {
  var messages = req.flash('errors');
  var messages2 = req.flash('errors2');
  console.log("our msg", messages.length > 0)
  messages.push(messages2);
  //console.log(messages);
  res.render('signup', {
    messages: messages,
    hasErrors: messages.length > 0,
    title: '',
    style: 'signup.css',
    //csrfToken: req.csrfToken()
  });
});

router.get('/', function (req, res) {

  res.render('index');
});


router.get('/products', function (req, res, next) {
  product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 4;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.json(productChunks);
  });
});


//login
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  //failureRedirect: '/login',
  failureFlash: true
}),
  function (req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    //res.redirect('/');
  });

router.post('/login-seller', passport.authenticate('local-seller-login', {
  successRedirect: '/seller',
  failureRedirect: '/login_seller',
  failureFlash: true
}),
  function (req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/');
  });


router.post('/signup', [
  check('firstName').isLength({ min: 1 }).withMessage('yout first name must be a first name'),
  check('lastName').isLength({ min: 1 }).withMessage('your last name must be a last name'),
  check('username').isEmail().withMessage('your email must be an email'),
  check('password').isLength({ min: 5 }).withMessage('password must be at least 5 chars long'),
], function (req, res, next) {
  console.log("hereeeeee------>")
  var errors = validationResult(req);
  console.log(!errors.isEmpty());
  if (!errors.isEmpty()) {
    var errorsarray = errors.errors;
    var errorsmsg = errorsarray.map(a => a.msg);
    console.log('this is our msg', errorsmsg);
    req.flash('errors', errorsmsg);
    return res.redirect('/signup')
  }
  next();
},
  passport.authenticate('local-signup', {
    successRedirect: '/products',
    failureRedirect: '/signup',
    failureFlash: true
  }),
  function (req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/signup');
  });


router.post("/distributor_signup", [
  check('firstName').isLength({ min: 1 }).withMessage('yout first name must be a first name'),
  check('lastName').isLength({ min: 1 }).withMessage('your last name must be a last name'),
  check('businessName').isLength({ min: 1 }).withMessage('your email must be an email'),
  check('username').isLength({ min: 1 }).withMessage('password must be at least 5 chars long'),
  check('phoneNumber').isLength({ min: 1 }).withMessage('your last name must be a last name'),
  check('street').isLength({ min: 1 }).withMessage('your email must be an email'),
  check('streetNumber').isLength({ min: 1 }).withMessage('your email must be an email'),
  check('city').isLength({ min: 1 }).withMessage('passw must be at least 5 chars long'),
  check('state').isLength({ min: 1 }).withMessage('password must be at least 5 chars long'),
  check('Country').isLength({ min: 1 }).withMessage('your email must be an email'),
  check('password').isLength({ min: 1 }).withMessage('password must be at least 5 chars long'),
], function (req, res, next) {
  console.log('hereeee');
  var errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    var errorsarray = errors.errors;
    var errorsmsg = errorsarray.map(a => a.msg);
    req.flash('errors', errorsmsg);
    return res.redirect('/distributor_signup')
  }
  next();
},
  passport.authenticate('local-sellerSignup', {
    successRedirect: '/seller',
    failureRedirect: '/distributor_signup',
    failureFlash: true
  })
);
//Result { formatter: [Function: formatter], errors: [] }
router.get('/profile', isLoggedIn, function (req, res) {
  connection.query('SELECT transaction_Item.*,stock.* FROM transaction_Item JOIN stock ON transaction_Item.stock_id = stock.id WHERE transaction_Item.paid = "ye" AND transaction_Item.shipped = "ye" AND transaction_Item.stock_seller_id=?'
    , [req.user[0].id],
    function (err, rows) {
      if (err)
        throw err
      var string = JSON.stringify(rows);
      var results = JSON.parse(string);
      console.log("88888", results);

      res.render('profile.hbs', {
        style: 'profile.css',
        Items: results,
      });
    });
});

router.get('/session', function (req, res) {
  if (req.user)
    res.json(req.user)
  if (!req.user)
    res.json(null)
});


router.get('/logout', function (req, res) {
  req.logout();
  console.log("df")
  req.session.cart = null;
  var token =
    res.json(token)
});

router.get("/distributor_signup", function (req, res, next) {
  var messages = req.flash('errors');
  var messages2 = req.flash('errors2');
  console.log(messages2)
  messages.push(messages2);
  res.render("distributor_signup", {
    style: 'distributor_signup.css',
    messages: messages,
    hasErrors: messages.length > 0,
    title: '',
  });
});

router.get('/addcart/:id', function (req, res, next) {
  var id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  //for now
  //var productName= req.session.cart.items[req.params.id].item[0].stock_type;
  console.log("your doing great", cart.items);
  //item object is empty
  if (Object.keys(cart.items).length === 0) {
    connection.query("SELECT * FROM stock WHERE id = ? ", [id],
      function (err, rows) {
        if (err) {
          throw err
        }
        else
          console.log('rows', rows);
        var string = JSON.stringify(rows);
        var results = JSON.parse(string);
        console.log(req.session.cart);
        console.log('this is our rows', results[0].id);
        cart.add(results, results[0].id);
        console.log(cart);
        req.session.cart = cart;
        res.redirect("/")
      });
  }
  else if (cart.items[req.params.id] == null) {
    console.log("wtf", cart.items);
    connection.query("SELECT * FROM stock WHERE id = ? ", [id],
      function (err, rows) {
        if (err) {
          throw err
        }
        else
          var string = JSON.stringify(rows);
        var results = JSON.parse(string);
        console.log(req.session.cart);
        console.log('this is our rows', results[0].id);
        cart.add(results, results[0].id);
        console.log(cart);
        req.session.cart = cart;
        res.redirect('/products/truffle');
      });
  }
  else if (id == req.session.cart.items[req.params.id].item[0].id) {
    console.log("CANT BUY THE SAME")
    errors = "try to not buy the same item"
    req.flash('errors', errors);
    console.log('sdf')
    res.redirect('/products/truffle')
    console.log("dude");
  }
  else {
    connection.query("SELECT * FROM stock WHERE id = ? ", [id],
      function (err, rows) {
        if (err) {
          throw err
        }
        else
          var string = JSON.stringify(rows);
        var results = JSON.parse(string);
        console.log(req.session.cart);
        console.log('this is our rows', results[0].id);
        cart.add(results, results[0].id);
        console.log(cart);
        req.session.cart = cart;
        res.redirect('/products/truffle');
      });

  }
});

router.get('/reduce/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log(productId);
  req.session.cart = cart;
  cart.reduceByOne(productId);
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', isCustomer, function (req, res, next) {
  console.log(req.session.cart);
  var cart = new Cart(req.session.cart);
  //because cartgenerateArray returns =[]
  if (!req.session.cart || cart.totalQty === 0) {
    return res.json({
      products: null,
    })
  };
  res.json({
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});








router.get('/checkout', isLoggedIn, function (req, res, next) {
  var stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
  console.log(req.user);
  res.json({
    stripePublicKey: stripePublicKey
  });
});

router.post('/checkout', isLoggedIn, async (req, res, next) => {
  if (!req.session.cart) {
    return res.redirect('/shopping-cart');
  }

  //payment
  var cart = new Cart(req.session.cart);
  console.log("price in cart", cart.totalPrice * 100)
  const stripe = require('stripe')('sk_test_8NkaaWBV0Uyhy84hka8O2fFt007xFkVErG');
  const token = req.body.stripeToken;
  console.log("gothereee!");
  (async () => {
    const charge = await stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    });
  })().catch(function (error) {
    console.log(error);
  })
  //set stock  to sold
  function change() {
    for (let [_, obj] of Object.entries(req.session.cart.items)) {
      const item = obj.item[0];
      var insertQuery = "UPDATE stock SET  ?  WHERE id= ? ";
      connection.query(insertQuery, [{ active: 'no' }, item.id],
        function (err, rows) {
          if (err)
            throw err;
        });
    }
  }
  //inserting weight into it
  //inserting everthing in costumer(REMEMBER TO CHANGE THE FKIN NAME)
  var requser = req.user[0].id
  var newMysqlUserInfo = {
    name: req.body.name,
    streetNumber: req.body.streetNumber,
    street: req.body.address,
    postCode: req.body.postCode,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  }
  var insertQuery = "UPDATE customer SET  ?, ?, ?, ?, ?, ?, ? WHERE id = ?";
  connection.query(insertQuery, [{ first_name: newMysqlUserInfo.name }, { country: newMysqlUserInfo.country }, { state: newMysqlUserInfo.state }, { city: newMysqlUserInfo.city }, { street_number: newMysqlUserInfo.streetNumber }, { street: newMysqlUserInfo.street }, { post_code: newMysqlUserInfo.postCode }, requser],
    function (err, rows) {
      if (err)
        throw err;
      else
        console.log("done");
    });
  //marking the stocks as inactive
  connection.query(insertQuery, [{ first_name: newMysqlUserInfo.name }, { country: newMysqlUserInfo.country }, { state: newMysqlUserInfo.state }, { city: newMysqlUserInfo.city }, { street_number: newMysqlUserInfo.streetNumber }, { street: newMysqlUserInfo.street }, { post_code: newMysqlUserInfo.postCode }, requser],
    function (err, rows) {
      if (err)
        throw err;
      else
        console.log("done");
    });

  /**
    * Gets cart and converts it to object 
    * where keys are seller id 
    * and values are {items: [], totalPrice}
    * 
    * @param {Object} cart Object that holds items array
    * @returns {Object}
    */
  function getSellerTransactionsFromCart(cart) {
    const { items } = cart; // [{selller_id:1001,}, {seller_id:1002}, {seller_id:1001}]
    const itemsBySeller = {};
    Object.values(items).forEach(cartItem => {
      const item = cartItem.item[0];
      if (!itemsBySeller[item.seller_id]) {
        itemsBySeller[item.seller_id] = {
          items: [],
          totalPrice: 0
        };
      }
      itemsBySeller[item.seller_id].items.push(item);
      itemsBySeller[item.seller_id].totalPrice += item.price;
    });
    return itemsBySeller;
  }

  /**
   * Creates transaction and returns id of transaction
   * 
   * @param {integer} customerId 
   * @param {integer} sellerId 
   * @param {Object} transaction 
   * @return {Promise<integer>} id of transaction
   */
  function createTransaction(customerId, sellerId, transaction) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO transaction " +
        "(price, time, customer_id, seller_id) " +
        "VALUES " +
        "(?, ?, ?, ?)",
        [transaction.totalPrice, new Date().toISOString(), customerId, sellerId],
        (error, result) => {
          if (error) return reject(error);
          resolve(result.insertId);
        })
    })
  }

  /**
   * Inserts transaction item
   * 
   * @param {integer} transactionId 
   * @param {Object} item 
   * @returns {Promise<void>}
   */
  function insertTransactionItem(transactionId, item) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO transaction_Item " +
        "(stock_id, stock_seller_id, weight, transaction_id, paid, shipped) " +
        "VALUES " +
        "(?, ?, ?, ?, 'ye', 'no')",
        [item.id, item.seller_id, item.weight, transactionId],
        (error) => {
          if (error) return reject(error);
          resolve();
        });
    });
  };


  /**
   * Inserts items that provided in transaction
   *  
   * @param {integer} transactionId 
   * @param {Object[]} items 
   * @returns {Promise<void>}
   */
  function insertTransactionItems(transactionId, items) {
    return Promise.all(
      items.map(item => insertTransactionItem(transactionId, item))
    );
  }

  function insertTotalTransaction(customerId, cart) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO total_transaction " +
        "(price, time, coupon, completed,customer_id) " +
        "VALUES " +
        "(?, ?, 'no', 'no', ?)",
        [cart.totalPrice, new Date().toISOString(), customerId],
        (error) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  /**
   * Commits customer's shopping card
   * 
   * @param {integer} customerId 
   * @param {Object} cart 
   * @returns {Promise<void>}
   */
  async function insertCustomerCart(customerId, cart) {
    const sellerTransactions = getSellerTransactionsFromCart(cart);
    console.log(sellerTransactions);
    console.log(req.user);
    for (const sellerId in sellerTransactions) {
      const transactionId
        = await createTransaction(customerId, sellerId, sellerTransactions[sellerId]);
      await insertTransactionItems(transactionId, sellerTransactions[sellerId].items);
    }
    await insertTotalTransaction(customerId, cart);
  };

  function beginTransaction() {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((error) => {
        if (error) return reject(error);
        resolve();
      })
    });
  }

  function commitTransaction() {
    return new Promise((resolve, reject) => {
      connection.commit((error) => {
        if (error) return reject(error);
        resolve();
      })
    });
  }

  function rollbackTransaction() {
    return new Promise((resolve, reject) => {
      connection.rollback((error) => {
        if (error) return reject(error);
        resolve();
      })
    });
  }

  try {
    await beginTransaction();
    await insertCustomerCart(req.user[0].id, req.session.cart);
    await commitTransaction();
    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');
  }
  catch (error) {
    await rollbackTransaction();
    console.log(error);
    res.redirect('/cart');
    return;
  }

});


module.exports = router;
//end login

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};
function isCustomer(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user[0].type == "customer") {
      return next();
    }
    else {
      req.flash('user', 'You must be a customer to access this function');
      res.redirect('/')
    }
  }
  else {
    res.redirect('/');
  }
}