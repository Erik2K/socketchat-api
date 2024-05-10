import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import roles from '../../config/roles.js'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      },
      message: 'Invalid email address format'
    }
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: roles.DEFAULT
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

UserSchema.pre('findOneAndUpdate', function (next) {
  if (this._update.password) {
    bcrypt.hash(this._update.password, parseInt(process.env.SALT_WORK_FACTOR), (err, hash) => {
      if (err) return next(err)

      this._update.password = hash
      next()
    })
  }
})

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, result) {
    if (err) return callback(err)

    callback(null, result)
  })
}

export default mongoose.model('User', UserSchema)
