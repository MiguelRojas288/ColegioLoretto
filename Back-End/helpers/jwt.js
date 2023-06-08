const jwt = require('jsonwebtoken')

const generarJWT = ( uid, nombre ) => {

    return new Promise( (resolve, reject) => {
        
        const payload = { uid, nombre }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '8h'
        }, ( err, token ) => {

            if (err) {
                console.log(err)
                reject('No se pudo generar el JWT')
            }

            resolve( token )

        })

    })

}

module.exports = {
    generarJWT
}