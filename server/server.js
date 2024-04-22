import express, { json } from 'express'
import { createServer } from 'node:http'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsConfig from '../config/cors.js'
import { router } from '../src/routes/index.js'

// Initialize servers
const app = express()
const server = createServer(app)

// Middlewares
app.use(json())
app.use(cors(corsConfig))
app.use(cookieParser())
app.disable('x-powered-by')
app.use(morgan('dev'))

// Router
app.use('/api', router)

export default server
