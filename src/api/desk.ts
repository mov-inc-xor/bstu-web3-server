import { Request, Response } from 'express'
import { Desk } from '../models/Desk'
import { User } from '../models/User'

const getDesk = async (req: Request, res: Response) => {
  const userId = req.body.userId

  const user = await User.findById(userId)
  const deskId = user.desk
  const desk = await Desk.findById(deskId)

  return desk
}

export { getDesk }
