import userModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'

const userUpdateEmailController = async (req, res) => {
  const { email, password } = req.body
  const { id } = req

  const userById = await userModel.findById(id).exec()
  if (!userById)
    return res.status(401).send({ errors: ['Usuario no autorizado'] })

  const checkPassword = await compare(password, userById.password)
  if (!checkPassword)
    return res.status(401).send({ errors: ['Credenciales incorrectas'] })

  userById.email = email

  await userById.save()
  return res.send({ errors: ['email del usuario actualizado'] })
}

export default userUpdateEmailController
