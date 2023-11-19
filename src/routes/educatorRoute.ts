import { EducatorController } from './../controllers/educatorController';


import { Router } from 'express'

export const educatorRouter = Router()

//TODO: verificar token
educatorRouter.post('/createEducator', EducatorController.createEducator)

educatorRouter.get('/getEducator/:uid', EducatorController.getEducatorById)

educatorRouter.get('/getEducators', EducatorController.getEducators)
