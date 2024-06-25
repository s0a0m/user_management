import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'

const registerDTOSchema = new Type.Object({
  _id: Type.String({
    format: 'uuid',
    errorMessage: {
      type: 'El tipo _id no es valido, debe ser un string',
      format: 'El fomato de _id no es valido, debe ser un uuidv4',
    },
  }),
  name: Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
      minLength: 'El nombre debe tener como minimo 2 caracteres de longitud',
      maxLength: 'El nombre debe tener como maximo 20 caracteres de longitud',
    },
  }),
  surname: Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
      minLength: 'El nombre debe tener como minimo 4 caracteres de longitud',
      maxLength: 'El nombre debe tener como maximo 50 caracteres de longitud',
    },
  }),
  email: Type.String({
    format: 'email',
    errorMessage: {
      type: 'El tipo del email no es valido',
      format: 'El fomato del email no es valido, debe cumplir el RFC 5322',
    },
  }),
  password: Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,
    errorMessage: {
      minLength:
        'La contraseña debe tener como minimo 10 caracteres de longitud',
      maxLength:
        'La contraseña debe tener como maximo 25 caracteres de longitud',
      type: 'El tipo de la contraseña no es valido',
      format:
        'El fomato de la contraseña no es valido, debe contener una mayuscula, una minuscula y un numero.',
    },
  }),
})

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier')

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)

addErrors(ajv)

const validateSchema = ajv.compile(registerDTOSchema)

const userRegisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body)
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) })
  next()
}

export default userRegisterDTO
