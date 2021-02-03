//Validar que el un dato sea una fecha válida
const moment = require('moment');

const isDate = (value) => {
    if (!value) {
        return false
    }
    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
}