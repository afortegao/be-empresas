/*
eventos routes
/api/consecutivo
*/

const { Router, request } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {   incrementarFacturaElectronica,
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
    actualizarConsecutivos } = require('../controllers/consecutivo');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarEmpresa } = require('../middlewares/validar-empresa');
const { validarAgencia } = require('../middlewares/validar-agencia');

const router = Router();
//para validar el token en todas las rutas,
router.use(validarJWT);
router.use(validarEmpresa);
router.use(validarAgencia);

//actualizar consecutivos agencias
router.put('/', [
    check('facturaElectronica', 'Consecutivo de factura electronica es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('notaCreditoElectronica', 'Consecutivo de nota crédito electrónica es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('notaDebitoElectronica', 'Consecutivo de nota débito electrónica es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('facturaCompraElectronica', 'Consecutivo de factura compra electrónica es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('facturaExportacionElectronica', 'Consecutivo de factura exportación electrónica es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('tiqueteElectronico', 'Consecutivo de tiquete electrónico es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('aceptacionDocumentoElectrinico', 'Consecutivo de aceptación de documento electrónico es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('proforma', 'Consecutivo de proforma es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('reciboCuentaCobrar', 'Consecutivo de recibo de cuenta cobrar es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('ncCuentaCobrar', 'Consecutivo de nota de crédito cuenta cobrar es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('ndCuentaCobrar', 'Consecutivo de nota débito cuenta cobrar es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('asientos', 'Consecutivo de asientos es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    check('movimientoInventario', 'Consecutivo de movimiento de inventario es requerido y debe ser numérico').trim().escape().isNumeric().not().isEmpty(),
    validarCampos,
], actualizarConsecutivos);

//incrementar consecutivo de factura electronica
router.put('/incrementarFacturaElectronica', [
], incrementarFacturaElectronica);

//incrementar consecutivo de factura electronica
router.put('/incrementarNotaCreditoElectronica', [
], incrementarNotaCreditoElectronica);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarAsientos', [
],incrementarAsientos);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarMovimientoInventario', [
], incrementarMovimientoInventario);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarNcCuentaCobrar', [
], incrementarNcCuentaCobrar);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarNdCuentaCobrar', [
], incrementarNdCuentaCobrar);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarProforma', [
], incrementarProforma);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarReciboCuentaCobrar', [
], incrementarReciboCuentaCobrar);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarAceptacionDocumentoElectrinico', [
], incrementarAceptacionDocumentoElectrinico);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarFacturaCompraElectronica', [
], incrementarFacturaCompraElectronica);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarFacturaExportacionElectronica', [
], incrementarFacturaExportacionElectronica);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarNotaDebitoElectronica', [
], incrementarNotaDebitoElectronica);
// 

//incrementar consecutivo de factura electronica
router.put('/incrementarTiqueteElectronico', [
], incrementarTiqueteElectronico);
// 

module.exports = router;