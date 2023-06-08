const { response } = require('express')
const Resultado = require('../models/resultados')

// --------------------------------------------------------- OBTENER RESULTADOS ------------------------------------------------------------
const obtenerResultados = async( req, res = response ) => {
    
    const resultados = await Resultado.find()
                                .populate('idFormDeAtencion')
        res.json({    
        ok: true,
        resultados
    })
}

// ------------------------------------------------------ OBTENER RESULTADO SEGUN ID -------------------------------------------------------
const obtenerResultadoPorId = async( req, res = response ) => {
    
    const resultadoId = req.params.id

    try {
        
        const resultado = await Resultado.findById( resultadoId )

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un resultado'
            })
        }

        res.json({
            ok: true,
            resultado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// --------------------------------------------------------- CREAR RESULTADO ------------------------------------------------------------
const crearResultado = async(req, res = response) =>  {

    try {

        const resultado = new Resultado(req.body)

        await resultado.save()

        res.status(201).json({
            ok: true,
            resultado: resultado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

// ----------------------------------------------------------- ACTUALIZAR RESULTADO ------------------------------------------------------
const actualizarResultado = async( req, res = response ) => {
    
    const resultadoId = req.params.id

    try {
        
        const resultado = await Resultado.findById( resultadoId )

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un resultado'
            })
        }

        const nuevoResultado = {
            ...req.body
        }

        const resultadoActualizado = await Resultado.findByIdAndUpdate( resultadoId, nuevoResultado, { new: true } )

        res.json({
            ok: true,
            resultado: resultadoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// ------------------------------------------------------------ ELIMINAR RESULTADO ----------------------------------------------------------
const eliminarResultado = async( req, res = response ) => {
    
    const resultadoId = req.params.id

    try {
        
        const resultado = await Resultado.findById( resultadoId )

        if (!resultado) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un resultado'
            })
        }

        await Resultado.findByIdAndDelete( resultadoId )

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
    obtenerResultados,
    obtenerResultadoPorId,
    crearResultado,
    actualizarResultado,
    eliminarResultado
}