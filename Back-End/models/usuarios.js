const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    ci: {
        type: String,
        required: true,
        unique: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    nombreDeUsuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fotoDePerfil: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
})

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Usuario', UsuarioSchema)