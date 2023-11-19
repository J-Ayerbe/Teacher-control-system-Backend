import { EducatorController } from './../controllers/educatorController';


import { Router } from 'express'

export const educatorRouter = Router()

educatorRouter.get('/getEducator/:id', EducatorController.getEducatorById)
educatorRouter.get('/getEducators', EducatorController.getEducators)
educatorRouter.post('/addNotification', EducatorController.addNotification)
educatorRouter.post('/addAutoEvaluation', EducatorController.addAutoEvaluation)
educatorRouter.post('/getNotifications', EducatorController.getNotifications)
