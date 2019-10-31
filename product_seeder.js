
//file that is manually run
var Product = require('./config/models/product');
('./routes/index');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true });
var url = process.env.MONGODB_URI ||'mongodb://localhost:27017/shopping';
mongoose.connect(url, {useNewUrlParser: true });

  

var products = [
new Product({
    imagePath: '/images/black_truffles.png' ,
    title: 'Summer truffles',
    description: 'great truffles',
    name: 'truffle',
    link: 'summer_truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle',
    link: 'white_truffle'
}),
new Product({
    imagePath: '/images/burgundy_truffles.png',
    title: 'Burgundy truffles',
    description: 'great truffles',
    name: 'truffle',
    link: 'burgundy_truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle',
    link: 'white_truffle'
}),
new Product({
    imagePath: '/images/burgundy_truffles.png',
    title: 'Burgundy truffles',
    description: 'great truffles',
    name: 'truffle',
    link: 'burgundy_truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/black_truffles.png' ,
    title: 'Summer truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/burgundy_truffles.png',
    title: 'Burgundy truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
}),
new Product({
    imagePath: '/images/white_truffles.png',
    title: 'White truffles',
    description: 'great truffles',
    name: 'truffle'
})
];


var done = 0;

Product.deleteMany({}, function(err,removed){
    if (err)
    throw err
    console.log(removed)
    insert()
});


function insert(){
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}}

function exit() {
    mongoose.disconnect();
}


