import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import {
  _idDtoSchema,
  nameDtoSchema,
  surnameDtoSchema,
  emailDtoSchema,
  passwordDtoSchema,
} from '#Lib/dto-types.js'

const registerDTOSchema = new Type.Object(
  {
    _id: _idDtoSchema,
    name: nameDtoSchema,
    surname: surnameDtoSchema,
    email: emailDtoSchema,
    password: passwordDtoSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'El formato del objeto no es valido',
    },
  },
)

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
