import { Router} from 'express'
import { autoEvaluationController } from '../controllers/autoEvaluationController';
import { Request,Response } from 'express';


export const autoEvaluationRoute = Router()

autoEvaluationRoute.get('/periods', (req:Request, res:Response) => autoEvaluationController.getPeriods(req, res))
autoEvaluationRoute.get('/period/:id', (req:Request, res:Response) => autoEvaluationController.getPeriodById(req, res))
autoEvaluationRoute.post('/period', (req:Request, res:Response) => autoEvaluationController.createPeriod(req, res))

autoEvaluationRoute.get('/labours', (req:Request, res:Response) => autoEvaluationController.getLabours(req, res))
autoEvaluationRoute.get('/labour/:id', (req:Request, res:Response) => autoEvaluationController.getLabourById(req, res))
autoEvaluationRoute.post('/labour', (req:Request, res:Response) => autoEvaluationController.createLabour(req, res))
autoEvaluationRoute.put('/labour/:id', (req:Request, res:Response) => autoEvaluationController.updateLabour(req, res))
autoEvaluationRoute.delete('/labour/:id', (req:Request, res:Response) => autoEvaluationController.deleteLabour(req, res))

autoEvaluationRoute.post('/sendEmail', (req:Request, res:Response) => autoEvaluationController.sendEmail(req, res))
