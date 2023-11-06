import { Router } from 'express'
import { PeriodController } from '../controllers/periodController'

export const periodRouter = Router()

periodRouter.get('/getPeriods', PeriodController.getPeriods)