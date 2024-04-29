import chatModel from '../models/chat.js'
import { verifyToken } from '../helpers/verifyToken.js'

export class ChatController {
  static async getAll (req, res) {
    chatModel.find({})
      .then((chats) => {
        res.status(200).json(chats)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static async getById (req, res) {
    const { id } = req.params
    chatModel.findById(id)
      .then((chat) => {
        if (!chat) return res.status(404).json('Chat not found')

        res.status(200).json(chat)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static async getPreview (req, res) {
    const token = req.cookies.session

    const { _id } = verifyToken(token)

    chatModel.find({ user: _id }, { messages: { $slice: -1 } }).populate('messages')
      .then(chats => {
        res.status(200).json(chats)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static async create (req, res) {
    const token = req.cookies.session

    const { _id } = verifyToken(token)

    chatModel.create({ user: _id, ...req.body })
      .then(chat => {
        res.status(201).json()
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }
}
