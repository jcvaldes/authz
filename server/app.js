import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import db from './models'
import apiRoutes from './api/api.routes'
const dotenv = require('dotenv').config({ path: path.join(__dirname, './', '/.env') }).parsed

const app = express()

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const node_env = process.env.NODE_ENV || 'development'
const port = +process.env.PORT || +dotenv.PORT

//cors
app.use(cors())

if(node_env === 'development') {
    morgan(':method :url :status :res[content-length] - :response-time ms')
}

app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.send('API!')
})

//Conexion a DB por Sequelize
db.sequelize
  .sync()
  .then((data) => {
    console.log('DB connection has been established successfully: \x1b[32m%s\x1b[0m', 'online');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const server = app.listen(port, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log(
      `Express server corriendo en el port ${port}: \x1b[32m%s\x1b[0m`,
      'online'
    )
  }
})
