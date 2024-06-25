import userRouter from '#Routes/user.routes.js'
import e from 'express'

const expressApp = e()

expressApp.use(e.json())

expressApp.use(userRouter)

export default expressApp
