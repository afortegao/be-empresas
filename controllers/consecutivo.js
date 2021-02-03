const { response } = require('express');
const fetch = require('node-fetch');
const { enviarConsulta } = require('../helpers/consultarApi')
const Empresa = require('../models/empresa');


const url_seguridad = process.env.URL_SEGURIDAD;
const url_configuracion = process.env.URL_CONFIGURACION;


const actualizarConsecutivos = async (req, res = response) => {
    const empresa_id = req.empresa._id;
    const agencia_id = req.agencia._id;
    try {
        res.json({
            ok: true,
            msg: 'Consecutivos actualizados'
        })
    } catch (error) {
        console.log('Error al actualizar consecutivos ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }


}


const incrementarFacturaElectronica = async (req, res = response) => {
    const empresa_id =req.empresa._id;
    const agencia_id =req.agencia._id;
    
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.facturaElectronica": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.facturaElectronica
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo factura electrónica ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarNotaCreditoElectronica = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.notaCreditoElectronica": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.notaCreditoElectronica
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo factura electrónica ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}



const incrementarNotaDebitoElectronica = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.notaDebitoElectronica": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.notaDebitoElectronica
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo nota de débito electrónica ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}


const incrementarFacturaCompraElectronica = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.facturaCompraElectronica": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.facturaCompraElectronica
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo factura de compra electrónica ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarFacturaExportacionElectronica = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.facturaExportacionElectronica": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.facturaExportacionElectronica
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo factura electronica de exportación ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarTiqueteElectronico = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.tiqueteElectronico": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.tiqueteElectronico
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo tiquete electrónica ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarAceptacionDocumentoElectrinico = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.aceptacionDocumentoElectrinico": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.aceptacionDocumentoElectrinico
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo aceptacion documento electronica ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarProforma = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.Proforma": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.Proforma
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo de proforma ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarReciboCuentaCobrar = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.reciboCuentaCobrar": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.reciboCuentaCobrar
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo recibos ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarNcCuentaCobrar = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.ncCuentaCobrar": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.ncCuentaCobrar
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo notas de crédito internas ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarNdCuentaCobrar = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.ndCuentaCobrar": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.ndCuentaCobrar
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo notas débito internas ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarAsientos = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.asientos": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.asientos
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo asientos contables ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}

const incrementarMovimientoInventario = async (req, res = response) => {
     const empresa_id =req.empresa._id;
     const agencia_id =req.agencia._id;
    try {
        await Empresa.updateOne({ "_id": { $eq: empresa_id } },
            { $inc: { "agencias.$[ag].consecutivos.movimientoInventario": 1 } },
            { arrayFilters: [{ "ag._id": { $eq: agencia_id } }] })
        const empresa = await Empresa.findById(empresa_id);
        let agencias = [];
        agencias = empresa.agencias;
        let agencia = agencias.filter(function (e) {
            return e.id == agencia_id;
        });
        return res.status(201).json({
            ok: true,
            numero: agencia[0].consecutivos.movimientoInventario
        });
    } catch (error) {
        console.log('Error al incrementar consecutivo movimientos de inventario ' + error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}
module.exports = {
    incrementarFacturaElectronica,
    incrementarNotaCreditoElectronica,
    incrementarAsientos,
    incrementarMovimientoInventario,
    incrementarNcCuentaCobrar,
    incrementarNdCuentaCobrar,
    incrementarProforma,
    incrementarReciboCuentaCobrar,
    incrementarAceptacionDocumentoElectrinico,
    incrementarFacturaCompraElectronica,
    incrementarFacturaExportacionElectronica,
    incrementarNotaDebitoElectronica,
    incrementarTiqueteElectronico,
    actualizarConsecutivos,
}