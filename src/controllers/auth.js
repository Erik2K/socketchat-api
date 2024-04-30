import UserModel from '../models/user.js'
import RecoveryModel from '../models/recovery.js'
import { generateToken } from '../helpers/generateToken.js'
import { sendMail } from '../helpers/sendMail.js'
import { verifyToken } from '../helpers/verifyToken.js'

export class AuthController {
  static async me (req, res) {
    const token = req.cookies.session

    const { _id } = verifyToken(token)

    UserModel.findById(_id)
      .then((user) => {
        if (!user) return res.status(404).json('User not found')

        res.status(200).json({
          _id: user._id,
          email: user.email,
          username: user.username
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

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

        sendMail([user.email], 'Welcome', `Hi ${user.username}, Welcome to SocketChat!`)

        res
          .cookie('session', token, {
            secure: process.env.APP_ENV === 'production'
          })
          .status(201)
          .json({
            email: user.email,
            username: user.username
          })
      })
      .catch(error => {
        if (error.code === 11000) return res.status(409).json('User already exists')

        res.status(500).json(error)
      })
  }

  static async signout (req, res) {
    return res
      .clearCookie('session')
      .status(200)
      .json({ message: 'Successfully logged out' })
  }

  static async recover (req, res) {
    const { email } = req.body

    UserModel.findOne({ email })
      .then((user) => {
        if (!user) return res.status(404).json('User not found')

        RecoveryModel.deleteMany({ user: user._id })
          .then(() => {
            RecoveryModel.create({ user: user._id })
              .then((recovery) => {
                console.log(recovery)
                const { WEB_URL } = process.env

                sendMail(
                  [user.email],
                  'Recover password',
                  `Hi ${user.username},<br><br>To reset your password click the link below<br><br>${WEB_URL}/auth/recover/${recovery.token}`
                )

                return res.status(201).json()
              })
          })
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static async checkRecover (req, res) {
    const { token } = req.params

    if (!token) return res.status(404).json()

    RecoveryModel.findOne({ token })
      .then((recovery) => {
        if (!recovery) return res.status(404).json('Recovery token not found')

        UserModel.findOne({ _id: recovery.user })
          .then((user) => {
            if (!user) return res.status(404).json('Uer associated to the recovery token not found')

            res
              .status(200)
              .json({ email: user.email })
          })
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }

  static async updatePassword (req, res) {
    const { token, password } = req.body

    if (!token || !password) return res.status(400).json()

    RecoveryModel.findOne({ token })
      .then((recovery) => {
        if (!recovery) return res.status(404).json('Recovery token not found')

        UserModel.findOneAndUpdate({ _id: recovery.user }, { password })
          .then(user => {
            if (!user) return res.status(404).json('User not found')

            RecoveryModel.deleteOne({ _id: recovery._id })
              .then(() => {
                sendMail(
                  [user.email],
                  'Password updated',
                  `Hi ${user.username},<br><br> your password has been updated`
                )

                return res.status(200).json()
              })
          })
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }
}
