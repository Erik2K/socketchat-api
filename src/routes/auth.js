import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { authMiddleware } from '../middlewares/authorize.js'
import roles from '../../config/roles.js'

export const authRouter = Router()

authRouter.post('/signin', AuthController.signin)
authRouter.post('/signup', AuthController.signup)
authRouter.get('/signout', authMiddleware(roles.USER), AuthController.signout)
authRouter.post('/recover', AuthController.recover)
authRouter.get('/recover/:token', AuthController.checkRecover)
authRouter.put('/recover', AuthController.updatePassword)
