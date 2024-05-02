import RoomModel from '../models/room.js'
import { findSocket } from './findSocket.js'
import io from '../../server/socketServer.js'

export const connectUsersToRoom = async (roomId, sender) => {
  const room = await RoomModel.findById(roomId)
    .populate('users')
  if (room) {
    for (const user of room.users) {
      if (user.email !== sender) {
        const socket = await findSocket(user._id.toString())
        if (socket) {
          const roomSockets = await io.in(roomId).fetchSockets()
          if (!roomSockets.includes(socket)) {
            socket.join(roomId)
          }
        }
      }
    }
  }
}
