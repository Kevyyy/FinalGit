const express = require('express');
const router = express.Router()
const mysql = require('mysql');
const dbconfig = require('../config/models/database_config');
const connection = mysql.createConnection(dbconfig.connection, ({ multipleStatements: true }));
connection.query('USE ' + dbconfig.database);
const shippo = require('shippo')('shippo_test_a34c883bfa8c4679d25e33a37a11b84391ce4e69');
const open = require('open');
var passport = require('passport');
var multer = require('multer');
const path = require('path');
const storage1 = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const storage2 = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Init Upload
const uploadProfile = multer({
    storage: storage1,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');
// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
router.post('/saveMulter', (req, res) => {
    console.log('gangnagnagnagnanagnang')
    uploadProfile(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err instanceof multer.MulterError);
        } else if (err) {
            console.log(err);
        }
        console.log('body.file', req.body)
        const file = req.files.file
        connection.query('UPDATE seller_Profile SET avatar_Path = ? WHERE seller_id = ?', [file.path, req.user[0].id],
            function (err, rows) {
                if (err)
                    throw err;
                else console.log(rows)
                res.redirect('10')
            });
    })
})
router.post('/profile/avatar', (req, res) => {
    console.log(req.user[0].id)
    var img = req.body.imgBit64
    console.log(img)
    connection.query('UPDATE seller_profile SET avatar =? WHERE seller_id = ?', [img, req.user[0].id],
        function (err, rows) {
            if (err)
                throw err
                console.log(rows)
        })
})
router.get('/presentation/:id', (req, res) => {
    sellerId = req.params.id
    connection.query('SELECT seller.*,seller_Profile.* FROM seller JOIN seller_Profile ON seller.id =  seller_Profile.seller_id WHERE seller.id =?', [sellerId],
        function (err, rows) {
            console.log("dude")
            if (err)
                throw err
            var string = JSON.stringify(rows)
            var sellerdata = JSON.parse(string);
            res.json(sellerdata)
        })
})

router.get('/configureProfile'), function (req, res, send) {
    res.render('ConfigureProfile', {
        title: 'ConfigureProfile',
        style: 'configure.css'
    });
}
router.post('/profile/setBanner', (req, res) => {
    uploadProfile(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log(err instanceof multer.MulterError);
        } else if (err) {
            console.log(err);
        }
        console.log(req.file)
        connection.query('')
        res.send('test')
    })
})


router.get('/t', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

router.get('/profile/11', function (req, res, next) {
    var sellerId = 11;
    /***
     * fetch the seller data and seller Profile Data from the database
     *  @returns {Promise<void>}
     * 
     */
    function fetchSellerData() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT seller.*,seller_Profile.* FROM seller JOIN seller_Profile ON seller.id =  seller_Profile.seller_id WHERE seller.id =?', [sellerId],
                function (error, rows) {
                    if (error) return reject(error);

                    var string = JSON.stringify(rows)
                    var sellerdata = JSON.parse(string);
                    console.log("whaaaat", sellerdata);
                    resolve(sellerdata);
                })
        });
    }
    /**
     * fetch the stocks the seller is about to sell
     * @returns {Promise<void>}
     *  
     * */
    function fetchSellerStock() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM stock WHERE active = 'active' AND seller_id = ? ", [sellerId],
                function (err, rows) {
                    var string = JSON.stringify(rows)
                    var sellerActiveStock = JSON.parse(string);
                    resolve(sellerActiveStock);
                });
        })
    };

    /**
     * fetch the sold stock and some reviews
     * @returns {Promise<void>}
     */
    function fetchsoldstock() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM transaction_Item WHERE completed='ye' AND  stock_seller_id = ? ", [sellerId],
                function (err, rows) {
                    console.log("dudeee", rows);
                    var string = JSON.stringify(rows)
                    var sellerSoldStock = JSON.parse(string);
                    resolve(sellerSoldStock)
                })
        });
    }


    /***
     * generate a room number for the socket.IO client
     * @returns {Promise<string>} roomId of the seller
     */
    function generateRoomNumber() {
        return new Promise((resolve, reject) => {
            var user = req.user[0].id;
            var seller = (sellerdata[0].id);
            var roomName = "user" + user + "seller" + seller
            resolve(roomName)
        });
    }
    /**
     * testing to render a function
     * 
     * 
     */
    async function renderSellerProfile(sellerId) {
        sellerData= await fetchSellerData()
        activeStock=fetchSellerStock() 
        soldStock=fetchsoldstock()
        roomNumber=generateRoomNumber()
        console.log(sellerData,roomNumber)
        
      };
      //start function
      renderSellerProfile()

});


router.get('/ship/:id', isSeller, function (req, res, next) {
    var transaction_Id = req.params.id;
    connection.query('SELECT transaction.*,customer.* FROM transaction JOIN customer ON transaction.customer_id =  customer.id WHERE transaction.id =? ', [transaction_Id],
        function (err, rows) {
            if (err)
                throw err
            var string = JSON.stringify(rows);
            var data = JSON.parse(string);
            getWeight(data)
        });

    function getWeight(Data) {
        console.log("transactionId", transaction_Id)
        connection.query('SELECT * FROM transaction_Item WHERE stock_seller_id = ? AND transaction_id =?', [req.user[0].id, transaction_Id],
            function (err, rows) {
                let inserted = 0;
                if (err)
                    throw err
                var string = JSON.stringify(rows);
                var results = JSON.parse(string);
                for (let [_, obj] of Object.entries(results)) {
                    const item = obj;
                    //console.log("item", item)
                    var heaviness = (heaviness || 0) + item.weight;
                    inserted++;
                    if (inserted === Object.keys(results).length) {
                        console.log("inserted:", inserted);
                        console.log("results.lenght:", Object.keys(results).length)
                        var newShipping = {
                            fromStreet: req.user[0].street_number.concat(" ", req.user[0].street),
                            fromCity: req.user[0].city,
                            fromState: req.user[0].state,
                            fromZip: req.user[0].post_code,
                            fromCountry: req.user[0].country,
                            fromCompany: req.user[0].compagny_name,
                            fromPhone: null,

                            toStreet: Data[0].street_number.concat(" ", Data[0].street),
                            toCity: Data[0].city,
                            toState: Data[0].state,
                            toZip: Data[0].post_code,
                            toCountry: Data[0].country,
                            toCompany: null,
                            toPhone: null,

                            parcelWeight: heaviness,
                            parcelHeight: 20,
                            parcelWidth: 20,
                            parcelLenght: 20,

                        }

                        var addressFrom = {
                            "name": "joe",
                            "street1": newShipping.fromStreet,
                            "city": newShipping.fromCity,
                            "state": newShipping.fromState,
                            "zip": newShipping.fromZip,
                            "country": newShipping.fromCountry,
                            "phone":"514-717-5188"
                        };

                        var addressTo = {
                            "name":"sam",
                            "street1": newShipping.toStreet,
                            "city": newShipping.toCity,
                            "state": newShipping.toState,
                            "zip": newShipping.toZip,
                            "country": newShipping.toCountry,
                            "phone":"514-717-5188"
                        };
                        var parcel = {
                            "length": 0.2,
                            "width": 0.2,
                            "height": 0.2,
                            "distance_unit": "m",
                            "weight": 0.3,
                            "mass_unit": "kg",
                        };
                        shippo.customsdeclaration.create({
                            "contents_type": "MERCHANDISE",
                            "contents_explanation": "T-Shirt purchase",
                            "non_delivery_option": "RETURN",
                            "certify": true,
                            "certify_signer": "Simon Kreuz",
                            "items": [parcel],
                        }, function (err, customsDeclaration) {
                            shippo.shipment.create({
                                "address_from": addressFrom,
                                "address_to": addressTo,
                                "customs_declaration": customsDeclaration,
                                "parcels": [parcel],
                                "async": false
                            }, function (err, shipment) {
                                var rate = shipment.rates[0];
                                //find the lowest rates
                                console.log(shipment.rates)
                                // Purchase the desired rate.
                                shippo.transaction.create({
                                    "rate": rate.object_id,
                                    "label_file_type": "PDF",
                                    "async": false
                                }, function (err, transaction) {
                                    connection.query('UPDATE transaction SET label_path = ?, state = ? WHERE id=? AND seller_id = ?',[transaction.label_url,"labelCreated",transaction_Id,req.user[0].id])
                                    console.log("label", transaction.label_url)
                                });
                            });
    
                        });
                       
                    };
                }

            })
    }
}
)




router.get('/',/*isSeller*/ function (req, res, next) {
    //input unsold stock
    console.log(req.user)
    connection.query("SELECT * FROM stock WHERE active = 'active' AND seller_id = ? ", [req.user[0].id],
        function (err, rows) {
            if (err)
                throw err
            else
                var string = JSON.stringify(rows);
            var results1 = JSON.parse(string);
            //console.log("hurray", results1)
            //select the stock which has been bought from the current seller
            connection.query('SELECT stock.*,transaction_Item.* FROM transaction_Item JOIN stock ON transaction_Item.stock_id =  stock.id WHERE transaction_Item.paid = "ye" AND transaction_Item.shipped = "no" AND stock.seller_id=?'
                , [req.user[0].id],
                function (err, rows) {
                    if (err)
                        throw err
                    else
                        var string = JSON.stringify(rows);
                    var results2 = JSON.parse(string);
                    //console.log("results2", results2)
                    var countList = results2.reduce(function (p, c) {
                        p[c.transaction_id] = (p[c.transaction_id] || 0) + 1;
                        return p;
                    }, {});

                    var results3 = results2.filter(function (obj) {
                        return countList[obj.transaction_id] > 1;
                    });

                    var results4 = results2.filter(function (obj) {
                        return countList[obj.transaction_id] == 1;
                    });
                    //console.log("results3", results3);
                    //console.log("results4", results4);
                    function groupBy(collection, property) {
                        var i = 0, val, index,
                            values = [], result = [];
                        for (; i < collection.length; i++) {
                            val = collection[i][property];
                            index = values.indexOf(val);
                            if (index > -1)
                                result[index].push(collection[i]);
                            else {
                                values.push(val);
                                result.push([collection[i]]);
                            }
                        }
                        return result;
                    }
                    var results5 = groupBy(results3, "transaction_id");

                    //setting shipped items
                    connection.query('SELECT stock.*,transaction_Item.* FROM transaction_Item JOIN stock ON transaction_Item.stock_id = stock.id WHERE transaction_Item.paid = "ye" AND transaction_Item.shipped = "ye" AND stock.seller_id=?'
                        , [req.user[0].id],
                        function (err, rows) {
                            if (err)
                                throw err
                            else
                                console.log("66666", rows);
                            var string = JSON.stringify(rows);
                            var results6 = JSON.parse(string);

                            var countList = results6.reduce(function (p, c) {
                                p[c.transaction_id] = (p[c.transaction_id] || 0) + 1;
                                return p;
                            }, {});

                            var results7 = results6.filter(function (obj) {
                                return countList[obj.transaction_id] > 1;
                            });

                            var results8 = results6.filter(function (obj) {
                                return countList[obj.transaction_id] == 1;
                            });
                            // console.log("results7", results7);

                            function groupBy(collection, property) {
                                var i = 0, val, index,
                                    values = [], result = [];
                                for (; i < collection.length; i++) {
                                    val = collection[i][property];
                                    index = values.indexOf(val);
                                    if (index > -1)
                                        result[index].push(collection[i]);
                                    else {
                                        values.push(val);
                                        result.push([collection[i]]);
                                    }
                                }
                                return result;
                            }

                            var results9 = groupBy(results7, "transaction_id");
                            console.log("hopefully it works9", results9);
                            setValue(results1, results4, results5, results8, results9);
                        });

                });

            function setValue(results1, results4, results5, results8, results9) {
                products = results1;
                singleOrders = results4;
                multipleOrders = results5;
                shippedsingleOrders = results8;
                shippedmultipleOrders = results9;
                var data = {
                    products: products,
                    singleOrders: singleOrders,
                    multipleOrders: multipleOrders,
                    multipleOrders: multipleOrders,
                    shippedsingleOrders: shippedsingleOrders,
                    shippedmultipleOrders: shippedmultipleOrders
                };
                res.json(data)
                /*res.render('seller', {
                    style: 'seller.css',
                    product: products,
                    singleOrder: singleOrders,
                    multipleOrder: multipleOrders,
                    shippedsingleOrder:shippedsingleOrders,
                    shippedmultipleOrder:shippedmultipleOrders
                });*/

            }
        });
})
router.post('/description', function(req,res){
    console.log('hello');
    var SellerId=req.user[0].id
    var description=req.body.description
    connection.query("UPDATE seller_Profile SET  description=? WHERE seller_id = ?", 
    [description,SellerId],
    function (err, rows) {
        if (err)
            throw err
        var string = JSON.stringify(rows)
        var sellerdata = JSON.parse(string);
    })
  })
router.post('/', isSeller, function (req, res, next) {
    var newProduct = {
        id: req.user[0].id,
        product_types: req.body.product_types,
        grade: req.body.grade,
        price: req.body.product_weight,
        weight: req.body.selling_price,
        active: "active",
    };
    console.log(newProduct.seller_id);
    var insertQuery = "INSERT INTO stock (seller_id, type, grade, price,weight, active) values (?, ?, ?, ?, ?, ?)";
    connection.query(insertQuery, [newProduct.id, newProduct.product_types, newProduct.grade, newProduct.price, newProduct.weight, newProduct.active],
        function (err, rows) {
            if (err)
                throw err;
            else console.log(rows)
        });
    res.redirect('/seller')
})
module.exports = router;

function isCustomer(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user[0].type == "Customer") {
            return next();
        }
        else {
            res.redirect('/')
        }
    }
    else {
        res.redirect('/');
    }
}
function isSeller(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user[0].type == "seller") {
            return next();
        }
        else {
            res.redirect('/')
        }
    }
    else {
        res.redirect('/');
    }
}