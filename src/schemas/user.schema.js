import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  _id: { String, _id: false, unique: true },
  name: { type: String, require: true, minLength: 2, maxLength: 20 },
  surname: { type: String, require: true, minLength: 4, maxLength: 50 },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
})

const userModel = model('user', userSchema)

export default userModel
