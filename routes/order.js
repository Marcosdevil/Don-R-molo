'use strict'

var express = require('express');
var OrdersController = require('../controllers/order');
var api = express.Router();                                  //llamar al router para hacer todass las funciones , get, post , put

var multipart = require('connect-multiparty');  // u23 modulo que nos permite subir y enviar fichersos a traves de http

api.post('/order', OrdersController.saveOrder);
api.get('/order/:id', OrdersController.getOrder);
api.delete('/order/:id', OrdersController.deleteOrder);

module.exports = api;

