import userModel from '#Schemas/user.schema.js'

const userProfileController = async (req, res) => {
  const { id } = req

  const userById = await userModel.findById(id).exec()
  if (!userById)
    return res.status(401).send({ errors: ['Usuario no autorizado'] })

  const { _id, name, surname, email } = userById
  return res.send({ _id, name, surname, email })
}

export default userProfileController
