import { Router } from 'express'
import { UserController } from '../controllers/users.js'
import { authMiddleware } from '../middlewares/authorize.js'
import roles from '../../config/roles.js'

export const userRouter = Router()

userRouter.get('/', authMiddleware(roles.ADMIN), UserController.getAll)
userRouter.post('/', authMiddleware(roles.ADMIN), UserController.create)
userRouter.get('/:userId', authMiddleware(roles.USER), UserController.getById)
userRouter.delete('/:userId', authMiddleware(roles.USER, true), UserController.delete)
