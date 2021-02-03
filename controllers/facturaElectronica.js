const { response } = require('express');
const fetch = require('node-fetch');
const { enviarConsulta } = require('../helpers/consultarApi')
const Empresa = require('../models/empresa');


const url_seguridad = process.env.URL_SEGURIDAD;
const url_configuracion = process.env.URL_CONFIGURACION;


const facturaElectronica = async (req, res = response) => {
    const empresa_id = req.params.id;

    try {

        return res.json({
            ok: true,
            msg: 'factura eletronica registrada'

        })
    } catch (error) {
        console.log('Error al actualizar factura electronica ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const actualizarFacturaElectronica = async (req, res = response) => {
    const empresa_id = req.params.id;

    try {

        return res.json({
            ok: true,
            msg: 'factura eletronica registrada'

        })
    } catch (error) {
        console.log('Error al actualizar factura electronica ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}


module.exports = {
    facturaElectronica,
    actualizarFacturaElectronica
    
}