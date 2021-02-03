const { response } = require('express');
const ObjectId = require('mongoose').Types.ObjectId;

const Empresa = require('../models/empresa');

const validarEmpresa = async (req, res = response, next) => {
    const empresa_id = req.header('x-empresa');

    try {
        if (!empresa_id) {
            return res.status(400).json({
                ok: false,
                msg: 'La empresa es requerida'
            });
        }

        if (!ObjectId.isValid(empresa_id)) {
            return res.status(400).json({
                ok: false,
                msg: 'La empresa no es válida'
            });
        }

        const empresa = await Empresa.findById(empresa_id);
     
        if (!empresa) {
            return res.status(400).json({
                ok: false,
                msg: empresa.msg
            });
        }
        req.empresa = empresa;
    
    } catch (error) {
        console.log('Error al validar empresa ', error);
        return res.status(400).json({
            ok: false,
            msg: 'Favor contacte al administrador ' + error
        });
    }

    next();

}

module.exports = {
    validarEmpresa
}