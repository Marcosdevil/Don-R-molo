'use strict'

var mongoose = require('mongoose');
const cors = require('cors'); 


var app = require('./app');
var port = process.env.PORT || 3977;
app.use(cors());
//mongodb://localhost:27017/RemoloDB
mongoose.connect('mongodb+srv://ivorizzo:PtFvC_5Qa_xrNWL@cluster0.ozoov.mongodb.net/dbpizzeria?retryWrites=true&w=majority', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("La conexión a la base de datos está funcionando correctamente.");

        app.listen(port, function(){
            console.log("Servidor de la API escuchando en http://localhost:"+ port);
        });
    }
});