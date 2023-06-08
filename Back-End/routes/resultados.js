const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')
const { obtenerResultados, obtenerResultadoPorId, crearResultado, actualizarResultado, eliminarResultado } = require('../controllers/resultados')

// ------------------------------------------------------ OBTENER LOS RESULTADOS ---------------------------------------------------------
router.get('/', validarJWT, obtenerResultados)

// ------------------------------------------------------ OBTENER RESULTADO POR ID ---------------------------------------------------------
router.get('/:id', validarJWT, obtenerResultadoPorId)

// -------------------------------------------------------- CREAR UN RESULTADO -----------------------------------------------------------
router.post(
    '/', 
    [
        check('fechaYHora', 'La fecha es obligatoria').not().isEmpty(),
        check('idFormDeAtencion', 'El id de la atencion es obligatorio').not().isEmpty(),
        check('resultadoUno', 'El resultado uno es obligatorio').not().isEmpty(),
        check('resultadoDos', 'El resultado dos es obligatorio').not().isEmpty(),
        check('resultadoTres', 'El resultado tres es obligatorio').not().isEmpty(),
        check('resultadoCuatro', 'El resultado cuatro es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    crearResultado
)

// ----------------------------------------------------- ACTUALIZAR UN RESULTADO ----------------------------------------------------------
router.put(
    '/:id', 
    [
        check('fechaYHora', 'La fecha es obligatoria').not().isEmpty(),
        check('idFormDeAtencion', 'El id de la atencion es obligatorio').not().isEmpty(),
        check('resultadoUno', 'El resultado uno es obligatorio').not().isEmpty(),
        check('resultadoDos', 'El resultado dos es obligatorio').not().isEmpty(),
        check('resultadoTres', 'El resultado tres es obligatorio').not().isEmpty(),
        check('resultadoCuatro', 'El resultado cuatro es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    actualizarResultado
)

// ------------------------------------------------------- ELIMINAR UN RESULTADO ----------------------------------------------------------
router.delete('/:id', validarJWT, eliminarResultado)

module.exports = router