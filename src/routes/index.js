import { Router } from 'express'

import { authRouter } from './auth.js'
import { userRouter } from './users.js'

export const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
