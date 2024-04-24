export const messageHandler = function (msg) {
  const socket = this
  socket.broadcast.emit('message', msg)
  console.log({ socket: socket.id, msg })
}
