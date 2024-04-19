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

  messagees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
},
{
  timestamps: true
})

export default mongoose.model('Chat', ChatSchema)
