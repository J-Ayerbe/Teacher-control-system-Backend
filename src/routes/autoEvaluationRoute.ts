import { Router } from 'express'
import { AutoEvaluationController } from '../controllers/autoEvaluationController';


export const autoEvaluationRoute = Router()

autoEvaluationRoute.post('/createAutoEvaluation',AutoEvaluationController.test)