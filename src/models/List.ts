import mongoose from 'mongoose'

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  color: {
    type: String,
    required: [true, 'color is required'],
  },
  items: [{ type: mongoose.Types.ObjectId, ref: 'Task', default: [] }],
})

export const List = mongoose.model('List', listSchema)
