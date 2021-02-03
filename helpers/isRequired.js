//Validar los campos requeridos por factura electronica
const isRequired = (value, { req }) => {
    if (req.body.generaFacturaElectronica) {
        if (!value) {
            return false
        }
        return true;
    } else {
        return true;
    }
}
module.exports = {
    isRequired
}