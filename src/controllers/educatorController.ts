import { AutoEvaluation } from "./../models/autoEvaluationModel";
import { AutoEvaluationController } from "./autoEvaluationController";
import { AppError } from "./../helpers/errorHandler";
import { tryCatchFn } from "./../helpers/customTryCatch";
import { NextFunction, Request, Response } from "express";
import { Educator } from "../models/educatorModel";
import { EducatorRole } from "../models/interfaces/interfaces";
import { eventEmitter } from "../helpers/ObserverNotifications";
import { PeriodController } from "./periodController";

export class EducatorController {
  static getEducatorsByRole = tryCatchFn(
    async (req: Request, res: Response) => {
      let { role } = req.params;
      role = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
      const educators = await Educator.find({ role: role }).populate([
        {
          path: "labours",
          populate: {
            path: "labourType",
          },
        },
        {
          path: "autoEvaluations",
          populate: [
            {
              path: "labour",
            },
            {
              path: "evaluator",
            },
          ],
        },
        { path: "notifications" },
      ]);
      res.status(200).json(educators);
    }
  );

  static getEducatorById = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const educator = await Educator.findById(id).populate([
         {
          path: "labours",
          populate: {
            path: "labourType",
          },
        },
        {
          path: "autoEvaluations",
          populate: [
            {
              path: "labour",
            },
            {
              path: "evaluator",
            },
          ],
        },
        { path: "notifications" },
      ]);

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
      if (
        educator.role === EducatorRole.Coordinador ||
        educator.role === EducatorRole.Decano
      ) {
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

  static async addAutoEvaluation(req: any, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const educator = await Educator.findById(data.evaluated);
      if (!educator) {
        return res.status(404).json({ message: "Educator not found" });
      }

      const { periodId, labourId, act, evaluated } = req.body;

      const evaluator = req.uid;

      const period = await PeriodController.getPeriodByIdHelper(periodId);
      if (!period) {
        return next(new AppError("El periodo asignado no existe", 404));
      }
      const existsAutoEvaluation = await AutoEvaluation.findOne({
        "period.semester": period.semester,
        labour: labourId,
        evaluator: evaluator,
        evaluated: evaluated,
      });

      if (existsAutoEvaluation) {
        return next(
          new AppError(
            "Ya se ha asignado una autoevaluacion a ese periodo con esa labor",
            404
          )
        );
      }

      const autoevaluacion = new AutoEvaluation({
        period: {
          year: period.year,
          semester: period.semester,
          startDate: period.startDate,
          endDate: period.endDate,
          name: period.name,
        },
        labour: labourId,
        act,
        evaluated,
        evaluator,
      });
      await autoevaluacion.save();

      educator.autoEvaluations.push(autoevaluacion._id);
      await educator.save();
      // Enviar un mensaje al servidor WebSocket
      eventEmitter.emit(
        "enviarMensajeWebSocket",
        "Se ha agregado una nueva autoevaluación"
      );
      return res.status(200).json({ message: "AutoEvaluation added" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "No se ha podido crear la autoevaluación" });
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
    const id = req.query.id;
    const year = req.query.year;
    const semester = req.query.semester;

    const educator = await Educator.findById(id)
      .populate([
        {
          path: "autoEvaluations",
          match: {
            "period.year": year,
            "period.semester": semester,
          },
          populate: [
            { path: "evaluator", select: "firstName lastName docentType" },
            { path: "evaluated", select: "firstName lastName docentType" },
            { path: "labour", select: "nameWork" },
          ],
        },
        populate: [
          { path: "evaluator" },
          { path: "evaluated"},
          { path: "labour", populate: {path: 'labourType'}},
        ],
      },
    ]).exec();

    if (!educator) {
      res.status(404).json({
        message: "Educator not found",
        id: req.query.id,
        year: req.query.year,
      });
    } else {
      res.status(200).json(educator.autoEvaluations);
    }
  }

  static async getNoti(req: Request, res: Response) {
    // Puedes emitir un evento para enviar un mensaje al servidor WebSocket
    const id = req.query.id;
    eventEmitter.emit("enviarMensajeWebSocket", id);
    res.status(200).json({ message: "Mensaje enviado" });
  }


}
