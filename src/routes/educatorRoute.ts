import { EducatorController } from './../controllers/educatorController';
import { Router } from 'express'

export const educatorRouter = Router()

//crear el docente
//TODO: verificar token
educatorRouter.post('/createEducator', EducatorController.createEducator)

educatorRouter.get('/getEducator/:id', EducatorController.getEducator)