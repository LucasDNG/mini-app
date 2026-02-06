import express from 'express'
import cors from 'cors'
import { prisma } from '../lib/prisma'

const app = express()

app.use(cors())
app.use(express.json())

// CREATE
app.post('/users', async (req, res) => {
  const { name, email } = req.body as { name: string; email: string }

  const user = await prisma.user.create({
    data: { name, email }
  })

  res.json(user)
})

// READ
app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// UPDATE
app.put('/users/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { name, email } = req.body as { name: string; email: string }

  const user = await prisma.user.update({
    where: { id },
    data: { name, email }
  })

  res.json(user)
})

// DELETE
app.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id)

  await prisma.user.delete({
    where: { id }
  })

  res.json({ ok: true })
})

app.listen(3000, () => {
  console.log('🚀 Backend en http://localhost:3000')
})
