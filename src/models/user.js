import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  alias: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

export default mongoose.model('User', UserSchema)
