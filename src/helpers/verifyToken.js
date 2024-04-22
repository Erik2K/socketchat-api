import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
  if (!token) return false

  return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return false

    return decoded
  })
}
