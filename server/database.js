import mysql2 from 'mysql2'
import { connect } from 'mongoose';


function createConnection () {
  const connection = mysql2.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'judicial'
  })

  return connection
}

async function crearTabla () {
  const sql = `
    CREATE TABLE IF NOT EXISTS personas (
      id INT NOT NULL AUTO_INCREMENT,
      nombres VARCHAR(100) NOT NULL,
      nro_exp FLOAT NOT NULL,
      PRIMARY KEY (id)
    )
  `
  const ejecutadorConexion = createConnection()
  return await ejecutadorConexion.promise().query(sql)
}

const conexmongo = ()=> {
  try {
      connect(process.env.MONGO_DB_URI);
      console.log('Conectado a la BD');
  } catch (error) {
      console.log('Error al conectar la BD');
      console.log(error.message);
  }
}

export { createConnection, crearTabla, conexmongo }
