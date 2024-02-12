import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModel from '../models/user.js'

export const authMiddleware = (role) => {
  return (req, res, next) => {
    const token = req.cookies.session;

    if (!token) return res.status(401).json({ error: 'Access denied' })

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' })

      userModel.findOne({ _id: decoded._id })
        .then((user) => {
          if (!role.includes(user?.role)) return res.status(401).json({ error: 'Access denied' })

          next()
        })
        .catch((err) => {
          console.error(err)
          res.status(500).json(err)
        })
    })
  }
}
