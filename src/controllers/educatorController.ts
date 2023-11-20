import { AutoEvaluationController } from './autoEvaluationController';
import { AppError } from "./../helpers/errorHandler";
import { tryCatchFn } from "./../helpers/customTryCatch";
import { NextFunction, Request, Response } from "express";
import { Educator } from "../models/educatorModel";


export class EducatorController {
  static getEducators = tryCatchFn(async (_req: Request, res: Response) => {
    const educators = await Educator.find();
    res.status(200).json({ educators });
  });

  static getEducatorById = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const educator = await Educator.findById(id);

      if (!educator) {
        return next(new AppError("Educator not found", 404));
      }

      res.status(200).json({ educator });
    }
  );

  static createEducator = tryCatchFn(async (req: Request, res: Response) => {
    const educator = new Educator(req.body);
    await educator.save();
    return res.status(201).json({ message: "Educator created" });
  });

 static updateEducator=  tryCatchFn(async(req: Request, res: Response) =>{
      const {id}=req.params;
      const update = req.body;
      const updatedEducator = await Educator.findByIdAndUpdate(
        id,
      { $set: update },
      { new: true }
      );
      if (updatedEducator) {
        res.status(200).json({ message: "Educator updated" });
      } else {
        res.status(404).json({ message: "Educator not found" });
      }
  })


 static async addNotification(req: Request, res: Response) {
    const data = req.body;
    // Buscamos al educador por su id
    const educator = await Educator.findById(data.educatorId);
    if (!educator) {
      res.status(404).json({ message: "Educator not found" });
    } else {
      // Agregamos la notificación al educador
      const notificationId = await AutoEvaluationController.createNotification(
        req,
        res
      );
      if (!notificationId) {
        res.status(404).json({ message: "Notification not created" });
      }
      educator.notifications.push(notificationId);
      await educator.save();

      res.status(200).json({ message: "Notification added" });
    }
  }

  static async addAutoEvaluation(req: Request, res: Response) {
    const data = req.body;
    // Buscamos al educador por su id
    const educator = await Educator.findById(data.educatorId);
    if (!educator) {
      res.status(404).json({ message: "Educator not found" });
    } else {
      // Agregamos la autoevaluación al educador
      const autoevaluacionId = await AutoEvaluationController.createAutoEvaluation(req, res);
      if (!autoevaluacionId) {
        res.status(404).json({ message: "AutoEvaluation not created" });
      }else{
        educator.autoEvaluations.push(autoevaluacionId);
        await educator.save();
        res.status(200).json({ message: "AutoEvaluation added" });
      }
    }
  }


 static async getNotifications(req: Request, res: Response) {
    const educator = await Educator.findById(req.body.id)
      .populate({
        path: "notifications",
        match: { read: false },
      })
      .exec();

    if (!educator) {
      res.status(404).json({ message: "Educator not found" });
    } else {
      res.status(200).json({ data: educator.notifications });
    }
  }

  static  async addLabor(req: Request, res:Response){
        const data = req.body;
        const educator = await Educator.findById(data.educatorId);
        if (!educator) {
            res.status(404).json({ message: "Educator not found" });
        }
        else{
            // Agregamos la labor al educador
            educator.labours.push(data.labours);
            await educator.save();

            res.status(200).json({ message: "Labor added" });
        }
  }

  static async getAutoEvalByPeriod(req: Request, res: Response) {
    const educator = await Educator.findById(req.query.id)
    .populate({
      path: "autoEvaluations",
      match: {"period.year": req.query.year},
    }).exec();
    
    if (!educator) {
      res.status(404).json({ message: "Educator not found",
      id: req.query.id,
      year:req.query.year });
    } else {
      res.status(200).json({ data: educator.autoEvaluations,
        id: req.query.id,
        year:req.query.year});
    }

  }

}
