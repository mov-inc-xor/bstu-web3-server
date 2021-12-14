import { Request, Response } from 'express'
import { List } from '../models/List'
import mongoose from 'mongoose'
import { Task } from '../models/Task'

const postList = async (req: Request, res: Response) => {
  const title = req.body.title

  const colors = ['#caedd2', 'rgb(237 207 202)', 'rgb(255, 236, 170)', 'rgb(202 231 237)', 'rgb(204 202 237)', 'rgb(237 202 234)', 'rgb(237 202 202)']
  const colorIdx = Math.floor(Math.random() * colors.length)

  const list = new List({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    color: colors[colorIdx],
    items: [],
  })

  await list
    .save()
    .then(() => res.json(list))
    .catch((e: Error) => res.json({ error: e.message }))
}

const addTask = async (req: Request, res: Response) => {
  const listId = req.body.listId
  const taskId = req.body.taskId

  await List.updateOne({ _id: listId }, { $push: { items: taskId } })
    .then((result) => res.json(result))
    .catch((e: Error) => res.json({ error: e.message }))
}

const putList = async (req: Request, res: Response) => {
  const listId = req.body.listId
  const title = req.body.title

  await List.updateOne({ _id: listId }, { $set: { title } })
    .then((result) => res.json(result))
    .catch((e: Error) => res.json({ error: e.message }))
}

const deleteList = async (req: Request, res: Response) => {
  const listId = req.body.listId

  await List.deleteOne({ _id: listId })
    .then((result) => res.json(result))
    .catch((e: Error) => res.json({ error: e.message }))
}

export { postList, putList, deleteList }
