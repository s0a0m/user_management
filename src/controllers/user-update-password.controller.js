import { SALT } from '#Constants/salt.js'
import userModel from '#Schemas/user.schema.js'
import { compare, hash } from 'bcrypt'

const userUpdatePasswordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const { id } = req

  const userById = await userModel.findById(id).exec()
  if (!userById)
    return res.status(401).send({ errors: ['Usuario no autorizado'] })

  const checkPassword = await compare(oldPassword, userById.password)
  if (!checkPassword)
    return res.status(401).send({ errors: ['Credenciales incorrectas'] })
  const hashedPassword = await hash(newPassword, SALT)
  userById.password = hashedPassword

  await userById.save()
  return res.send({ errors: ['Contraseña del usuario actualizada'] })
}

export default userUpdatePasswordController
