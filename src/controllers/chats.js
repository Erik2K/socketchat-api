import chatModel from '../models/chat.js'

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

  static async create (req, res) {
    chatModel.create(req.body)
      .then(chat => {
        res.status(201).json()
      })
      .catch(error => {
        return res.status(500).json(error)
      })
  }
}
