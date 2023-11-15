import { educatorController } from './../controllers/educatorController';

import { Router } from 'express'

export const educatorRouter = Router()

//TODO: verificar token
educatorRouter.post('/createEducator', educatorController.createEducator)

educatorRouter.get('/getEducator/:id', educatorController.getEducatorById)

educatorRouter.get('/getEducators', educatorController.getEducators)
