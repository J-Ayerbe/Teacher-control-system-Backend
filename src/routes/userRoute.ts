import { Router } from 'express'
import { UserController } from '../controllers/userControllers'


export const userRouter = Router()

userRouter.get('/user', UserController.getUser)