const { response } = require('express');
const fetch = require('node-fetch');
const { enviarConsulta } = require('../helpers/consultarApi')
const Empresa = require('../models/empresa');
const { mongo } = require('mongoose');


const url_seguridad = process.env.URL_SEGURIDAD;
const url_configuracion = process.env.URL_CONFIGURACION;

const getEmpresa = async (req, res = response) => {

    const _id = req.header('x-empresa');

    const empresa = await Empresa.findById(_id);

    if (!empresa) {
        return res.json({
            ok: true,
            msg: 'Emppresa no existe'
        })
    }
    return res.json({
        ok: true,
        empresa
    })
}

const propietarioEmpresas = async (req, res = response) => {
  const propietario = req.params.propietario;

    const empresa = await Empresa.find({propietario:propietario});

    if (!empresa) {
        return res.json({
            ok: true,
            msg: 'Emppresa no existe'
        })
    }
    return res.json({
        ok: true,
        empresa
    })
}
const crearEmpresa = async (req, res = response) => {
    const { pais, nombre } = req.body;
    //obtener pais

    try {
        const api = url_configuracion + '/api/pais/' + pais;
        const _pais = await enviarConsulta(api, 'GET', '', {});

        if (!_pais.ok) {
            return res.json({
                ok: false,
                msg: _pais.msg
            });
        }
        req.body.monedaDefault = _pais.pais.monedas[0]._id;
        req.body.propietario = req.user_id;
        req.body.usuarioRegistro = req.user_id;

        //datos de la agencia
        const idAgencia = mongo.ObjectId();
        //genera id de bodega
        const idBodega = mongo.ObjectId()

        req.body.agenciaDefault = idAgencia;
        //crear la agencia y la bodega default
        const consecutivoAgencia = ('000' + 1).slice(-3);
        req.body.agencias = [{
            nombre:'Agencia default',
            numeroAgencia:consecutivoAgencia,
            usuarioRegistro :req.user_id,
            monedaFacturacion :_pais.pais.monedas[0]._id,
            _id :idAgencia,
            consecutivos :{
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
            },
            bodegaDefault :idBodega,
            //genera id de bodega
            bodegas :[{
                _id: idBodega,
                nombre: "Bodega default",
                usuarioRegistro: req.user_id
            }],
        }]
        // empresa.agencias.push(req.body);
        let empresa = new Empresa(req.body);
        await empresa.save();

        return res.json({
            ok: true,
            empresa
        });

    } catch (error) {
        console.log('Error al crear empresa ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}



const actualizarEmpresa = async (req, res = response) => {
    const id = req.params.id;
    try {

        await Empresa.findByIdAndUpdate(id, req.body);

        res.json({
            ok: true,
            msg: 'actualizarEmpresa'
        })
    } catch (error) {
        console.log('Error al actualizar empresa ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }


}

const eliminarEmpresa = async (req, res = response) => {
    const id = req.params.id;

    try {
        await Empresa.findByIdAndUpdate(id, { activa: false });
        res.json({
            ok: true,
            msg: 'La empresa fue eliminada'

        })
    } catch (error) {
        console.log('Error al eliminar empresa ' + error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }
}


module.exports = {
    getEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa,
    propietarioEmpresas
   

}