const { response } = require('express')
const Informe = require('../models/informes')

// --------------------------------------------------------- OBTENER INFORMES ------------------------------------------------------------
const obtenerInformes = async( req, res = response ) => {
    
    const informes = await Informe.find()
                                .populate('idFormDeAtencion')
                                .populate('idUsuarioEncargado')
        res.json({    
        ok: true,
        informes
    })
}

// ------------------------------------------------------ OBTENER INFORME SEGUN ID -------------------------------------------------------
const obtenerInformePorId = async( req, res = response ) => {
    
    const informeId = req.params.id

    try {
        
        const informe = await Informe.findById( informeId )

        if (!informe) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un informe'
            })
        }

        res.json({
            ok: true,
            informe
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// --------------------------------------------------------- CREAR INFORME ------------------------------------------------------------
const crearInforme = async(req, res = response) =>  {

    try {

        const informe = new Informe(req.body)

        await informe.save()

        res.status(201).json({
            ok: true,
            informe: informe
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

// ----------------------------------------------------------- ACTUALIZAR INFORME ------------------------------------------------------
const actualizarInforme = async( req, res = response ) => {
    
    const informeId = req.params.id

    try {
        
        const informe = await Informe.findById( informeId )

        if (!informe) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un informe'
            })
        }

        const nuevoInforme = {
            ...req.body
        }

        const informeActualizado = await Informe.findByIdAndUpdate( informeId, nuevoInforme, { new: true } )

        res.json({
            ok: true,
            informe: informeActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// ------------------------------------------------------------ ELIMINAR INFORME ----------------------------------------------------------
const eliminarInforme = async( req, res = response ) => {
    
    const informeId = req.params.id

    try {
        
        const informe = await Informe.findById( informeId )

        if (!informe) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese Id de un informe'
            })
        }

        await Informe.findByIdAndDelete( informeId )

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
    obtenerInformes,
    obtenerInformePorId,
    crearInforme,
    actualizarInforme,
    eliminarInforme
}