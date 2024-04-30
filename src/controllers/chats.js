import chatModel from '../models/chat.js'
import RoomModel from '../models/room.js'
import UserModel from '../models/user.js'
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

    chatModel.find({ user: _id }, { messages: { $slice: -1 } })
      .populate('messages', 'body user')
      .populate({
        path: 'room',
        populate: {
          path: 'users',
          select: 'username',
          match: { _id: { $nin: _id } }
        }
      })
      .then(chats => {
        res.status(200).json(chats)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static async create (req, res) {
    const token = req.cookies.session
    const users = req.body.users

    if (!users) res.status(400).json()

    const { _id } = verifyToken(token)

    UserModel.find({ email: { $in: users } })
      .then(users => {
        RoomModel.findOne({ users: { $size: users.length + 1, $in: [_id, ...users.map(u => u._id)] } })
          .then(room => {
            if (room) {
              chatModel.create({ user: _id, room: room._id })
                .then(() => {
                  res.status(201).json()
                })
                .catch(error => {
                  return res.status(500).json(error)
                })
            } else {
              RoomModel.create({ users: [_id, ...users.map(u => u._id)] })
                .then((room) => {
                  chatModel.create({ user: _id, room: room._id })
                    .then(() => {
                      res.status(201).json()
                    })
                    .catch(error => {
                      return res.status(500).json(error)
                    })
                })
                .catch(error => {
                  return res.status(500).json(error)
                })
            }
          })
      })
      .catch((error) => {
        return res.status(500).json(error)
      })
  }
}
