import { getLabourFromAutoEvaluation } from './../middlewares/getLabourAutoEvaluation';
import { AutoEvaluationController } from './../controllers/autoEvaluationController';
import { Router} from 'express'
import validateSchema from "../middlewares/validateSchema";
import periodSchema from '../middlewares/schemas/periodShemas';
import { labourSchema, labourUpdateSchema } from '../middlewares/schemas/labourSchema';
import { validarJWT } from '../middlewares/validateJWT';
import checkRole from '../middlewares/checkRole';
import { coordinador } from '../helpers/roles';
import { docente } from '../helpers/roles';
import { decano } from '../helpers/roles';

import validateAutoEvalSchema from '../middlewares/validateSchemaAutoEvalUpdate';



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
autoEvaluationRoute.put('/updateAutoEvaluation/:id',[validarJWT,checkRole([coordinador,docente])], AutoEvaluationController.updateAutoEvaluation)

autoEvaluationRoute.post('/createAutoEvaluation',[validarJWT,checkRole([coordinador,decano])], AutoEvaluationController.createAutoEvaluation)

autoEvaluationRoute.get('/getAutoEvaluations',[validarJWT,checkRole([coordinador,decano])], AutoEvaluationController.getAutoEvaluations)

autoEvaluationRoute.get('/getAllAutoEvaluations',[validarJWT,checkRole([coordinador,decano])], AutoEvaluationController.getAllAutoEvaluations)

autoEvaluationRoute.get('/getAutoEvaluations/:id',[validarJWT], AutoEvaluationController.getAutoEvaluationById)

autoEvaluationRoute.get('/getPercentageAutoEvaluations',[validarJWT,checkRole([coordinador,decano])],AutoEvaluationController.getPercentageAutoEvaluations)

autoEvaluationRoute.get('/getAutoEvaluationsByDocentId',[validarJWT],AutoEvaluationController.GetAutoEvalDocentId)