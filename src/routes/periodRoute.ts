import { Router } from 'express'
import { PeriodController } from '../controllers/periodController'

export const periodRouter = Router()

periodRouter.post('/createPeriod', PeriodController.getPeriods)