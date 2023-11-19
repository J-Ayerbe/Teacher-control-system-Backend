import { Router} from 'express'
import { autoEvaluationController } from '../controllers/autoEvaluationController';
import validateSchema from "../middlewares/validateSchema";
import periodSchema from '../middlewares/schemas/periodShemas';


export const autoEvaluationRoute = Router()
//Periods
autoEvaluationRoute.get('/periods', autoEvaluationController.getPeriods)
autoEvaluationRoute.get('/period/:id', autoEvaluationController.getPeriodById)
autoEvaluationRoute.post('/period',validateSchema(periodSchema), autoEvaluationController.createPeriod)
//Labours
autoEvaluationRoute.get('/labours', autoEvaluationController.getLabours)
autoEvaluationRoute.get('/labour/:id', autoEvaluationController.getLabourById)
autoEvaluationRoute.post('/labour', autoEvaluationController.createLabour)
autoEvaluationRoute.put('/labour/:id', autoEvaluationController.updateLabour)
autoEvaluationRoute.delete('/labour/:id', autoEvaluationController.deleteLabour)
