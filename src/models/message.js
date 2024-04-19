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
  }
},
{
  timestamps: true
})

export default mongoose.model('Message', MessageSchema)
