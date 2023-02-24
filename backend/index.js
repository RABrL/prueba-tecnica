import express from 'express'
import { clientsAPI } from './src/clients/index.js'
import cors from 'cors'
import { Config } from './src/config/index.js'
import { creditsAPI } from './src/credits/index.js'

const app = express()

app.use(express.json())

app.use(cors({
  origin: '*'
}))

// modulos
clientsAPI(app)
creditsAPI(app)

app.listen(Config.port, () => {
  console.log(`Servidor escuchando en http://localhost:${Config.port}`)
})
