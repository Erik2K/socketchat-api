import express, { json } from 'express'
import 'dotenv/config'
import './config/database.js'
import { userRouter } from './src/routes/users.js'
import { authRouter } from './src/routes/auth.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/users', userRouter)
app.use('/auth', authRouter)

app.listen(process.env.PORT, () => {
  console.info('Server started on ' + process.env.PORT)
})
