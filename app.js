import server from './server/server.js'
import './server/socketServer.js'
import './server/database.js'

// Start server
server.listen(process.env.PORT, () => {
  console.info('Server started on ' + process.env.PORT)
})

