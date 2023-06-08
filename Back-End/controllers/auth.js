const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuarios')
const { generarJWT } = require('../helpers/jwt')


// login de usuarios
const loginUsuario = async(req, res = response) =>  {
    
    const { nombreDeUsuario, password } = req.body

    try {
        
        const usuario = await Usuario.findOne({ nombreDeUsuario })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario no existe'
            })
        }

        // confirmar la contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password )

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // generar el JWT
        const token = await generarJWT( usuario.id, usuario.nombres )

        res.json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombres,
            rol: usuario.rol,
            estado: usuario.estado,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const revalidarToken = async(req, res = response) =>  {
    
    const uid = req.uid
    const nombre = req.nombres

    // generar un nuevo JWT y retornarlo por medio de esta peticion
    const token = await generarJWT( uid, nombre )

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    loginUsuario,
    revalidarToken
}