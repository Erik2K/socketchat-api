import mongoose, { Schema } from 'mongoose'

const RoomSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
{
  timestamps: true
})

export default mongoose.model('Room', RoomSchema)
