import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import roles from '../../config/roles.js'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  roles: {
    type: [String],
    default: [roles.USER]
  }
},
{
  timestamps: true
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.hash(this.password, parseInt(process.env.SALT_WORK_FACTOR), (err, hash) => {
    if (err) return next(err)

    this.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, result) {
    if (err) return callback(err)

    callback(null, result)
  })
}

export default mongoose.model('User', UserSchema)
