import { LabourController } from './../controllers/labourController';
import { Router } from 'express'

export const labourRouter = Router()

labourRouter.get('/getLabours', LabourController.test)