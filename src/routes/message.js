import { Router } from 'express'
import { authMiddleware } from '../middlewares/authorize.js'
import roles from '../../config/roles.js'
import { MessageController } from '../controllers/messages.js'

export const MessageRouter = Router()

MessageRouter.post('/', authMiddleware(roles.USER), MessageController.create)
