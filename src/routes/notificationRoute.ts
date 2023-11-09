import { Router } from 'express'
import { NotificationController } from '../controllers/notificationController'

export const notificationRouter = Router()
notificationRouter.get('/notification', NotificationController.test)
