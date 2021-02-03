
/*
eventos routes
/api/eventos
*/

const { Router, request } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { agregarContacto, actualizarContacto, eliminarContacto } = require('../controllers/contacto');
const { isRequired } = require('../helpers/isRequired');
const { isMongoID } = require('../helpers/isMongoID');
const { isNumero } = require('../helpers/isNumero');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
//para validar el token en todas las rutas,
router.use(validarJWT);


//agregar contacto
router.post('/contacto/:id', [
    validarCampos
], agregarContacto);

//actualizar agencias
router.put('/contacto/:id', [
    validarCampos
], actualizarContacto);

//actualizar agencias
router.delete('/contacto/:id', [
    validarCampos
], eliminarContacto);


module.exports = router;