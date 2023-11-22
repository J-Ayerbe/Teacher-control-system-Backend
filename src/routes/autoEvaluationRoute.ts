import { AutoEvaluationController } from './../controllers/autoEvaluationController';
import { Router} from 'express'
import validateSchema from "../middlewares/validateSchema";
import periodSchema from '../middlewares/schemas/periodShemas';
import { labourSchema, labourUpdateSchema } from '../middlewares/schemas/labourSchema';



export const autoEvaluationRoute = Router()
//Periods
autoEvaluationRoute.get('/periods', AutoEvaluationController.getPeriods)
autoEvaluationRoute.get('/period/:id', AutoEvaluationController.getPeriodById)
autoEvaluationRoute.post('/period',validateSchema(periodSchema), AutoEvaluationController.createPeriod)
//Labours
autoEvaluationRoute.get('/labours', AutoEvaluationController.getLabours)
autoEvaluationRoute.get('/labourTypes', AutoEvaluationController.getLabourTypes)
autoEvaluationRoute.get('/labour/:id', AutoEvaluationController.getLabourById)
autoEvaluationRoute.post('/labour',[validateSchema(labourSchema)], AutoEvaluationController.createLabour)
autoEvaluationRoute.post('/assignLabour', AutoEvaluationController.assignLabour)
autoEvaluationRoute.post('/labourType', AutoEvaluationController.createLabourType)
autoEvaluationRoute.put('/labour/:id',[validateSchema(labourUpdateSchema)], AutoEvaluationController.updateLabour)
autoEvaluationRoute.delete('/labour/:id', AutoEvaluationController.deleteLabour)
//AutoEvaluations
autoEvaluationRoute.put('/updateAutoEvaluation/:id', AutoEvaluationController.updateAutoEvaluation)
