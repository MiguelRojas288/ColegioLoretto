// const express = require('express')
const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuarios')
const { generarJWT } = require('../helpers/jwt')

// --------------------------------------------------------- OBTENER USUARIOS ------------------------------------------------------------
const obtenerUsuarios = async( req, res = response ) => {
    
    const usuarios = await Usuario.find()
    
    res.json({    
        ok: true,
        usuarios
    })
}

// ------------------------------------------------------ OBTENER USUARIO SEGUN ID -------------------------------------------------------
const obtenerUsuarioPorId = async( req, res = response ) => {
    
    const usuarioId = req.params.id

    try {
        
        const usuario = await Usuario.findById( usuarioId )

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un usuario'
            })
        }

        res.json({
            ok: true,
            usuario
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// --------------------------------------------------------- CREAR USUARIO ------------------------------------------------------------
const crearUsuario = async(req, res = response) =>  {
    
    const { nombreDeUsuario, password } = req.body

    try {

        let usuario = await Usuario.findOne({ nombreDeUsuario })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un registro con ese nombre de usuario'
            })
        }

        usuario = new Usuario(req.body)

        // encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        // // generar el JWT
        // const token = await generarJWT( usuario.id, usuario.nombres )

        res.status(201).json({
            ok: true,
            usuario: usuario
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

// ----------------------------------------------------------- ACTUALIZAR USUARIO ------------------------------------------------------
const actualizarUsuario = async( req, res = response ) => {
    
    const usuarioId = req.params.id

    const { password } = req.body

    try {
        
        const usuario = await Usuario.findById( usuarioId )

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un usuario'
            })
        }

        const nuevoUsuario = {
            ...req.body
        }

        // // encriptar contraseña
        // const salt = bcrypt.genSaltSync()
        // nuevoUsuario.password = bcrypt.hashSync(password, salt)

        const usuarioActualizado = await Usuario.findByIdAndUpdate( usuarioId, nuevoUsuario, { new: true } )

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// ------------------------------------------------------------ ELIMINAR USUARIO ----------------------------------------------------------
const eliminarUsuario = async( req, res = response ) => {
    
    const usuarioId = req.params.id

    try {
        
        const usuario = await Usuario.findById( usuarioId )

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un usuario'
            })
        }

        await Usuario.findByIdAndDelete( usuarioId )

        res.json({
            ok: true,
            msg: 'Registro eliminado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}