import { Router } from 'express'
import { UserController } from '../controllers/users.js'
import { authMiddleware } from '../middlewares/authorize.js'
import roles from '../../config/roles.js'

export const userRouter = Router()

userRouter.get('/', authMiddleware(roles.ADMIN), UserController.getAll)
userRouter.post('/', authMiddleware(roles.ADMIN), UserController.create)

userRouter.get('/:id', authMiddleware(roles.ADMIN), UserController.getById)
userRouter.delete('/:id', authMiddleware(roles.ADMIN), UserController.delete)
