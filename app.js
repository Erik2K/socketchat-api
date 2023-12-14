import express, { json } from 'express'
import 'dotenv/config'
import './config/database.js'
import { userRouter } from './src/routes/user.routes.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
  console.log('Server started on ' + process.env.PORT)
})
