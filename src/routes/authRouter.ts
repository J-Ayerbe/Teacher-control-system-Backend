import { Router } from 'express'
import { AuthController } from '../controllers/authController'
import validateSchema from "../middlewares/validateSchema";
import { userSchema } from "../middlewares/schemas/educatorSchema";
import loginSchema from "../middlewares/schemas/loginSchema";
//import { validarJWT } from '../middlewares/validateJWT';

export const authRouter = Router()

authRouter.post('/login',[validateSchema(loginSchema)], AuthController.login)
authRouter.post('/register',[/*validarJWT,*/validateSchema(userSchema)], AuthController.register)
authRouter.post('/logout', AuthController.logout)
