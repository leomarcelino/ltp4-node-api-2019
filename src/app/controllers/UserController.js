import User from '../models/User'

class UserController {
  async create(req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'E-mail already being used' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }
}

export default new UserController()
