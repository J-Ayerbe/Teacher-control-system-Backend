import { PeriodController } from './periodController';
import { LabourController } from './labourController';
import { NotificationController } from "./notificationController";
import { AutoEvaluation } from "../models/autoEvaluationModel";
import { Request,Response } from 'express';


//Este controlador actuara como una fachada para el servicio de autoevaluacion
//Contiene a periodController, laboralController, notificacionController

export class AutoEvaluationController{
  // AutoEvaluationController
  static async createAutoEvaluation(req: Request, _res: Response) {
    try {
      const autoevaluacion =  new AutoEvaluation(req.body);
      await autoevaluacion.save();
      return autoevaluacion._id;
    } catch (error) {
      return null;
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
  static async getLabours(req: Request, res: Response){
    return await LabourController.getLabours(req, res);
  }
 static async getLabourById(req: Request, res: Response){
    return await LabourController.getLabourById(req, res);
  }
static  async createLabour(req: Request, res: Response){
    return await LabourController.createLabour(req, res);
  }
  static async updateLabour(req: Request, res: Response){
    return await LabourController.updateLabour(req, res);
  }
 static async deleteLabour(req: Request, res: Response){
    return await LabourController.deleteLabour(req, res);
  }

  // NotificationController
  static async createNotification(req: Request, res: Response){
    return await NotificationController.createNotification(req, res);
  }
  static async sendEmail(req: Request, res: Response){
    return await NotificationController.sendEmail(req, res);
  }
}
