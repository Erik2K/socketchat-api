import { Router } from 'express'
import { ChatController } from '../controllers/chats.js'
import { authMiddleware } from '../middlewares/authorize.js'
import roles from '../../config/roles.js'

export const chatRouter = Router()

chatRouter.get('/', authMiddleware(roles.ADMIN), ChatController.getAll)
chatRouter.get('/:id', authMiddleware(roles.USER, true), ChatController.getById)
chatRouter.get('/preview/me', authMiddleware(roles.USER), ChatController.getPreview)
chatRouter.post('/', authMiddleware(roles.USER, true), ChatController.create)
