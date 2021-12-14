import mongoose from 'mongoose'

const deskSchema = new mongoose.Schema({
  items: [{ type: mongoose.Types.ObjectId, ref: 'List', default: [] }],
})

export const Desk = mongoose.model('Desk', deskSchema)
