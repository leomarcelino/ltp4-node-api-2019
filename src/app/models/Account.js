import moongose from 'mongoose'

const AccountSchema = moongose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    initial_balance: {
      type: Number,
      required: true,
      default: 0.0,
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

export default moongose.model('Account', AccountSchema)
