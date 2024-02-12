import chatModel from '../models/chat.js'

export class ChatModel {
  static async getAll (req, res) {
    chatModel.find({})
      .then((chats) => {
        res.status(200).json(chats)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }
}
