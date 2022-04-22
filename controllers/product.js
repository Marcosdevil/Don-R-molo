'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Product = require('../models/product');

function pruebas(req, res){
    res.status(200).send({message: 'Atlanta y Villa Crespo en mi corazón!.'});
}

function saveProduct(req, res){
    var product = new Product();

    var params = req.body;

    product.name = params.name;
    product.price = params.price;
    product.stock = params.stock;
    product.categorie = params.categorie;
    product.image = 'null';

    product.save((err, productStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el producto.'});
        }else{
            if(!productStored){
                res.status(404).send({message: 'El producto no ha sido cargado.'});
            }else{
                res.status(200).send({product: productStored});
            }
        }
    });
}

function getProduct(req, res){
    var productId = req.params.id;

    Product.findById(productId, (err, product) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!product){
                res.status(404).send({message: 'No se obtuvo el producto.'});
            }else{
                res.status(200).send({product});
                
            }     
        }
    });

}

function getProducts(req, res){
    /*try{
        const products = Product.find();

        res.json(products)
        
    } catch (error){
        console.log(error);
        res.status(500).send('hubo un error')
    }*/



    /*Product.find().sort('name'), function(err, products, total){
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!products){
                res.status(404).send({message: 'No hay productos.'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    products: products
                });
            }    
        }
    };*/

    
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    var itemsPerPage = 4;

    Product.find().sort('name').paginate(page, itemsPerPage, function(err, products, total){
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!products){
                res.status(404).send({message: 'No hay productos.'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    products: products
                });
            }    
        }
    });
}

function updateProduct(req, res){
    var productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!productUpdate){
                res.status(404).send({message: 'No se ha actualizado el producto.'});
            }else{
                res.status(200).send({product: productUpdate});
            }
        }
    });
}

function deleteProduct(req, res){
    var productId = req.params.id;
    
    Product.findByIdAndRemove(productId, (err, productDeleted) =>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el producto.'});
        }else{
            if(!productDeleted){
                res.status(404).send({message: 'El producto no se ha eliminado.'});
            }else{
                res.status(200).send({product: productDeleted});
            }
        }
    });
}

function uploadImageProduct(req, res){
    var productId = req.params.id;
    var file_name = "No subido...";

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Product.findByIdAndUpdate(productId, {image: file_name},(err, productUpdated)=>{
                if(!productUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el producto.'});
                }else{
                    res.status(200).send({product: productUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extensión del archivo no válida.'});
        }
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen.'});
    }
}


function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/proudcts'+ imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen.'});
        }
    });
}


module.exports = {
    pruebas,
    saveProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    uploadImageProduct,
    getImageFile
};