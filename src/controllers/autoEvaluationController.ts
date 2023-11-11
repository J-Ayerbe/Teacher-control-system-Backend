import { PeriodController } from "./periodController";
//import { LaboralController } from "./laboralController";
//import { NotificationController } from "./notificationController";
//import { model } from "mongoose";


//Este controlador actuara como una fachada para el servicio de autoevaluacion
//Contiene a periodController, laboralController, notificacionController

export class AutoEvaluationController{
  static async getPeriod(req: any, res: any) {
    return PeriodController.getPeriods(req, res);
  }

  static async getPeriodById(req: any, res: any) {
    return PeriodController.getPeriodById(req, res);
  }

}

