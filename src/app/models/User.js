import moongose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

const UserSchema = moongose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.statics = {
  async authenticate(email, password) {
    const user = await this.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
  },

  createToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    })
  },
}

export default moongose.model('User', UserSchema)
