import moongose from 'mongoose'

const CreditCardSchema = moongose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
      default: 0.0,
    },
    closing_day: {
      type: Number,
      required: true,
      default: 1,
    },
    payment_day: {
      type: Number,
      required: true,
      default: 1,
    },
    associated_account: {
      type: moongose.SchemaTypes.ObjectId,
      ref: 'Account',
    },
    user: {
      type: moongose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

export default moongose.model('CreditCard', CreditCardSchema)
