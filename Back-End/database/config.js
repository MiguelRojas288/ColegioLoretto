const mongoose = require('mongoose')

const dbConexion = async () =>  {
    try {
        await mongoose.connect( process.env.DB_CONEXION, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        })

        console.log('Base de Datos en linea')

    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar a la Base de Datos')
    }
}

module.exports = {
    dbConexion
}