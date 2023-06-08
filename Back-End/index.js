// requerimos a express
const express = require('express')
// requerimos dotenv
require('dotenv').config()
// requerimos cors
const cors = require('cors')
// requerimos la funcion de conexion a la bd
const { dbConexion } = require('./database/config')

// crear el servidor express
const app = express()

// base de datos
dbConexion()

// cors
app.use(cors())

// directorio publico
app.use( express.static('public') )

// lectura y parseo del body
app.use( express.json() )

// rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/atenciones', require('./routes/atenciones'))
app.use('/api/estudiantes', require('./routes/estudiantes'))
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/informes', require('./routes/informes'))
app.use('/api/resultados', require('./routes/resultados'))

// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})