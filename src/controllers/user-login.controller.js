import userModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'

const userLoginController = async (req, res) => {
  const { email, password } = req.body

  const userByEmail = await userModel.findOne({ email }).exec()
  if (!userByEmail) return res.status(401).send('Credenciales incorrectas')

  const checkPassword = await compare(password, userByEmail.password)
  if (!checkPassword) return res.status(401).send('Credenciales incorrectas')

  const jwtConstructor = new SignJWT({ id: userByEmail._id })
  const encoder = new TextEncoder()
  const jwt = await jwtConstructor
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))
  return res.send({ token: jwt })
}

export default userLoginController
