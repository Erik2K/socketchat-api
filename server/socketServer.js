import server from './server.js';
import { Server } from 'socket.io'
import config from '../config/socket.js'
import { messageHandler } from '../src/handlers/message.js'
import { handshakeHandler } from '../src/handlers/handshake.js'

// Initialize server
const io = new Server(server, config)

// server events
io.on('connection', (socket) => {
  console.log('connected')

  socket.on('disconnect', (reason) => {
    console.log(`client ${socket.client.id} disconnected, reason: ${reason}`)
  })

  handshakeHandler(socket)

  socket.on('message', messageHandler)
})