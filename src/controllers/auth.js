import UserModel from '../models/user.js'
import { generateToken } from '../helpers/generateToken.js'

export class AuthController {
  static async signin (req, res) {
    const { email, password } = req.body

    UserModel.findOne({ email })
      .then((user) => {
        if (!user) return res.status(404).json('User not found')

        user.comparePassword(password, (err, result) => {
          if (err) return res.status(500).json(err)
          if (!result) return res.status(401).json()

          const token = generateToken({ _id: user._id })

          res
          .cookie('session', token, {
            httpOnly: true,
            secure: process.env.APP_ENV === 'production'
          })
          .status(200)
          .json({
            email: user.email,
            username: user.username
          })
        })
      })
  }

  static async signup (req, res) {
    UserModel.create(req.body)
      .then((user) => {
        const token = generateToken({ _id: user._id })

        res
        .cookie('session', token, {
          httpOnly: true,
          secure: process.env.APP_ENV === 'production'
        })
        .status(201)
        .json({
          email: user.email,
          username: user.username,
          token
        })
      })
      .catch(error => {
        if (error.code === 11000) return res.status(409).json('User already exists')

        console.error(error)
        res.status(500).json(error)
      })
  }

  static async signout (req, res) {
    return res
      .clearCookie('session')
      .status(200)
      .json({message: 'Successfully logged out'})
  }
}
