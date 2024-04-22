export const messageHandler = function (msg) {
  const socket = this
  console.log(`${socket.client.id}: ${msg}`)
}
