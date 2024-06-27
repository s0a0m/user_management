import userModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'

const userUnregisterController = async (req, res) => {
  const { password } = req.body
  const { id } = req

  const userById = await userModel.findById(id).exec()
  if (!userById) return res.status(401).send('Usuario no autorizado')

  const checkPassword = await compare(password, userById.password)
  if (!checkPassword) return res.status(401).send('Credenciales incorrectas')

  await userById.deleteOne({ _id: id })
  return res.send('usuario eliminado')
}

export default userUnregisterController
