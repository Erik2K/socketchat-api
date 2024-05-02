import { connectUsersToRoom } from '../helpers/connectUsersToRoom.js'
import { persistMessage } from '../helpers/persistMessage.js'

export const messageHandler = async function (message) {
  const socket = this

  console.log(message)

  await connectUsersToRoom(message.room, message.email)

  await persistMessage(message)

  socket.broadcast.to(message.room).emit('message', message)
}
