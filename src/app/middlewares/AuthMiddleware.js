import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import User from '../models/User'

import authConfig from '../../config/auth'

export default async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authorization.split(' ')

  try {
    const payload = await promisify(jwt.verify)(token, authConfig.secret)

    req.loggedUser = await User.findById(payload.id)

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
