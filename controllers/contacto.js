const { response } = require('express');
const fetch = require('node-fetch');
const { enviarConsulta } = require('../helpers/consultarApi')
const Empresa = require('../models/empresa');


const url_seguridad = process.env.URL_SEGURIDAD;
const url_configuracion = process.env.URL_CONFIGURACION;

const agregarContacto = async (req, res = response) => {
    const id = req.params.id;

    try {
        return res.status(201).json({
            ok: true,
            msg: 'contacto creado '
        });
    } catch (error) {
        console.log('Error al agregar contacto ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const actualizarContacto = async (req, res = response) => {
    const id = req.params.id;

    try {
        return res.status(201).json({
            ok: true,
            msg: 'Contacto actualizado'
        });
    } catch (error) {
        console.log('Error al actualizar contacto ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}
const eliminarContacto = async (req, res = response) => {
    const id = req.params.id;

    try {
        return res.status(201).json({
            ok: true,
            msg: 'Contacto eliminado'
        });
    } catch (error) {
        console.log('Error al eliminar contacto ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

module.exports = {
    agregarContacto,
    actualizarContacto,
    eliminarContacto
}