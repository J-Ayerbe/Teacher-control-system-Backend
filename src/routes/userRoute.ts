import { Router } from 'express'
import { UserController } from '../controllers/userControllers'
import validateSchema from '../middlewares/validateSchema'
import userSchema from '../middlewares/schemas/userSchema'


export const userRouter = Router()

//crear el docente
//TODO: verificar token
userRouter.post('/createUser',[validateSchema(userSchema)], UserController.createUser)