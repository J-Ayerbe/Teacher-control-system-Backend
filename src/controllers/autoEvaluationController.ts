import { periodController } from "./periodController";
import { labourController } from "./labourController";
import { NotificationController } from "./notificationController";
import { Request,Response } from 'express';


//Este controlador actuara como una fachada para el servicio de autoevaluacion
//Contiene a periodController, laboralController, notificacionController

class AutoEvaluationController{
  // PeriodController
  async getPeriods(req: Request, res: Response) {
    return await periodController.getPeriods(req, res);
  }

  async getPeriodById(req: Request, res: Response) {
    return await periodController.getPeriodById(req, res);  
  }

  async createPeriod(req: Request, res: Response) {
    return await periodController.createPeriod(req, res);
  }

  // LabourController

  async getLabours(req: Request, res: Response){
    return await labourController.getLabours(req, res);
  }
  async getLabourById(req: Request, res: Response){
    return await labourController.getLabourById(req, res);
  }
  async createLabour(req: Request, res: Response){
    return await labourController.createLabour(req, res);
  }
  async updateLabour(req: Request, res: Response){
    return await labourController.updateLabour(req, res);
  }
  async deleteLabour(req: Request, res: Response){
    return await labourController.deleteLabour(req, res);
  }

  // NotificationController
  async sendEmail(req: Request, res: Response){
    return await NotificationController.sendEmail(req, res);
  }
}

export const autoEvaluationController = new AutoEvaluationController();

