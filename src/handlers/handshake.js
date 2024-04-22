import { verifyToken } from '../helpers/verifyToken.js'

export const handshakeHandler = (socket) => {
  const decoded = verifyToken(socket.handshake.auth.token)

  if (!decoded) {
    socket.disconnect()
  }

  socket.decoded = decoded
}
