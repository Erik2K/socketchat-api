import { findChatsAndCreate } from '../helpers/findChatsAndCreate.js'

export const messageHandler = function (msg) {
  const socket = this

  findChatsAndCreate(msg.room)

  socket.broadcast.to(msg.room).emit('message', msg)
}
