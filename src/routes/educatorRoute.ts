import { autoEvaluationSchema } from './../middlewares/schemas/autoEvaluationSchema';
import { validarJWT } from './../middlewares/validateJWT';
import { EducatorController } from './../controllers/educatorController';
import validateSchema from "../middlewares/validateSchema";
import {updateEducatorSchema, addNotificationSchema, addLabourSchema} from "../middlewares/schemas/educatorSchema";
import { Router } from 'express'
import checkRole from '../middlewares/checkRole';
import { coordinador, decano } from '../helpers/roles';


export const educatorRouter = Router()

educatorRouter.get('/getEducators/:role',[validarJWT,checkRole([coordinador])], EducatorController.getEducatorsByRole)

educatorRouter.get('/getEducator/:id',[validarJWT,checkRole([coordinador])], EducatorController.getEducatorById)

educatorRouter.get('/getAutoEvalByPeriod', EducatorController.getAutoEvalByPeriod)

educatorRouter.post('/addNotification',validateSchema(addNotificationSchema),[validarJWT,checkRole([decano])],EducatorController.addNotification)



educatorRouter.post('/addLabor',validateSchema(addLabourSchema),[validarJWT,checkRole([coordinador])],EducatorController.addLabor)

educatorRouter.post('/getNotifications',[validarJWT,checkRole([coordinador])], EducatorController.getNotifications)

educatorRouter.post('/addAutoEvaluation',[validateSchema(autoEvaluationSchema),validarJWT,checkRole([coordinador,decano])], EducatorController.addAutoEvaluation)

educatorRouter.put('/updateEducator/:id',validateSchema(updateEducatorSchema),[validarJWT,checkRole([coordinador])], EducatorController.updateEducator)

educatorRouter.get('/getNoti',EducatorController.getNoti)

