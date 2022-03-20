'use strict'

var express = require('express');           
var bodyParser = require('body-parser');

var app = express();

//cargaremos las rutas
var product_routes = require('./routes/product');
var order_routes = require('./routes/order');
//configuramos el body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar las cabeceras al final
// configurar las rutas bases
app.use('/api', product_routes);
app.use('/api', order_routes);

module.exports = app;