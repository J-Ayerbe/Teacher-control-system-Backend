import { Router } from 'express'
import { workController } from '../controllers/workControllers'


export const workRouter = Router()

workRouter.get('/getWork', workController.getWork)