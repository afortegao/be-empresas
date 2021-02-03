const { response } = require('express');
const { mongo } = require('mongoose');
const fetch = require('node-fetch');
const Empresa = require('../models/empresa');

const crearAgencia = async (req, res = response) => {
    const empresa = req.empresa;
    const idAgencia = mongo.ObjectId();
    if (empresa.agenciaDefault == '000000000000000000000000') {
        empresa.agenciaDefault = idAgencia;
    }

    try {


        const agencias = empresa.agencias;
        const numeroAgencia = agencias.length + 1;
        req.body.numeroAgencia = ('000' + numeroAgencia).slice(-3);
        req.body.usuarioRegistro = req.user_id;
        req.body.monedaFacturacion = empresa.monedaDefault;
        req.body._id = idAgencia;
        req.body.consecutivos = {
            facturaElectronica: 0,
            notaCreditoElectronica: 0,
            notaDebitoElectronica: 0,
            facturaCompraElectronica: 0,
            facturaExportacionElectronica: 0,
            tiqueteElectronico: 0,
            aceptacionDocumentoElectrinico: 0,
            proforma: 0,
            reciboCuentaCobrar: 0,
            ncCuentaCobrar: 0,
            ndCuentaCobrar: 0,
            asientos: 0,
            movimientoInventario: 0,
        };
        //genera id de bodega
        const idBodega = mongo.ObjectId()
        req.body.bodegaDefault = idBodega;
        req.body.bodegas = [{
            _id: idBodega,
            nombre: "Bodega default",
            usuarioRegistro: req.user_id
        }],

            empresa.agencias.push(req.body);
        await empresa.save();

        res.status(201).json({
            ok: true,
            msg: 'Agencia creada correctamente'
        });

    } catch (error) {
        console.log('Error al crear agencia ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const actualizarAgencia = async (req, res = response) => {
    const empresa = req.empresa;
    const agencia = req.agencia;
    const id = req.params.id;

    try {

        //obtener el indice de la agencia actualizar
        const indexAgencia = (element) => element._id == id;
        const index = empresa.agencias.findIndex(indexAgencia);

        let _empresa = new Empresa();
        _empresa = empresa;
        _empresa.agencias[index].nombre = req.body.nombre;
        _empresa.agencias[index].numeroAgencia = req.body.numeroAgencia;
        _empresa.agencias[index].encargado = req.body.encargado;
        _empresa.agencias[index].telefono = req.body.telefono;
        _empresa.agencias[index].movil = req.body.movil;
        _empresa.agencias[index].email = req.body.email;
        _empresa.agencias[index].direccion = req.body.direccion;
        _empresa.agencias[index].monedaFacturacion = req.body.monedaFacturacion;
        _empresa.agencias[index].tiket = req.body.tiket;
        _empresa.agencias[index].bodegaDefault = req.body.bodegaDefault;

        console.log('empresa actualizada', _empresa);
        const empresaActualizada = await _empresa.save();

        res.status(201).json({
            ok: true,
            agencia: empresaActualizada.agencias[index]
        });

    } catch (error) {
        console.log('Error al actualizar agencia ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const eliminarAgencia = async (req, res = response) => {
    const empresaActual = req.empresa;
    const agencia = req.agencia;
    const id = req.params.id;
    try {

        let empresa = new Empresa(empresaActual);
        //obtener el indice de la agencia actualizar
        const indexAgencia = (element) => element._id == id;
        const index = empresa.agencias.findIndex(indexAgencia);

        empresa.agencias[index].activa = false;

        const empresaActualizada = await empresa.save();

        res.status(201).json({
            ok: true,
            agencia: empresaActualizada.agencias[index]
        });
    } catch (error) {
        console.log('Error al eliminar agencia ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

module.exports = {
    crearAgencia,
    actualizarAgencia,
    eliminarAgencia
}