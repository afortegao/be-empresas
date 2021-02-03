//Validar los campos numericos si son requeridos
const isNumero = (value, { req }) => {
    if (req.body.generaFacturaElectronica) {
        if (!Number(value)) {
            return false
        }
        return true;
    } else {
        if (value != '') {
            if (!Number(value)) {
                return false
            }
            return true;
        }
        return true;
    }
}
module.exports = {
    isNumero
}