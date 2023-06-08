const { Schema, model } = require('mongoose')

const ResultadoSchema = Schema({
    fechaYHora: {
        type: String,
        required: true
    },
    idFormDeAtencion: {
        type: Schema.Types.ObjectId,
        ref: 'Atencion',
        required: true
    },
    resultadoUno: {
        type: Array,
        required: true
    },
    resultadoDos: {
        type: Array,
        required: true
    },
    resultadoTres: {
        type: Array,
        required: true
    },
    resultadoCuatro: {
        type: Array,
        required: true
    }
})

ResultadoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Resultado', ResultadoSchema)