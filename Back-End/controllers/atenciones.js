const { response } = require('express')
const Atencion = require('../models/atenciones')

// --------------------------------------------------------- OBTENER ATENCIONES ------------------------------------------------------------
const obtenerAtenciones = async( req, res = response ) => {
    
    const atenciones = await Atencion.find()
                                .populate('idUsuarioEncargado')
                                .populate('idEstudiante')
        res.json({    
        ok: true,
        atenciones
    })
}

// ------------------------------------------------------ OBTENER ATENCION SEGUN ID -------------------------------------------------------
const obtenerAtencionPorId = async( req, res = response ) => {
    
    const atencionId = req.params.id

    try {
        
        const atencion = await Atencion.findById( atencionId )

        if (!atencion) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de una atencion'
            })
        }

        res.json({
            ok: true,
            atencion
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// --------------------------------------------------------- CREAR ATENCION ------------------------------------------------------------
const crearAtencion = async(req, res = response) =>  {

    try {

        const atencion = new Atencion(req.body)

        await atencion.save()

        res.status(201).json({
            ok: true,
            atencion: atencion
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

// ----------------------------------------------------------- ACTUALIZAR ATENCION ------------------------------------------------------
const actualizarAtencion = async( req, res = response ) => {
    
    const atencionId = req.params.id

    try {
        
        const atencion = await Atencion.findById( atencionId )

        if (!atencion) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de una atencion'
            })
        }

        const nuevaAtencion = {
            ...req.body
        }

        const atencionActualizada = await Atencion.findByIdAndUpdate( atencionId, nuevaAtencion, { new: true } )

        res.json({
            ok: true,
            atencion: atencionActualizada
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// ------------------------------------------------------------ ELIMINAR ATENCION ----------------------------------------------------------
const eliminarAtencion = async( req, res = response ) => {
    
    const atencionId = req.params.id

    try {
        
        const atencion = await Atencion.findById( atencionId )

        if (!atencion) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de una atencion'
            })
        }

        await Atencion.findByIdAndDelete( atencionId )

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
    obtenerAtenciones,
    obtenerAtencionPorId,
    crearAtencion,
    actualizarAtencion,
    eliminarAtencion
}