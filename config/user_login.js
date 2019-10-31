var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./models/database_config.js');
//var dbconfig = require('./models/database_config_server.js');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    console.log('-----', user.id)
    done(null, { id: user.id, type: user.type });
  });


  passport.deserializeUser(function (user, done) {
    switch (user.type) {
      case 'customer':
        connection.query("SELECT * FROM customer WHERE id = ? ", [user.id],
          function (err, rows) {
            var string = JSON.stringify(rows);
            var results = JSON.parse(string);
            console.log("rows", results)
            done(err, results);
          });
        break;
      case 'seller':
        console.log("passseller", user);
        connection.query('SELECT * from seller where id = ?', [user.id],
          function (err, rows) {
            var string = JSON.stringify(rows);
            var results = JSON.parse(string);
            console.log("wwfe", results)
            done(err, results);
          });
        break;
      default:
        done(new Error('no entity type:', user.type), null);
        break;
    }
  });
  passport.use(
    'local-signup',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
      function (req, username, password, done) {
        connection.query("SELECT * FROM customer WHERE username = ? ",
          [username], function (err, rows) {
            if (err)
              return done(err);
            if (rows.length) {
              return done(null, false, req.flash('error2', 'That is already taken'));
            } else {
              console.log(req.body)
              var newCustomerMysql = {
                username: username,
                password: bcrypt.hashSync(password, null, null),
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                type: 'customer'
              };
              console.log(rows);
              var insertQuery = "INSERT INTO customer (username, password, first_name, last_name, type) values (?, ?, ?, ?,?)";
              connection.query(insertQuery, [newCustomerMysql.username, newCustomerMysql.password, newCustomerMysql.firstName, newCustomerMysql.lastName, newCustomerMysql.type],
                function (err, rows) {
                  if (err)
                    throw err;
                  newCustomerMysql.id = rows.insertId;
                  console.log(newCustomerMysql.id);
                  return done(null, newCustomerMysql);
                });
            }
          });
      })
  );
  //seller signup
  passport.use(
    'local-sellerSignup',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
      function (req, username, password, done) {
        console.log('hereee')
        connection.query("SELECT * FROM seller WHERE username = ? ",
          [username], function (err, rows) {
            if (err)
              return done(err);
            if (rows.length) {
              return done(null, false, req.flash('error2', 'That is already taken'));
            } else {
              var newSellerMysql = {
                username: username,
                password: bcrypt.hashSync(password, null, null),
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                businessName: req.body.businessName,
                businessEmail: req.body.username,
                phoneNumber: req.body.phoneNumber,
                street: req.body.street,
                streetNumber: req.body.streetNumber,
                city: req.body.city,
                state: req.body.state,
                postCode: req.body.postCode,
                country: req.body.Country,
                type: 'seller'
              };
              var insertQuery = "INSERT INTO seller (username, password, first_name, last_name,compagny_name,phone_number,street,street_number,city,state,post_code,country,type) values (?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?,?,?)";
              connection.query(insertQuery, [newSellerMysql.username, newSellerMysql.password, newSellerMysql.firstName, newSellerMysql.lastName, newSellerMysql.businessName, newSellerMysql.phoneNumber, newSellerMysql.street, newSellerMysql.streetNumber, newSellerMysql.city, newSellerMysql.state, newSellerMysql.postCode, newSellerMysql.country, newSellerMysql.type],
                function (err, rows) {
                  if (err)
                    throw err;
                  connection.query("INSERT INTO seller_Profile (seller_id) values (?)", [rows.insertId],
                    function (err) {
                      if (err)
                        throw err
                      newSellerMysql.id = rows.insertId;
                      return done(null, newSellerMysql);
                    });

                });
            }
          });
      })
  );

  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
      function (req, username, password, done) {
        console.log("username", username)
        connection.query("SELECT * FROM customer WHERE username = ? ", [username],
          function (err, rows) {
            if (err)
              return done(err);
            if (!rows.length) {
              return done(null, false, req.flash('loginMessage', 'No User Found'));
            }
            if (!bcrypt.compareSync(password, rows[0].password))
              return done(null, false, req.flash('loginMessage', 'Wrong Password'));
            var string = JSON.stringify(rows);
            var results = JSON.parse(string);
            console.log("adada", results);
            return done(null, results[0]);
          });
      })
  );

  passport.use(
    'local-seller-login',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
      function (req, username, password, done) {
        connection.query("SELECT * FROM seller WHERE username = ? ", [username],
          function (err, rows) {
            if (err)
              return done(err);
            if (!rows.length) {
              return done(null, false, req.flash('loginMessage', 'No User Found'));
            }
            if (!bcrypt.compareSync(password, rows[0].password))
              return done(null, false, req.flash('loginMessage', 'Wrong Password'));
            var string = JSON.stringify(rows);
            var results = JSON.parse(string);
            console.log('_______', results[0]);
            return done(null, results[0]);
          });
      })
  );
};



