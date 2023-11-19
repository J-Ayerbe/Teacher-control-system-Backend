import { tryCatchFn } from "../helpers/customTryCatch";
import { AppError } from "../helpers/errorHandler";
import { Educator } from "../models/educatorModel";
import { autoEvaluationController } from "./autoEvaluationController";
import { NextFunction, Request, Response } from "express";

export class EducatorController {
  static getEducators = tryCatchFn(async (_req: Request, res: Response) => {
    const educators = await Educator.find();
    res.status(200).json({ educators });
  });

  static getEducatorById = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { uid } = req.params;
      const educator = await Educator.findById(uid);

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

  static updateEducator = tryCatchFn(async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = req.body;

    const updatedEducator = await Educator.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Educador actualizado", educator: updatedEducator });
  });

  static deleteEducator = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const deletedEducator = await Educator.findByIdAndDelete(id);

      if (!deletedEducator) {
        return next(new AppError("Educador no encontrado", 404));
      }
      res
        .status(200)
        .json({ message: "Educador eliminado", educator: deletedEducator });
    }
  );

  static async addNotification(req: Request, res: Response) {
    const data = req.body;
    // Buscamos al educador por su id
    const educator = await Educator.findById(data.educatorId);
    if (!educator) {
      res.status(404).json({ message: "Educator not found" });
    } else {
      // Agregamos la notificación al educador
      const notificationId = await autoEvaluationController.createNotification(
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
      const autoevaluacionId =
        await autoEvaluationController.createAutoEvaluation(req, res);
      if (!autoevaluacionId) {
        res.status(404).json({ message: "AutoEvaluation not created" });
      }
      educator.autoEvaluations.push(autoevaluacionId);
      await educator.save();

      res.status(200).json({ message: "AutoEvaluation added" });
    }
  }

  static async addLabor(req: Request, res: Response) {
    const data = req.body;
    // Buscamos al educador por su id
    const educator = await Educator.findById(data.educatorId);
    if (!educator) {
      res.status(404).json({ message: "Educator not found" });
    } else {
      // Agregamos la labor al educador
      educator.labours.push(data.laborId);
      await educator.save();

      res.status(200).json({ message: "Labor added" });
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
}
