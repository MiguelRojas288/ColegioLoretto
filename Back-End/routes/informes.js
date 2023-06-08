const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')
const { obtenerInformes, obtenerInformePorId, crearInforme, actualizarInforme, eliminarInforme } = require('../controllers/informes')

// ------------------------------------------------------ OBTENER LOS INFORMES ---------------------------------------------------------
router.get('/', validarJWT, obtenerInformes)

// ------------------------------------------------------ OBTENER INFORME POR ID ---------------------------------------------------------
router.get('/:id', validarJWT, obtenerInformePorId)

// -------------------------------------------------------- CREAR UN INFORME -----------------------------------------------------------
router.post(
    '/', 
    [
        check('fechaYHora', 'La fecha es obligatoria').not().isEmpty(),
        check('idFormDeAtencion', 'El id de la atencion es obligatorio').not().isEmpty(),
        check('idUsuarioEncargado', 'El usuario encargado es obligatorio').not().isEmpty(),
        check('diagnosticoFinal', 'El diagnostico final es obligatorio').not().isEmpty(),
        check('observacionFinal', 'La observacion final es obligatoria').not().isEmpty(),
        check('recomendacionFinal', 'La recomendacion final es obligatoria').not().isEmpty(),
        check('accionFinal', 'La accion final es obligatoria').not().isEmpty(),
        check('idResultadosPP', 'El id de los resultados es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    crearInforme
)

// ----------------------------------------------------- ACTUALIZAR UN INFORME ----------------------------------------------------------
router.put(
    '/:id', 
    [
        check('fechaYHora', 'La fecha es obligatoria').not().isEmpty(),
        check('idFormDeAtencion', 'El id de la atencion es obligatorio').not().isEmpty(),
        check('idUsuarioEncargado', 'El usuario encargado es obligatorio').not().isEmpty(),
        check('diagnosticoFinal', 'El diagnostico final es obligatorio').not().isEmpty(),
        check('observacionFinal', 'La observacion final es obligatoria').not().isEmpty(),
        check('recomendacionFinal', 'La recomendacion final es obligatoria').not().isEmpty(),
        check('accionFinal', 'La accion final es obligatoria').not().isEmpty(),
        check('idResultadosPP', 'El id de los resultados es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    actualizarInforme
)

// ------------------------------------------------------- ELIMINAR UN INFORME ----------------------------------------------------------
router.delete('/:id', validarJWT, eliminarInforme)

module.exports = router