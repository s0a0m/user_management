import userModel from '#Schemas/user.schema.js'

const userUpdateDataController = async (req, res) => {
  const { name, surname } = req.body
  const { id } = req

  const userById = await userModel.findById(id).exec()
  if (!userById)
    return res.status(401).send({ errors: ['Usuario no autorizado'] })

  userById.name = name
  userById.surname = surname
  await userById.save()
  return res.send({ errors: ['Usuario actualizado'] })
}

export default userUpdateDataController
