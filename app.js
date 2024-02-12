import express, { json } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { router } from './src/routes/index.js'
import morgan from 'morgan'
import 'dotenv/config'
import './config/database.js'
import { messageHandler } from './src/handlers/message.js'
import { handshakeHandler } from './src/handlers/handshake.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsConfig from './config/cors.js'
import socketConfig from './config/socket.js'

// Initialize servers
const app = express()
const server = createServer(app)
const io = new Server(server, socketConfig)

// Middlewares
app.use(json())
app.use(cors(corsConfig))
app.use(cookieParser())
app.disable('x-powered-by')
app.use(morgan('dev'))

app.use('/api', router)

// Web socket server events
io.on('connection', (socket) => {
  console.log('connected')

  socket.on('disconnect', (reason) => {
    console.log(`client ${socket.client.id} disconnected, reason: ${reason}`)
  })

  handshakeHandler(socket)

  socket.on('message', messageHandler)
})

// Start server
server.listen(process.env.PORT, () => {
  console.info('Server started on ' + process.env.PORT)
})

