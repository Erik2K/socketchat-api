import RoomModel from '../models/room'
import ChatModel from '../models/chat'

export const findChatsAndCreate = (roomId) => {
  RoomModel.findById(roomId)
    .then(room => {
      
    })
}
