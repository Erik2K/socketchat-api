import ChatModel from '../models/chat.js'
import RoomModel from '../models/room.js'
import UserModel from '../models/user.js'
import MessageModel from '../models/message.js'
import { verifyToken } from '../helpers/verifyToken.js'

export class ChatController {
  static async getAll (req, res) {
    ChatModel.find({})
      .then((chats) => {
        res.status(200).json(chats)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static async getById (req, res) {
    const { id } = req.params
    ChatModel.findById(id)
      .select('_id room')
      .populate({
        path: 'messages',
        select: 'body user',
        populate: {
          path: 'user',
          select: 'username'
        }
      })
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

    ChatModel.find({ user: _id })
      .select('messages room')
      .slice('messages', -1)
      .sort('-updatedAt')
      .populate({
        path: 'messages',
        select: 'body user',
        populate: {
          path: 'user',
          select: 'username'
        }
      })
      .populate({
        path: 'room',
        select: 'users',
        populate: {
          path: 'users',
          select: 'username',
          match: { _id: { $nin: _id } }
        }
      })
      .then(async chats => {
        const result = await Promise.all(
          chats.map(async (chat) => {
            const count = await MessageModel.countDocuments({
              chat: chat._id,
              status: 'not-readed',
              user: { $ne: _id }
            })

            return {
              _id: chat._id,
              messages: chat.messages,
              room: chat.room,
              unreaded: count
            }
          })
        )

        res.status(200).json(result)
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
        RoomModel.findOne({ users: [_id, ...users.map(u => u._id)] })
          .then(room => {
            if (room) {
              ChatModel.findOneAndUpdate(
                { user: _id, room: room._id },
                {},
                { upsert: true, new: true }
              )
                .then((chat) => {
                  res.status(201).json({
                    _id: chat._id
                  })
                })
                .catch(error => {
                  return res.status(500).json(error)
                })
            } else {
              RoomModel.create({ users: [_id, ...users.map(u => u._id)] })
                .then((room) => {
                  ChatModel.findOneAndUpdate(
                    { user: _id, room: room._id },
                    {},
                    { upsert: true, new: true }
                  )
                    .then((chat) => {
                      res.status(201).json({
                        _id: chat._id
                      })
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

  static async markReaded (req, res) {
    const { id } = req.params

    MessageModel.updateMany(
      { chat: id, status: 'not-readed' },
      { status: 'readed' }
    )
      .then(() => {
        return res.status(200).json()
      })
      .catch((error) => {
        return res.status(500).json(error)
      })
  }
}
