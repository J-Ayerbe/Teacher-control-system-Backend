import { educatorController } from './../controllers/educatorController';


import { Router } from 'express'

export const educatorRouter = Router()

educatorRouter.get('/getEducator/:id', educatorController.getEducatorById)
educatorRouter.post('/addNotification', educatorController.addNotification)
educatorRouter.post('/addAutoEvaluation', educatorController.addAutoEvaluation)
educatorRouter.post('/getNotifications', educatorController.getNotifications)
educatorRouter.put('/updateEducator', educatorController.updateEducator)






