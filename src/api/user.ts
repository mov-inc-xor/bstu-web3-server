import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { Desk } from '../models/Desk'
import { User } from '../models/User'
import settings from '../settings'

const register = async (req: Request, res: Response) => {
  const email = req.body.email
  const passwordHash = req.body.passwordHash

  const deskId = new mongoose.Types.ObjectId()

  const desk = new Desk({
    _id: deskId,
    items: [],
  })

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    passwordHash,
    desk: deskId,
  })

  const token = jwt.sign({ email }, settings.secretKey, { algorithm: settings.algorithm })

  await desk
    .save()
    .then(() => user.save())
    .then(() =>
      res.json({
        token,
      })
    )
    .catch((e: Error) => res.json({ error: e.message }))
}

const signin = async (req: Request, res: Response) => {
  const email = req.body.email
  const passwordHash = req.body.passwordHash

  const user = await User.findOne({email, passwordHash})

  if (!user) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }

  const token = jwt.sign({ email }, settings.secretKey, { algorithm: settings.algorithm })

  res.json({
    token,
  })
}

export { register, signin }
