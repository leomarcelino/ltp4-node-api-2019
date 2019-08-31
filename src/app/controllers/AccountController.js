import Account from '../models/Account'

class AccountController {
  async create(req, res) {
    const { loggedUser } = req

    const account = await Account.create({
      ...req.body,
      user: loggedUser._id,
    })

    return res.json(account)
  }

  async list(req, res) {
    const { loggedUser: user } = req

    const accounts = await Account.find({ user })

    return res.json(accounts)
  }

  async find(req, res) {
    const { loggedUser } = req
    const { id } = req.params

    const account = await Account.findById(id)

    if (!account) {
      return res.status(404).json({ message: 'Record not found' })
    } else if (!account.user.equals(loggedUser._id)) {
      return res
        .status(403)
        .json({ error: 'Your are not authorized to access this record' })
    }

    return res.json(account)
  }

  async update(req, res) {
    const { loggedUser } = req
    const { id } = req.params

    let account = await Account.findById(id)

    if (!account) {
      return res.status(404).json({ message: 'Record not found' })
    } else if (!account.user.equals(loggedUser._id)) {
      return res
        .status(403)
        .json({ error: 'Your are not authorized to access this record' })
    }

    account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    return res.json(account)
  }

  async destroy(req, res) {
    const { loggedUser } = req
    const { id } = req.params

    let account = await Account.findById(id)

    if (!account) {
      return res.status(404).json({ message: 'Record not found' })
    } else if (!account.user.equals(loggedUser._id)) {
      return res
        .status(403)
        .json({ error: 'Your are not authorized to access this record' })
    }

    account = await Account.findByIdAndDelete(id)

    return res.json({ message: 'Record has been deleted', account })
  }
}

export default new AccountController()
