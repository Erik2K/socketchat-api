import { Router } from 'express'

import { authRouter } from './auth.js'
import { userRouter } from './users.js'
import { chatRouter } from './chat.js'
import { MessageRouter } from './message.js'

export const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/chats', chatRouter)
router.use('/messages', MessageRouter)
