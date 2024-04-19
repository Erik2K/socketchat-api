import mongoose from 'mongoose'

mongoose.connect(process.env.DATABASE_URI)
  .then(() => {
    console.info('Database connection stablished')
  })
  .catch(err => {
    console.error(err)
  })
