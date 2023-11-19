import { IEducatorController } from "../types/IeducatorController";
import { Request,Response } from 'express';
import {Educator} from "../models/educatorModel";
import { AutoEvaluation } from "../models/autoEvaluationModel";
import { autoEvaluationController } from "./autoEvaluationController";
import mongoose from "mongoose";


class EducatorController implements IEducatorController {

    async getEducatorById(req: Request, res:Response){
        try {
            const educator = await Educator.findById(req.params.id);
            if(!educator){
                res.status(404).json({ message: "Educators not found" });
            }
            res.status(200).json({ data: educator });
        } catch (error) {
            res.status(500).json({ message: error });           
        }
    }

    async createEducator(req: Request, res:Response){
        const educator = new Educator(req.body);
        await educator.save();
        return res.status(201).json({ message: "Educator created" });
    }

    async updateEducator(req: Request, res:Response){
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const data = req.body;
            const educator = await Educator.findById(data.educatorId).session(session);
            if (!educator) {
                res.status(404).json({ message: "Educator not found" });
            } else {
                const autoEvaluations = educator.autoEvaluations;
                for (const idAutoEvaluation of autoEvaluations) {
                    const updatedAutoEvaluation = await AutoEvaluation.findByIdAndUpdate(idAutoEvaluation, data, { new: true }).session(session);
                    if (!updatedAutoEvaluation) {
                        await session.abortTransaction();
                        session.endSession();
                        return res.status(404).json({ message: "AutoEvaluation not found" });
                    }
                }
                const updatedEducator = await Educator.findByIdAndUpdate(data.educatorId, data, { new: true }).session(session);
                if (!updatedEducator) {
                    await session.abortTransaction();
                    session.endSession();
                    return res.status(404).json({ message: "Educator not found" });
                }
            }
            await session.commitTransaction();
            session.endSession();
            res.status(200).json({ message: "Educator updated" });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(500).json({ message: "An error occurred" });
        }    
        return 0;   
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