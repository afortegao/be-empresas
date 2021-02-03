/*
eventos routes
/api/agencia
*/
const { Router, request } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearAgencia, actualizarAgencia, eliminarAgencia, } = require('../controllers/agencia');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarEmpresa } = require('../middlewares/validar-empresa');
const { validarAgencia } = require('../middlewares/validar-agencia');

const router = Router();
//para validar el token en todas las rutas,
router.use(validarJWT);

//para validar el token en todas las rutas,
router.use(validarEmpresa);

//crear agencias
router.post('/', [
    check('nombre', 'El nombre de la agencia es requerido').not().isEmpty()
        .isLength({ max: 100 }).withMessage('El nombre debe tener máximo 100 caractéres'),
    validarCampos,
], crearAgencia);

//para validar el token en todas las rutas,
router.use(validarAgencia);
//actualizar agencias
router.put('/:id', [
    check('nombre', 'El nombre de la agencia es requerido').not().isEmpty()
        .isLength({ max: 100 }).withMessage('El nombre debe tener máximo 100 caractéres'),
    check('numeroAgencia', 'El número de agencia es requerido').not().isEmpty()
        .isLength({ min: 3, max: 3 }).withMessage('El código de agencia debe ser de 3 caractéres')
        .isNumeric().withMessage('El código de agencia debe ser numerico'),
    check('encargado', 'El nombre del encargado debe tener máximo 100 caractéres').isLength({ max: 100 }),
    check('telefono', 'El teléfono debe tener máximo 20 caractéres').trim().escape().isLength({ max: 20 }),
    check('movil', 'El móvil debe tener máximo 20 caractéres').trim().escape().isLength({ max: 20 }),
    check('email', 'El email debe tener máximo 160 caractéres').trim().escape().isLength({ max: 160 }),
    check('direccion', 'La dirección debe tener máximo 160 caractéres').isLength({ max: 160 }),
    check('monedaFacturacion', 'La moneda de facturación es requerida').not().isEmpty()
        .isMongoId().withMessage('La moneda no es válida'),
    check('tiket', 'El tiket no es válido').isMongoId(),
    check('bodegaDefault', 'La bodega default no es válida').isMongoId(),
    
    validarCampos,
], actualizarAgencia);

//eliminar agencia
router.delete('/:id', [

], eliminarAgencia);



module.exports = router;