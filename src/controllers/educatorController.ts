import { AutoEvaluationController } from "./autoEvaluationController";
import { AppError } from "./../helpers/errorHandler";
import { tryCatchFn } from "./../helpers/customTryCatch";
import { NextFunction, Request, Response } from "express";
import { Educator } from "../models/educatorModel";
import { EducatorRole } from '../models/interfaces/interfaces';
import { eventEmitter } from '../webSocket';


export class EducatorController {
  static getEducatorsByRole = tryCatchFn(async (req: Request, res: Response) => {
    let {role}= req.params
    role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    const educators = await Educator.find({role:role}).populate([
    { path: "labours" },
    { path: "autoEvaluations" },
    { path: "notifications" }
  ]);
    res.status(200).json(educators);
  });


  static getEducatorById = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const educator = await Educator.findById(id).populate("labours");

      if (!educator) {
        return next(new AppError("Educator not found", 404));
      }

      res.status(200).json(educator);
    }
  );

  static createEducator = tryCatchFn(async (req: Request, res: Response) => {
    const educator = new Educator(req.body);
    await educator.save();
    return res.status(201).json({ message: "Educator created" });
  });

  static updateEducator = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const update = req.body;
      const educator = await Educator.findById(id);
      if (!educator) {
        return next(new AppError("No se ha encontrado el docente", 404));
      }

      // Check the role
      if (educator.role === EducatorRole.Coordinador || educator.role === EducatorRole.Decano) {
        return next(
          new AppError(
            "No tienes permitido  actualizar el rol a este educador",
            403
          )
        );
      }
      educator.set(update);
      await educator.save();

      res.status(200).json({ message: "Educator updated" });
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
      const autoevaluacionId =
        await AutoEvaluationController.createAutoEvaluation(req, res);
      if (!autoevaluacionId) {
        res.status(404).json({ message: "AutoEvaluation not created" });
      } else {
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

  static async addLabor(req: Request, res: Response) {
    const data = req.body;
    const educator = await Educator.findById(data.educatorId);
    if (!educator) {
      res.status(404).json({ message: "Educator not found" });
    } else {
      // Agregamos la labor al educador
      educator.labours.push(data.labours);
      await educator.save();

      res.status(200).json({ message: "Labor added" });
    }
  }

  static async getAutoEvalByPeriod(req: Request, res: Response) {
    const educator = await Educator.findById(req.query.id)
      .populate({
        //Realizamos un populate para obtener las autoevaluaciones del educador
        //match: de period.year y period.semester
        path: "autoEvaluations",
        match: {
          "period.year": req.query.year,
          "period.semester": req.query.semester,
        },
      })
      .exec();

    if (!educator) {
      res.status(404).json({
        message: "Educator not found",
        id: req.query.id,
        year: req.query.year,
      });
    } else {
      res.status(200).json({
        data: educator.autoEvaluations
      });
    }
  }

  static async getNoti(_req: Request, res: Response){
    // En tu controlador en el servidor en el puerto 3000
    // Puedes emitir un evento para enviar un mensaje al servidor WebSocket
    eventEmitter.emit('enviarMensajeWebSocket', 'Hola desde el controlador');
    res.status(200).json({message: "Mensaje enviado"});
  }
}
