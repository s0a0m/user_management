import { SALT } from '#Constants/salt.js'
import userModel from '#Schemas/user.schema.js'
import { hash } from 'bcrypt'

const userRegisterController = async (req, res) => {
  const { _id, name, surname, email, password } = req.body

  const userById = await userModel.findById(_id).exec()
  if (userById)
    return res
      .status(409)
      .send({ errors: ['Ya existe un usuario con ese id registrado'] })

  const userByEmail = await userModel.findOne({ email }).exec()
  if (userByEmail)
    return res
      .status(409)
      .send({ errors: ['Ya existe un usuario con email registrado'] })

  const hashedPassword = await hash(password, SALT)
  const user = new userModel({
    _id,
    name,
    surname,
    email,
    password: hashedPassword,
  })
  await user.save()
  return res.status(201).send({ errors: ['Usuario registrado con exito'] })
}

export default userRegisterController
