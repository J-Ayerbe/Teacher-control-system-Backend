
import { notificationModel } from "../models/notificationModel"; 

export class NotificationController{
    static async getNotification(_req:any, res: any){
        const notification = new notificationModel();
        res.status(200).json({ notification });
    }

}

