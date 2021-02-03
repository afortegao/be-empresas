const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {dbConnection}=require('./database/config');
//para ver todos los procesos que estan corriendo
// console.log(process.env);

//crear servidor
const app = express();

//database
dbConnection();

//directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

//lectura parseo de body
app.use(express.json());

//rutas
app.use(require('./routes/index'));


// escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('Servidor en puerto ' + process.env.PORT);
});
