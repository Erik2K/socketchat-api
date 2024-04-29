import MessageModel from '../models/message.js'
import ChatModel from '../models/chat.js'
import { verifyToken } from '../helpers/verifyToken.js'

export class MessageController {
  static async create (req, res) {
    const token = req.cookies.session

    const { _id } = verifyToken(token)

    MessageModel.create({ user: _id, ...req.body })
      .then(message => {
        ChatModel.findByIdAndUpdate(message.chat, { $push: { messages: message._id } })
          .then(() => {
            res.status(201).json()
          })
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }
}
