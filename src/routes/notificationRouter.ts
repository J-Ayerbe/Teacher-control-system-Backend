import { Router} from 'express'
import sendEmailSchema from '../middlewares/schemas/sendEmailSchema';
import validateSchema from "../middlewares/validateSchema";
import { NotificationController } from '../controllers/notificationController';

export const notificationRouter = Router()

//Notifications
notificationRouter.post('/sendEmail',validateSchema(sendEmailSchema), NotificationController.sendEmail)
