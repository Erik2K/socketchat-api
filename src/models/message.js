import mongoose, { Schema } from 'mongoose'

const MessageSchema = new Schema({
  body: {
    type: String,
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },

  status: {
    type: String,
    enum: ['not-readed', 'readed'],
    default: 'not-readed'
  }
},
{
  timestamps: true
})

export default mongoose.model('Message', MessageSchema)
