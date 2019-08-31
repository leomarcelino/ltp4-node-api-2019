import User from '../models/User'

class SessionController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await User.authenticate(email, password)

    if (!user) {
      return res.status(401).json({ error: 'Invalid e-mail or password' })
    }

    return res.json({
      user,
      token: User.createToken(user),
    })
  }
}

export default new SessionController()
