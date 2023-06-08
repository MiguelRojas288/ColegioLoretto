const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')
const { obtenerAtenciones, obtenerAtencionPorId, crearAtencion, actualizarAtencion, eliminarAtencion } = require('../controllers/atenciones')

// ------------------------------------------------------ OBTENER LAS ATENCIONES ---------------------------------------------------------
router.get('/', validarJWT, obtenerAtenciones)

// ------------------------------------------------------ OBTENER ATENCION POR ID ---------------------------------------------------------
router.get('/:id', validarJWT, obtenerAtencionPorId)

// -------------------------------------------------------- CREAR UNA ATENCION -----------------------------------------------------------
router.post(
    '/', 
    [
        check('fechaYHora', 'La fecha es obligatoria').not().isEmpty(),
        check('idUsuarioEncargado', 'El usuario encargado es obligatorio').not().isEmpty(),
        check('pasoPorEnfermeria', 'El paso por enfermeria es obligatorio').not().isEmpty(),
        check('diagnosticoDeEnfermeria', 'El diagnostico de enfermeria es obligatorio').not().isEmpty(),
        check('motivoDeAtencion', 'El motivo de la atencion es obligatorio').not().isEmpty(),
        check('idEstudiante', 'El estudiante es obligatorio').not().isEmpty(),
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        // check('curso', 'El curso es obligatorio').not().isEmpty(),
        // check('edad', 'La edad es obligatoria').not().isEmpty(),
        // check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        // check('nomPadre', 'El nombre del padre es obligatorio').not().isEmpty(),
        // check('nomMadre', 'El nombre de la madre es obligatorio').not().isEmpty(),
        check('preDiagnostico', 'El prediagnostico es obligatorio').not().isEmpty(),
        check('recomendaciones', 'Las recomendaciones son obligatorias').not().isEmpty(),
        check('observaciones', 'Las observaciones son obligatorias').not().isEmpty(),
        check('usoDePruProy', 'El uso de las P.P. es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    crearAtencion
)

// ----------------------------------------------------- ACTUALIZAR UNA ATENCION ----------------------------------------------------------
router.put(
    '/:id', 
    [
        check('fechaYHora', 'La fecha es obligatoria').not().isEmpty(),
        check('idUsuarioEncargado', 'El usuario encargado es obligatorio').not().isEmpty(),
        check('pasoPorEnfermeria', 'El paso por enfermeria es obligatorio').not().isEmpty(),
        check('diagnosticoDeEnfermeria', 'El diagnostico de enfermeria es obligatorio').not().isEmpty(),
        check('motivoDeAtencion', 'El motivo de la atencion es obligatorio').not().isEmpty(),
        check('idEstudiante', 'El estudiante es obligatorio').not().isEmpty(),
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        // check('curso', 'El curso es obligatorio').not().isEmpty(),
        // check('edad', 'La edad es obligatoria').not().isEmpty(),
        // check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        // check('nomPadre', 'El nombre del padre es obligatorio').not().isEmpty(),
        // check('nomMadre', 'El nombre de la madre es obligatorio').not().isEmpty(),
        check('preDiagnostico', 'El prediagnostico es obligatorio').not().isEmpty(),
        check('recomendaciones', 'Las recomendaciones son obligatorias').not().isEmpty(),
        check('observaciones', 'Las observaciones son obligatorias').not().isEmpty(),
        check('usoDePruProy', 'El uso de las P.P. es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    actualizarAtencion
)

// ------------------------------------------------------- ELIMINAR UNA ATENCION ----------------------------------------------------------
router.delete('/:id', validarJWT, eliminarAtencion)

module.exports = router