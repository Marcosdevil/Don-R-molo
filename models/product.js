'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = Schema({
    name: String,
    price: Number,
    stock: Number,
    image: String,
    categorie: String
});


module.exports = mongoose.model('Product', productSchema)