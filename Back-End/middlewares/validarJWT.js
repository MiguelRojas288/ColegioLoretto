const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT =  ( req, res = response, next ) => {
    
    // lo voy a pedir en x-token en los heders
    const token = req.header('x-token')

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid, nombre } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = uid
        req.nombre = nombre
        
    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })

    }

    next()

}

module.exports = {
    validarJWT
}