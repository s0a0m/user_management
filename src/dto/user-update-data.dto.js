import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import {
  _idDtoSchema,
  nameDtoSchema,
  surnameDtoSchema,
} from '#Lib/dto-types.js'

const userUpdateDataDTOSchema = new Type.Object(
  {
    name: nameDtoSchema,
    surname: surnameDtoSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'El formato del objeto no es valido',
    },
  },
)

const ajv = new Ajv({ allErrors: true })
  .addKeyword('kind')
  .addKeyword('modifier')

addErrors(ajv)

const validateSchema = ajv.compile(userUpdateDataDTOSchema)

const userUpdateDataDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body)
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) })
  next()
}

export default userUpdateDataDTO
