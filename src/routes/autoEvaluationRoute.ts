import { AutoEvaluationController } from './../controllers/autoEvaluationController';
import { Router} from 'express'
import validateSchema from "../middlewares/validateSchema";
import periodSchema from '../middlewares/schemas/periodShemas';
import { labourSchema, labourUpdateSchema } from '../middlewares/schemas/labourSchema';
import { validarJWT } from '../middlewares/validateJWT';
import checkRole from '../middlewares/checkRole';
import { coordinador } from '../helpers/roles';



export const autoEvaluationRoute = Router()
//Periods
autoEvaluationRoute.get('/periods', AutoEvaluationController.getPeriods)

autoEvaluationRoute.get('/period/:id', AutoEvaluationController.getPeriodById)

autoEvaluationRoute.post('/period',validateSchema(periodSchema), AutoEvaluationController.createPeriod)
//Labours
autoEvaluationRoute.get('/labours',[validarJWT,checkRole([coordinador])], AutoEvaluationController.getLabours)

autoEvaluationRoute.get('/labourTypes',[validarJWT,checkRole([coordinador])], AutoEvaluationController.getLabourTypes)

autoEvaluationRoute.get('/labour/:id',[validarJWT,checkRole([coordinador])], AutoEvaluationController.getLabourById)

autoEvaluationRoute.post('/labour',[validateSchema(labourSchema),validarJWT,checkRole([coordinador])], AutoEvaluationController.createLabour)

autoEvaluationRoute.post('/assignLabour',[validarJWT,checkRole([coordinador])], AutoEvaluationController.assignLabour)

autoEvaluationRoute.post('/labourType',[validarJWT,checkRole([coordinador])], AutoEvaluationController.createLabourType)

autoEvaluationRoute.put('/labour/:id',[validateSchema(labourUpdateSchema),validarJWT,checkRole([coordinador])], AutoEvaluationController.updateLabour)

autoEvaluationRoute.delete('/labour/:id', AutoEvaluationController.deleteLabour)
//AutoEvaluations
autoEvaluationRoute.put('/updateAutoEvaluation/:id', AutoEvaluationController.updateAutoEvaluation)
autoEvaluationRoute.post('/createAutoEvaluation', AutoEvaluationController.createAutoEvaluation)
autoEvaluationRoute.get('/getAutoEvaluations', AutoEvaluationController.getAutoEvaluations)
autoEvaluationRoute.get('/getAllAutoEvaluations', AutoEvaluationController.getAllAutoEvaluations)

autoEvaluationRoute.get('/getAutoEvaluations/:id', AutoEvaluationController.getAutoEvaluationById)