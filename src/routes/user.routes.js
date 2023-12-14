import { Router } from 'express'

import { UserController } from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.get('/', UserController.getAll)
userRouter.post('/', UserController.create)

userRouter.get('/:id', UserController.getById)
userRouter.delete('/:id', UserController.delete)
