'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema({
    
    name: String,
    address: String,
    items: Number
});

module.exports = mongoose.model('Order', OrderSchema); 
