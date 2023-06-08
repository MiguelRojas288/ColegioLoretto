// todas deben pasar por la validacion del JWT

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()
const { validarJWT } = require('../middlewares/validarJWT')
const { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios')

// ------------------------------------------------------ OBTENER LOS USUARIOS ---------------------------------------------------------
router.get('/', validarJWT, obtenerUsuarios)

// ------------------------------------------------------ OBTENER USUARIO POR ID ---------------------------------------------------------
router.get('/:id', validarJWT, obtenerUsuarioPorId)

// -------------------------------------------------------- CREAR UN USUARIO -----------------------------------------------------------
router.post(
    '/', 
    [
        check('ci', 'El ci es obligatorio').not().isEmpty(),
        check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
        check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
        check('correo', 'El correo es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        check('nombreDeUsuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('fotoDePerfil', 'La foto de perfil es obligatoria').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    // validarJWT, 
    crearUsuario
)

// ----------------------------------------------------- ACTUALIZAR UN USUARIO ----------------------------------------------------------
router.put(
    '/:id', 
    [
        check('ci', 'El ci es obligatorio').not().isEmpty(),
        check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
        check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
        check('correo', 'El correo es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        check('nombreDeUsuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('fotoDePerfil', 'La foto de perfil es obligatoria').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        validarCampos
    ],
    validarJWT, 
    actualizarUsuario
)

// ------------------------------------------------------- ELIMINAR UN USUARIO ----------------------------------------------------------
router.delete('/:id', validarJWT, eliminarUsuario)

module.exports = router