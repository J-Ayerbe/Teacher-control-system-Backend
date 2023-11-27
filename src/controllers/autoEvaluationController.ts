import { PeriodController } from "./periodController";
import { LabourController } from "./labourController";
import { NotificationController } from "./notificationController";
import { AutoEvaluation } from "../models/autoEvaluationModel";
import { NextFunction, Request, Response } from "express";

//Este controlador actuara como una fachada para el servicio de autoevaluacion
//Contiene a periodController, laboralController, notificacionController

export class AutoEvaluationController {
  // AutoEvaluationController
  static async createAutoEvaluation(_req: any, _res: Response) {
    try {
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static async GetAutoEvalDocentId(req: any, res: Response) {
    try {
      const uid = req.uid;
      const autoevaluations = await AutoEvaluation.find({
        evaluated: uid,
      }).populate([
        { path: "evaluator", select: "firstName lastName docentType" },
        { path: "evaluated", select: "firstName lastName docentType" },
        { path: "labour", select: "nameWork assignedHours labourType" },
      ]);

      // Poblar labourType por separado
      await AutoEvaluation.populate(autoevaluations, {
        path: "labour.labourType",
        select: " description",
      });

      res.status(200).json(autoevaluations);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async updateAutoEvaluation(req: any, res: Response) {
    try {
      const role = req.role;

      console.log(req.body, req.params.id);
      const updateAutoEvaluation = await AutoEvaluation.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true } // Esta opción es para devolver el documento actualizado
      );
      if (!updateAutoEvaluation) {
        res.status(404).json({ message: "AutoEvaluation not found" });
      } else {
        res.status(200).json({ message: "AutoEvaluation updated" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async getAllAutoEvaluations(req: Request, res: Response) {
    const autoevaluations = await AutoEvaluation.find()
      .populate([
        { path: "evaluator", select: "firstName lastName docentType" },
        { path: "evaluated", select: "firstName lastName docentType" },
        { path: "labour", select: "nameWork uid" },
      ])
      .exec();

    res.status(200).json(autoevaluations);
  }
  static async getAutoEvaluations(req: Request, res: Response) {
    //Filtrar por periodo.year y periodo.semester
    const year = req.query.year;
    const semester = req.query.semester;

    const autoevaluations = await AutoEvaluation.find({
      "period.year": year,
      "period.semester": semester,
    })
      .populate([
        { path: "evaluator", select: "firstName lastName docentType" },
        { path: "evaluated", select: "firstName lastName docentType" },
        { path: "labour", select: "nameWork" },
      ])
      .exec();

    if (!autoevaluations) {
      res.status(404).json({ message: "AutoEvaluations not found" });
    } else {
      res.status(200).json({ data: autoevaluations });
    }
  }
  static async getAutoEvaluationById(req: any, res: Response) {
    const autoevaluation = await AutoEvaluation.findById(
      req.params.id
    ).populate([
      { path: "evaluator", select: "firstName lastName docentType" },
      { path: "evaluated", select: "firstName lastName docentType" },
      { path: "labour", select: "nameWork assignedHours labourType" },
    ]);

    await AutoEvaluation.populate(autoevaluation, {
      path: "labour.labourType",
      select: " description",
    });

    if (req.role === "Docente" && autoevaluation.evaluated._id !== req.uid) {
      return res
        .status(403)
        .json({ message: "No tienes acceso a este recurso" });
    }
    if (!autoevaluation) {
      return res.status(404).json({ message: "AutoEvaluation not found" });
    } else {
      return res.status(200).json(autoevaluation);
    }
  }

  static async getPercentageAutoEvaluations(req: Request, res: Response) {
    try {
      const year = req.query.year;
      const semester = req.query.semester;
      const autoevaluations = await AutoEvaluation.find({
        "period.year": year,
        "period.semester": semester,
      })
        .populate([{ path: "evaluated" }, { path: "labour" }])
        .exec();

      // Contador para el total de autoevaluaciones
      let totalAutoevaluations = 0;
      // Contador para el total de autoevaluaciones completas
      let completedAutoevaluations = 0;

      // Array para almacenar el conteo de autoevaluaciones por identification
      const evaluated: Array<{
        total: number;
        completed: number;
        identification: string;
        firstName: string;
        lastName: string;
        role: string;
        labour: string;
      }> = [];

      // Iterar sobre las autoevaluaciones
      autoevaluations.forEach((evaluation) => {
        const identification = evaluation.evaluated.identification;

        // Incrementar el total de autoevaluaciones para esta identification
        let countInfo = evaluated.find(
          (info) => info.identification === identification
        );

        if (!countInfo) {
          countInfo = {
            total: 0,
            completed: 0,
            identification,
            firstName: evaluation.evaluated.firstName,
            lastName: evaluation.evaluated.lastName,
            role: evaluation.evaluated.role,
            labour: evaluation.labour.nameWork,
          };
          evaluated.push(countInfo);
        }

        countInfo.total++;

        // Verificar si esta autoevaluación tiene results
        if (evaluation.results) {
          // Incrementar el contador de autoevaluaciones completas
          countInfo.completed++;
          completedAutoevaluations++;
        }

        totalAutoevaluations++;
      });

      // Calcular el promedio
      const percentageCompleted =
        (completedAutoevaluations / totalAutoevaluations) * 100 || 0;

      // Crear un objeto de respuesta
      const response = {
        totalAutoevaluations,
        completedAutoevaluations,
        percentageCompleted,
        evaluated,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // PeriodController
  static async getPeriods(req: Request, res: Response) {
    return await PeriodController.getPeriods(req, res);
  }

  static async getPeriodById(req: Request, res: Response) {
    return await PeriodController.getPeriodById(req, res);
  }

  static async createPeriod(req: Request, res: Response) {
    return await PeriodController.createPeriod(req, res);
  }

  // LabourController
  static async getLabours(req: Request, res: Response) {
    return await LabourController.getLabours(req, res);
  }
  static async getLabourById(req: Request, res: Response) {
    return await LabourController.getLabourById(req, res);
  }
  static async createLabour(req: Request, res: Response, next: NextFunction) {
    return await LabourController.createLabour(req, res, next);
  }
  static async getLabourTypes(req: Request, res: Response) {
    return await LabourController.getLabourTypes(req, res);
  }
  static async createLabourType(req: Request, res: Response) {
    return await LabourController.createLabourType(req, res);
  }
  static async updateLabour(req: Request, res: Response) {
    return await LabourController.updateLabour(req, res);
  }
  static async deleteLabour(req: Request, res: Response) {
    return await LabourController.deleteLabour(req, res);
  }
  static async assignLabour(req: Request, res: Response, next: NextFunction) {
    return await LabourController.assignLabour(req, res, next);
  }
  // NotificationController
  static async createNotification(req: Request, res: Response) {
    return await NotificationController.createNotification(req, res);
  }
  static async sendEmail(req: Request, res: Response) {
    return await NotificationController.sendEmail(req, res);
  }
}
