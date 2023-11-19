import { IEducatorController } from "../types/IeducatorController";
import { Request,Response } from 'express';
import {Educator} from "../models/educatorModel";
import { autoEvaluationController } from "./autoEvaluationController";

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
            const notificationId = await autoEvaluationController.createNotification(req, res);
            if(!notificationId){
                res.status(404).json({ message: "Notification not created" });
            }
            educator.notifications.push(notificationId);
            await educator.save();

            res.status(200).json({ message: "Notification added" });
        }
    }

    async addAutoEvaluation(req: Request, res:Response){
        const data = req.body;
        // Buscamos al educador por su id
        const educator = await Educator.findById(data.educatorId);
        if (!educator) {
            res.status(404).json({ message: "Educator not found" });
        }else{
            // Agregamos la autoevaluación al educador
            const autoevaluacionId = await autoEvaluationController.createAutoEvaluation(req, res);
            if(!autoevaluacionId){
                res.status(404).json({ message: "AutoEvaluation not created" });
            }
            educator.autoEvaluations.push(autoevaluacionId);
            await educator.save();

            res.status(200).json({ message: "AutoEvaluation added" });
        }
    }

    async addLabor(req: Request, res:Response){
        const data = req.body;
        // Buscamos al educador por su id
        const educator = await Educator.findById(data.educatorId);
        if (!educator) {
            res.status(404).json({ message: "Educator not found" });
        }
        else{
            // Agregamos la labor al educador
            educator.labours.push(data.laborId);
            await educator.save();

            res.status(200).json({ message: "Labor added" });
        }
    }

    async getNotifications(req: Request, res:Response){
        const educator = await Educator.findById(req.body.id).populate({
            path: 'notifications',
            match: { read: false }
          }).exec();
          
          if (!educator) {
            res.status(404).json({ message: "Educator not found" });
          } else {
            res.status(200).json({ data: educator.notifications });
          }
    }



}

export const educatorController = new EducatorController();