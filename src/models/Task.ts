import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'text is required'],
  },
})

export const Task = mongoose.model('Task', taskSchema)
