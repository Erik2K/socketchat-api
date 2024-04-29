import mongoose, { Schema } from 'mongoose'

const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ],

  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  }
},
{
  timestamps: true
})

export default mongoose.model('Chat', ChatSchema)
