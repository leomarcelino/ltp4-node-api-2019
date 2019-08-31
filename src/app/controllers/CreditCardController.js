import CreditCard from '../models/CreditCard'

class CreditCardController {
  async create(req, res) {
    const { loggedUser } = req

    const creditCard = await CreditCard.create({
      ...req.body,
      user: loggedUser._id,
    })

    return res.json(creditCard)
  }

  async list(req, res) {
    const { loggedUser: user } = req

    const creditCards = await CreditCard.find({ user }).populate(
      'associated_account'
    )

    return res.json(creditCards)
  }

  async find(req, res) {
    const { loggedUser } = req
    const { id } = req.params

    const creditCard = await CreditCard.findById(id).populate(
      'associated_account'
    )

    if (!creditCard) {
      return res.status(404).json({ message: 'Credit Card not found' })
    } else if (!creditCard.user.equals(loggedUser._id)) {
      return res
        .status(403)
        .json({ error: 'Your are not authorized to access this record' })
    }

    return res.json(creditCard)
  }

  async update(req, res) {
    const { loggedUser } = req
    const { id } = req.params

    let creditCard = await CreditCard.findById(id)

    if (!creditCard) {
      return res.status(404).json({ message: 'Record not found' })
    } else if (!creditCard.user.equals(loggedUser._id)) {
      return res
        .status(403)
        .json({ error: 'Your are not authorized to access this record' })
    }

    creditCard = await CreditCard.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    return res.json(creditCard)
  }

  async destroy(req, res) {
    const { loggedUser } = req
    const { id } = req.params

    let creditCard = await CreditCard.findById(id)

    if (!creditCard) {
      return res.status(404).json({ message: 'Record not found' })
    } else if (!creditCard.user.equals(loggedUser._id)) {
      return res
        .status(403)
        .json({ error: 'Your are not authorized to access this record' })
    }

    creditCard = await CreditCard.findByIdAndDelete(id)

    return res.json({ message: 'Record has been deleted', creditCard })
  }
}

export default new CreditCardController()
