import userModel from '#Schemas/user.schema.js'
import { compare, hash } from 'bcrypt'

const userUpdatePasswordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const { id } = req

  const userById = await userModel.findById(id).exec()
  if (!userById) return res.status(401).send('Usuario no autorizado')

  const checkPassword = await compare(oldPassword, userById.password)
  if (!checkPassword) return res.status(401).send('Credenciales incorrectas')
  const hashedPassword = await hash(newPassword, 12)
  userById.password = hashedPassword

  await userById.save()
  return res.send('Contraseña del usuario actualizada')
}

export default userUpdatePasswordController
