var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userId:{type: String, required: true},
    message: {type: String, required: true},
    time: {type: String, required: true},
    room: {type: String, required: true},
    type:{type: String, required: true},
});

module.exports = mongoose.model('Messages', schema);