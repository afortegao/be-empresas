const { response } = require('express');
const ObjectId = require('mongoose').Types.ObjectId;

const Empresa = require('../models/empresa');

const validarAgencia = async (req, res = response, next) => {
    const empresa =req.empresa;
    const agencia_id = req.header('x-agencia');

    try {
        if (!agencia_id) {
            return res.status(400).json({
                ok: false,
                msg: 'La agencia es requerida'
            });
        }

        if (!ObjectId.isValid(agencia_id)) {
            return res.status(400).json({
                ok: false,
                msg: 'La agencia no es válida'
            });
        }
       
        const agencia = empresa.agencias.id(agencia_id);
       
        if (!agencia) {
            return res.status(400).json({
                ok: false,
                msg: agencia.msg
            });
        }
        req.agencia = agencia;



    } catch (error) {
        console.log('Error al validar agencia', error);
        return res.status(400).json({
            ok: false,
            msg: 'Favor contacte al administrador ' + error
        });
    }

    next();

}

module.exports = {
    validarAgencia
}