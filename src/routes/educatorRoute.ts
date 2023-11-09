import { EducatorController } from './../controllers/educatorController';
import { Router } from 'express'
import validateSchema from '../middlewares/validateSchema'
import educatorSchema from '../middlewares/schemas/educatorSchema'


export const educatorRouter = Router()

//crear el docente
//TODO: verificar token
educatorRouter.post('/createEducator',[validateSchema(educatorSchema)], EducatorController.createUser)