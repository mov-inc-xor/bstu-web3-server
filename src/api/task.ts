import { Request, Response } from 'express'
import { Task } from '../models/Task'
import mongoose from 'mongoose'

const postTask = async (req: Request, res: Response) => {
  const text = req.body.text

  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    text,
  })

  await task
    .save()
    .then(() => res.json(task))
    .catch((e: Error) => res.json({ error: e.message }))
}

const deleteTask = async (req: Request, res: Response) => {
  const id = req.body.id

  await Task.findOneAndDelete({ _id: id })
    .then((task) => res.json(task))
    .catch((e: Error) => res.json({ error: e.message }))
}

export { postTask, deleteTask }
