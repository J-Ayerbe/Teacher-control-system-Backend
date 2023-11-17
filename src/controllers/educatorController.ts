import { IEducatorController } from "../types/IeducatorController";
import { Request,Response } from 'express';
import {Educator} from "../models/educatorModel";
import { Notification } from "../models/notificationModel";

class EducatorController implements IEducatorController {
    //TODO: add try-tach
    async getEducators(_req: Request, res:Response){
        const educators=await Educator.find();
        res.status(200).json({ data: educators});
    }

    async getEducatorById(_req: Request, res:Response){
        res.status(200).json({ message: "getEducatorById" });
    }

    async createEducator(req: Request, res:Response){
        const educator = new Educator(req.body);
        await educator.save();
        return res.status(201).json({ message: "Educator created" });
    }

    async updateEducator(_req: Request, res:Response){
        res.status(200).json({ message: "updateEducator" });
    }

    async deleteEducator(_req: Request, res:Response){
        res.status(200).json({ message: "deleteEducator" });
    }

    async addNotification(req: Request, res:Response){
        const data = req.body;
        // Buscamos al educador por su id
        const educator = await Educator.findById(data.educatorId);
        if (!educator) {
            res.status(404).json({ message: "Educator not found" });
        }else{
            // Agregamos la notificación al educador
            const notification = new Notification(data);
            await notification.save();
            educator.notifications.push(notification._id);

            await educator.save();

            res.status(200).json({ message: "Notification added" });
        }
    }
}

export const educatorController = new EducatorController();