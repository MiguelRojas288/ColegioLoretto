// rutas de usuarios / auth 
// host + /api/auth

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const { loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validarJWT')

const router = Router()


// login de usuarios    
router.post(
    '/', 
    // middlawares
    [
        check('nombreDeUsuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router