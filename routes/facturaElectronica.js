
/*
eventos routes
/api/eventos
*/

const { Router, request } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { facturaElectronica, actualizarFacturaElectronica } = require('../controllers/facturaElectronica');
const { isRequired } = require('../helpers/isRequired');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
//para validar el token en todas las rutas,
router.use(validarJWT);

//registrar factura electrónica
router.put('/facturaElectronica/:id', [
    check('generaFacturaElectronica', 'Generar factura electrónica es requerido').not().isEmpty(),
    check('user', 'El usuario de factura electrónica es requerido').custom(isRequired),
    check('password', 'El password de factura electrónica es requerido').custom(isRequired),
    check('pin', 'El pin de factura electrónica es requerido').custom(isRequired),
    check('email', 'El email de factura electrónica es requerido').custom(isRequired),
    check('certificado', 'El certificado de factura electrónica es requerido').custom(isRequired),
    validarCampos,
], facturaElectronica);

//actualizar  factura electrónica
router.put('/actualizarFacturaElectronica/:id', [
    check('generaFacturaElectronica', 'Generar factura electrónica es requerido').not().isEmpty(),
    check('user', 'El usuario de factura electrónica es requerido').custom(isRequired),
    check('password', 'El password de factura electrónica es requerido').custom(isRequired),
    check('pin', 'El pin de factura electrónica es requerido').custom(isRequired),
    check('email', 'El email de factura electrónica es requerido').custom(isRequired),
    check('certificado', 'El certificado de factura electrónica es requerido').custom(isRequired),
    validarCampos,
], actualizarFacturaElectronica);


module.exports = router;