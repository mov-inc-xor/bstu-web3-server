import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  passwordHash: {
    type: String,
    required: [true, 'passwordHash is required'],
  },
  desk: { type: mongoose.Types.ObjectId, ref: 'Desk' },
})

export const User = mongoose.model('User', userSchema)