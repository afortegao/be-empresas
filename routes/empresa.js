/*
eventos routes
/api/eventos
*/

const { Router, request } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEmpresa, crearEmpresa, actualizarEmpresa,
    eliminarEmpresa,incrementarCodigoProducto,
    propietarioEmpresas, } = require('../controllers/empresa');
const { isRequired } = require('../helpers/isRequired');
const { isMongoID } = require('../helpers/isMongoID');
const { isNumero } = require('../helpers/isNumero');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarEmpresa } = require('../middlewares/validar-empresa');

const router = Router();
//para validar el token en todas las rutas,
router.use(validarJWT);


//obtener empresa
router.get('/', [
], getEmpresa);

//obtener empresas del propierario
router.get('/:propietario', [
], propietarioEmpresas);

//crear empresa
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
        .isLength({ max: 100 }).withMessage('El nombre debe tener máximo 100 caratéres'),
    check('pais', 'país es requerido').not().isEmpty().custom(isMongoID).withMessage('El país no es válido'),
    validarCampos,
], crearEmpresa);


//para validar el token en todas las rutas,
router.use(validarEmpresa);
//actualizar empresa
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().isLength({ max: 80 })
        .withMessage('El nombre debe tener máximo 100 caratéres'),
    check('monedaDefault', 'La moneda es requerida').not().isEmpty(),
    check('pais', 'El país es requerido').not().isEmpty().isMongoId().withMessage('El país no es válido'),
    check('nombreComercial').trim().escape().isLength({ max: 80 }).withMessage('El nombre comercial debe tener máximo 80 caractéres'),
    check('tipoIdentificacion', 'Tipo de indentificación es requerido').trim().escape().custom(isRequired),
    check('identificacion', 'La identificación es requerida').trim().escape().custom(isRequired).
        isLength({ max: 12 }).withMessage('La identificación debe tener máximo 12 caractéres'),
    check('telefono', 'El teléfono es requerido').trim().escape().custom(isRequired).isLength({ max: 20 })
        .withMessage('El teléfono debe tener máximo 20 caractéres')
        .custom(isNumero).withMessage('El teléfono debe ser numérico'),
    check('movil').trim().escape().isLength({ max: 20 })
        .withMessage('El móvil debe tener máximo 20 caractéres')
        .custom(isNumero).withMessage('El móvil debe ser numérico'),
    check('email', 'El email es requerido').trim().escape().custom(isRequired).isLength({ max: 160 })
        .withMessage('El email debe tener máximo 160 caractéres'),
    check('representante', '').trim().escape().isLength({ max: 100 })
        .withMessage('El representante debe tener máximo 100 caractéres'),
    check('web', '').trim().escape().isLength({ max: 100 })
        .withMessage('La web debe tener máximo 100 caractéres'),
    check('facebook', '').trim().escape().isLength({ max: 100 })
        .withMessage('El facebook debe tener máximo 100 caractéres'),
    check('twitter', '').trim().escape().isLength({ max: 100 })
        .withMessage('El twitter debe tener máximo 100 caractéres'),
    check('instagram', '').trim().escape().isLength({ max: 100 })
        .withMessage('El instagram  debe tener máximo 100 caractéres'),
    check('logo', '').trim().escape(),
    check('estado', 'La provincia es requerida').trim().escape().custom(isRequired),
    check('canton', 'El cantón es requerido').trim().escape().custom(isRequired),
    check('distrito', 'El distrito es requerido').trim().escape().custom(isRequired),
    check('barrio', 'El barrio es requerido').trim().escape().custom(isRequired),
    check('otrasSenas', 'La dirección es requerida').trim().escape().custom(isRequired)
        .isLength({ max: 160 }).withMessage('La dirección debe tener máximo 160 caractéres'),
    check('controlarCaja', '').trim().escape(),
    check('pedidoAbierto', '').trim().escape(),
    check('generaFacturaElectronica', '').trim().escape(),
    check('impuestoIncluido', '').trim().escape(),
    validarCampos,
], actualizarEmpresa);



//eliminar empresa
router.delete('/:id', [
], eliminarEmpresa);

//incrementarCodigoProducto
router.put('/codigoProducto/:consecutivo', [
], incrementarCodigoProducto);




module.exports = router;