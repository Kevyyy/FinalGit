var express = require('express');
var router = express.Router()
var mysql = require('mysql');
var dbconfig = require('../config/models/database_config');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

router.get('/truffle', function (req, res, next) {
    var messages = req.flash('errors');
    connection.query("SELECT * FROM stock WHERE type = ? AND active = 'active'", ["summer_truffle"],
        function (err, rows) {
            if (err)
                throw err
            else
                var string = JSON.stringify(rows);
            var results = JSON.parse(string);
            console.log(results)
            setValue(results);
        });
    var products = []
    function setValue(results) {
        products = results;
        res.render('summer_truffle', {
            style: 'summer_truffle.css',
            messages: messages,
            hasErrors: messages.length > 0,
            product: products,
        });
    }
});
router.get('/:name', function (req, res) {
    var productName = req.params.name;
    console.log(productName);
    connection.query("SELECT * FROM products WHERE name = ?", [productName],
        function (err, rows) {
            if (err)
                throw err
            else
                var string = JSON.stringify(rows);
            var results1 = JSON.parse(string);
            console.log(results1)
            connection.query("SELECT * FROM stock WHERE type = ? AND active = 'active'", [productName],
                function (err, rows) {
                    if (err)
                        throw err
                    else
                        var string = JSON.stringify(rows);
                    var results2 = JSON.parse(string);
                    console.log(results2)
                    setValue(results1, results2);
                });


        })
    function setValue(a, b) {
        res.json({
            productInfo: a,
            productsStock: b
        });
    }
})
/*var products = []
function setValue(results) {
    products = results;
    res.render('summer_truffle', {
        style: 'summer_truffle.css',
        messages: messages,
        hasErrors:messages.length > 0,
        product: products,
    });
}
  })*/

module.exports = router;