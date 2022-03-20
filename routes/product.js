'use strict'

var express = require('express');
var productController = require('../controllers/product');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/products'});

// guardamos en la variable api el router de express
var api = express.Router();

// configuramos la ruta poniendo: el método como extensión de api, como primer param la ruta y como segundo la variable del controlador y como método el nombre de la función del controlador
api.get('/product/:id', productController.getProduct);
api.post('/product', productController.saveProduct);
api.get('/products/:page?', productController.getProducts);
api.put('/product/:id', productController.updateProduct);
api.delete('/product/:id', productController.deleteProduct);
api.post('/upload-image-product/:id', md_upload, productController.uploadImageProduct);
api.get('/get-image-product/:imageFile', productController.getImageFile);

module.exports = api;
