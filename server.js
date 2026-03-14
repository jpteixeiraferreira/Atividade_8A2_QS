import express from 'express'
import cors from 'cors'

import { getAllUsers, createUser } from './src/controllers/userController.js'

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/api/users', getAllUsers)

app.post('/api/users', createUser)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
