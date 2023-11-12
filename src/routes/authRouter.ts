import { Router } from 'express'
import { AuthController } from '../controllers/authController'
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../middlewares/schemas/educatorSchema";


export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register',[validateSchema(userSchema)], AuthController.register)
authRouter.post('/logout', AuthController.logout)
