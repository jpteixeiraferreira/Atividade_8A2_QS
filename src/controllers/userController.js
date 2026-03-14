import { users } from '../data/data.js'

export function getAllUsers (req, res) {
  res.json(users)
}

export function createUser (req, res) {
  const { name, email, age } = req.body

  if (!name || !email) {
    return res.status(400).json({
      message: 'Nome e email são obrigatórios'
    })
  }

  const emailExists = users.find(user => user.email === email)

  if (emailExists) {
    return res.status(400).json({
      message: 'Email já cadastrado'
    })
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    age
  }

  users.push(newUser)

  res.status(201).json(newUser)
}
