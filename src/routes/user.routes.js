import userRegisterDTO from '#Dto/user-register.dto.js'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', userRegisterDTO, (req, res) => {
  res.send()
})
userRouter.post('/login', (req, res) => {})
userRouter.get('/profile', (req, res) => {})
userRouter.patch('/update-data', (req, res) => {})
userRouter.patch('/update-email', (req, res) => {})
userRouter.patch('/update-password', (req, res) => {})
userRouter.delete('/unregister', (req, res) => {})

export default userRouter
