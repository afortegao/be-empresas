//Validar que el id existe en la coleccion relacionada
const fetch = require('node-fetch');

const isExist = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    if (!data.ok) {  
        return false;
    }
   return true;
}
module.exports = {
    isExist
}