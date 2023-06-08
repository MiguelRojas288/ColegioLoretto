const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')
const { obtenerEstudiantes, obtenerEstudiantePorId, crearEstudiante, actualizarEstudiante, eliminarEstudiante } = require('../controllers/estudiantes')

// ------------------------------------------------------ OBTENER LOS ESTUDIANTES ---------------------------------------------------------
router.get('/', validarJWT, obtenerEstudiantes)

// ------------------------------------------------------ OBTENER ESTUDIANTE POR ID ---------------------------------------------------------
router.get('/:id', validarJWT, obtenerEstudiantePorId)

// -------------------------------------------------------- CREAR UN ESTUDIANTE -----------------------------------------------------------
router.post(
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('curso', 'El curso es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('nomPadre', 'El nombre del padre es obligatorio').not().isEmpty(),
        check('nomMadre', 'El nombre de la madre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    crearEstudiante
)

// ----------------------------------------------------- ACTUALIZAR UN ESTUDIANTE ----------------------------------------------------------
router.put(
    '/:id', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('curso', 'El curso es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('sexo', 'El sexo es obligatorio').not().isEmpty(),
        check('nomPadre', 'El nombre del padre es obligatorio').not().isEmpty(),
        check('nomMadre', 'El nombre de la madre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    actualizarEstudiante
)

// ------------------------------------------------------- ELIMINAR UN ESTUDIANTE ----------------------------------------------------------
router.delete('/:id', validarJWT, eliminarEstudiante)

module.exports = router