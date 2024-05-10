import { connectUsersToRoom } from '../helpers/connectUsersToRoom.js'
import { persistMessage } from '../helpers/persistMessage.js'

export const messageHandler = async function (message) {
  const socket = this

  await connectUsersToRoom(message.room)

  await persistMessage(message)

  socket.broadcast.to(message.room).emit('message', message)

  console.log(message)
}
