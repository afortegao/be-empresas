const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    //x-token headers

    const token = req.header('x-token');

    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe token en la petición'
        });
    }

    try {
       
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
      
        //incluir en el req
        req.user_id = payload._id;
        req.user_nombre = payload.name;
     

    } catch (error) {
        console.log('Se presento un error al validar '+error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador ' + error
        });
    }



    next();

}

module.exports = {
    validarJWT
}