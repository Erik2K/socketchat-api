import io from '../../server/socketServer.js'
import { verifyToken } from './verifyToken.js'

export const findSocket = async (userId) => {
  const sockets = await io.fetchSockets()

  return sockets.find(socket => {
    const decoded = verifyToken(socket.handshake.auth.token)
    return userId === decoded._id
  })
}
