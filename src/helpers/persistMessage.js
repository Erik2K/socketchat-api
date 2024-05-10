import RoomModel from '../models/room.js'
import ChatModel from '../models/chat.js'
import MessageModel from '../models/message.js'

export const persistMessage = async (message) => {
  const room = await RoomModel.findById(message.room)
    .populate('users')
  if (room) {
    for (const user of room.users) {
      const chat = await ChatModel.findOneAndUpdate(
        { user: user._id, room: message.room },
        { user: user._id, room: message.room },
        { upsert: true, new: true }
      )

      const newMessage = await MessageModel.create({
        body: message.body,
        user: message.user,
        chat: chat._id
      })

      chat.messages.push(newMessage._id)
      await chat.save()
    }
  }
}
