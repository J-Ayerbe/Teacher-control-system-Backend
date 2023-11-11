import { Router } from 'express'
import { AutoEvaluationController } from '../controllers/autoEvaluationController';


export const autoEvaluationRoute = Router()

autoEvaluationRoute.get('/periods',AutoEvaluationController.getPeriod)
autoEvaluationRoute.get('/period/:id',AutoEvaluationController.getPeriodById)