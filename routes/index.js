const express = require('express');

//crear servidor
const app = express();

app.use('/api/empresa', require('../routes/empresa'));
app.use('/api/agencia', require('../routes/agencia'));
app.use('/api/consecutivo', require('../routes/consecutivo'));
app.use('/api/contacto', require('../routes/contacto'));
app.use('/api/facturaElectronica', require('../routes/facturaElectronica'));


module.exports = app;