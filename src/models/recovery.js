import mongoose, { Schema } from 'mongoose'
import crypto from 'node:crypto'

const RecoverySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },

  token: {
    type: String,
    default: '',
    expires: 10

  },

  createdAt: {
    type: Date,
    expires: 3600
  }
}, {
  timestamps: true
})

RecoverySchema.pre('save', function (next) {
  this.token = crypto.randomBytes(32).toString('hex')
  this.createdAt = Date.now()
  return next()
})

export default mongoose.model('Recovery', RecoverySchema)
