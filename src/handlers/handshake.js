import { verifyToken } from '../helpers/verifyToken.js'

export const handshakeHandler = (socket) => {
  const decoded = verifyToken(socket.handshake.auth.token)

  if (!decoded) {
    console.log({ socket: socket.id, connected: false, reason: 'unathorized' })
    socket.disconnect()
  }

  socket.decoded = decoded
}
