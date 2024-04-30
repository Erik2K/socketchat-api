import RoomModel from '../models/room.js'
import ChatModel from '../models/chat.js'

export const findChatsAndCreate = (roomId) => {
  RoomModel.findById(roomId)
    .then(room => {
      
    })
}
