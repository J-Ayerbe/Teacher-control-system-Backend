import { EducatorController } from './../controllers/educatorController';
import validateSchema from "../middlewares/validateSchema";
import {updateEducatorSchema, addAutoEvalSchema, addNotificationSchema, addLabourSchema} from "../middlewares/schemas/educatorSchema";

import { Router } from 'express'

export const educatorRouter = Router()

educatorRouter.get('/getEducators', EducatorController.getEducators)
educatorRouter.get('/getEducator/:id', EducatorController.getEducatorById)
educatorRouter.post('/addNotification',validateSchema(addNotificationSchema),EducatorController.addNotification)
educatorRouter.post('/addAutoEvaluation',validateSchema(addAutoEvalSchema), EducatorController.addAutoEvaluation)
educatorRouter.post('/addLabor',validateSchema(addLabourSchema),EducatorController.addLabor)
educatorRouter.post('/getNotifications', EducatorController.getNotifications)
educatorRouter.put('/updateEducator',validateSchema(updateEducatorSchema), EducatorController.updateEducator)





