'use stritc'

var path = require('path');                  //para trabajar con el sistema de ficheros
var fs = require('fs');                      //para trabajar con el sistema de ficheros
const { send } = require('express/lib/response');
var mongoosePaginate = require('mongoose-pagination');   //u28 requerimos el modulo de paginacion de mongoose

var  Order= require('../models/order');   ///los diferentes modelos de nuestra API
var Product = require('../models/product');

function saveOrder(req, res){      //U18  nuevo metodo 'saveUser', para registro de usuario
    var order = new Order();        //generamos una instancia del modelo de usuario, ya podemos volvarle un valor a cada propiedad    
    var params = req.body;        // primero recogemos los parametros que recibimos por la peticion por POST
    
    console.log(params);

    order.name = params.name;                          //vaso a asignar un valor a cada una de las propiedas del objeto user
    order.address = params.address;
    order.items = params.items;

    //despues guardar los datos en base de datos con el metodo save de mongoose

    if(order.name != null && order.address != null && order.items != null){ //agregar null de cantidad de productos?, si no seleccione nada, no puedo enviar la orden
        //guardar el susuario
        order.save((err, orderStored) => {
            if(err){
                res.status(500).send({message: 'Error al guardar la orden'});                    
            }else{
                if(!orderStored){
                    res.status(404).send({message: 'No se ha guardado la orden'});
                }else{
                    res.status(200).send({user: orderStored});
                }
            }
        });
    }else{
        res.status(404).send({message: 'rellena todos los campos'});
    }
}



function getOrder(req, res){                 // metodo que nos va a permitir sacar un artista de la base de datos
    var orderId = req.params.id;              //el aprametro de ID lo podemos chequear en artist.js routes, /artist/:id

    Order.findById(orderId, (err, order) => {
        if(err){
            res.status(200).send({message: 'Error en la peticion'});            
        }else{
            if(!order){
                res.status(404).send({message: 'La ordern no existe'});
            }else{
                res.status(200).send({order});
            }
        }
    });        
}

function deleteOrder(req, res){
    var orderId = req.params.id;
    Order.findByIdAndRemove(orderId,  (err, orderRemoved) => {
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if(!orderRemoved){
                res.status(404).send({message: 'No se ha eliminado la orden'});
            }else{
                res.status(200).send({order: orderRemoved});
            }     
        }

    });
}

module.exports = {   
    saveOrder,
    getOrder,
    deleteOrder,   

};// prueba