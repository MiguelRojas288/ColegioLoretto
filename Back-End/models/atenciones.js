const { Schema, model } = require('mongoose')

const AtencionSchema = Schema({
    fechaYHora: {
        type: String,
        required: true
    },
    idUsuarioEncargado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    pasoPorEnfermeria: {
        type: String,
        required: true
    },
    diagnosticoDeEnfermeria: {
        type: String,
        required: true
    },
    motivoDeAtencion: {
        type: String,
        required: true
    },
    idEstudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    },
    // nombre: {
    //     type: String,
    //     required: true
    // },
    // curso: {
    //     type: String,
    //     required: true
    // },
    // edad: {
    //     type: Number,
    //     required: true
    // },
    // sexo: {
    //     type: String,
    //     required: true
    // },
    // nomPadre: {
    //     type: String,
    //     required: true
    // },
    // nomMadre: {
    //     type: String,
    //     required: true
    // },
    preDiagnostico: {
        type: String,
        required: true
    },
    recomendaciones: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
        required: true
    },
    usoDePruProy: {
        type: String,
        required: true
    }
})

AtencionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Atencion', AtencionSchema)