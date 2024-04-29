export const messageHandler = function (msg) {
  const socket = this
  socket.broadcast.to(msg.room).emit('message', msg)
}
