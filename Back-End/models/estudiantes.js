const { Schema, model } = require('mongoose')

const EstudianteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    curso: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    nomPadre: {
        type: String,
        required: true
    },
    nomMadre: {
        type: String,
        required: true
    }
})

EstudianteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Estudiante', EstudianteSchema)