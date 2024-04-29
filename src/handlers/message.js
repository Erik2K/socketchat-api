export const messageHandler = function (msg) {
  const socket = this
  console.log(msg)
  socket.to(msg.room).emit('message', msg.body)
}
