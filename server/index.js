import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(express.json())


import { createConnection, crearTabla, conexmongo } from './database.js'


//****************    RUTAS PARA MYSQL *********************************************** */
app.get('/check-mysql-connection', async (_req, res) => {
  await crearTabla()

  console.log(process.env.DATABASE_HOST)

  const ejecutadorConexion = createConnection()

  ejecutadorConexion.query('SELECT * FROM personas', (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error al obtener los datos de las personas'
      })
    }

    res.json(result)
  })
})

app.post('/check-mysql-connection', async (req, res) => {
  await crearTabla()
  const { nombres, nro_exp } = req.body
  const ejecutadorConexion = createConnection()

  ejecutadorConexion.query('INSERT INTO personas SET ?', { nombres, nro_exp }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Error al insertar los datos de la persona'
      })
    }

    res.json({
      message: 'La persona fue insertada correctamente a nuestra base de datos'
    })
  })
})

//***********************   RUTA PARA MONGO   ************************************* */

app.get('/check-mongodb-connection', async (_req, res) => {
  await conexmongo()
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
  } catch (error) {
    
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`)
})
