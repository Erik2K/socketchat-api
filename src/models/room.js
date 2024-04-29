import mongoose, { Schema } from 'mongoose'

const RoomSchema = new Schema({
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ]
},
{
  timestamps: true
})

export default mongoose.model('Room', RoomSchema)
