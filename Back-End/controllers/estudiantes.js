const { response } = require('express')
const Estudiante = require('../models/estudiantes')

// --------------------------------------------------------- OBTENER ESTUDIANTES ------------------------------------------------------------
const obtenerEstudiantes = async( req, res = response ) => {
    
    const estudiantes = await Estudiante.find()
        res.json({    
        ok: true,
        estudiantes
    })
}

// ------------------------------------------------------ OBTENER ESTUDIANTE SEGUN ID -------------------------------------------------------
const obtenerEstudiantePorId = async( req, res = response ) => {
    
    const estudianteId = req.params.id

    try {
        
        const estudiante = await Estudiante.findById( estudianteId )

        if (!estudiante) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un estudiante'
            })
        }

        res.json({
            ok: true,
            estudiante
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// --------------------------------------------------------- CREAR ESTUDIANTE ------------------------------------------------------------
const crearEstudiante = async(req, res = response) =>  {

    try {

        const estudiante = new Estudiante(req.body)

        await estudiante.save()

        res.status(201).json({
            ok: true,
            estudiante: estudiante
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

// ----------------------------------------------------------- ACTUALIZAR ESTUDIANTE ------------------------------------------------------
const actualizarEstudiante = async( req, res = response ) => {
    
    const estudianteId = req.params.id

    try {
        
        const estudiante = await Estudiante.findById( estudianteId )

        if (!estudiante) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un estudiante'
            })
        }

        const nuevoEstudiante = {
            ...req.body
        }

        const estudianteActualizado = await Estudiante.findByIdAndUpdate( estudianteId, nuevoEstudiante, { new: true } )

        res.json({
            ok: true,
            estudiante: estudianteActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// ------------------------------------------------------------ ELIMINAR ESTUDIANTE ----------------------------------------------------------
const eliminarEstudiante = async( req, res = response ) => {
    
    const estudianteId = req.params.id

    try {
        
        const estudiante = await Estudiante.findById( estudianteId )

        if (!estudiante) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un estudiante'
            })
        }

        await Estudiante.findByIdAndDelete( estudianteId )

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
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}