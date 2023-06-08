const { Schema, model } = require('mongoose')

const InformeSchema = Schema({
    fechaYHora: {
        type: String,
        required: true
    },
    idFormDeAtencion: {
        type: Schema.Types.ObjectId,
        ref: 'Atencion',
        required: true
    },
    idUsuarioEncargado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    diagnosticoFinal: {
        type: String,
        required: true
    },
    observacionFinal: {
        type: String,
        required: true
    },
    recomendacionFinal: {
        type: String,
        required: true
    },
    accionFinal: {
        type: String,
        required: true
    },
    idResultadosPP: {
        type: Schema.Types.ObjectId,
        ref: 'Resultado',
        required: true
    }
})

InformeSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Informe', InformeSchema)