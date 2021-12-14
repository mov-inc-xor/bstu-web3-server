import express from 'express'
import cors from 'cors'
import jwt from 'express-jwt'
import { getDesk } from './api/desk'
import { deleteList, postList, putList } from './api/list'
import { deleteTask, postTask } from './api/task'
import { register, signin } from './api/user'
import settings from './settings'
import mongoose from 'mongoose'

const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(
  jwt({
    secret: settings.secretKey,
    algorithms: [settings.algorithm],
  }).unless({ path: ['/register', '/signin'] })
)

// USER
app.post('/register', register)
app.post('/signin', signin)

// DESK
app.get('/desk', getDesk)

// LIST
app.post('/list', postList)
app.put('/list', putList)
app.delete('/list', deleteList)

// TASK
app.post('/task', postTask)
app.delete('/task', deleteTask)

mongoose.connect(settings.mongoDbConnection).then(() =>
  app.listen(settings.port, () => {
    console.log(`Listening at http://localhost:${settings.port}`)
  })
)
