//Validar si un campo requerido es type MongoId
const ObjectId = require('mongoose').Types.ObjectId;

const isMongoID = (value, { req }) => {
    if (req.body.generaFacturaElectronica) {
        if (!value) {
            return false
        }
        if(ObjectId.isValid(value)){
            return true;
        }
        return false;
    } else {
        if(value){
            if(ObjectId.isValid(value)){
                return true;
            }
            return false
        }
        return true;
    }
}
module.exports = {
    isMongoID
}