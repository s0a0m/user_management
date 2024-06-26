import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    _id: { type: String, require: true },
    name: { type: String, require: true, minLength: 2, maxLength: 20 },
    surname: { type: String, require: true, minLength: 4, maxLength: 50 },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { _id: false },
)

const userModel = model('user', userSchema)

export default userModel
