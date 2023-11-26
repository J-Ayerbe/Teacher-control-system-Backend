import { PeriodController } from './periodController';
import { LabourController } from './labourController';
import { NotificationController } from "./notificationController";
import { AutoEvaluation } from "../models/autoEvaluationModel";
import { NextFunction, Request,Response } from 'express';


//Este controlador actuara como una fachada para el servicio de autoevaluacion
//Contiene a periodController, laboralController, notificacionController

export class AutoEvaluationController{
  // AutoEvaluationController
  static async createAutoEvaluation(req: any, _res: Response) {
    try {
      const { periodId, labourId, act, evaluated } = req.body;

      const evaluator=req.uid;

      const period=await PeriodController.getPeriodByIdHelper(periodId);
      if(!period){
        return null
      }
      console.log(period)
      const autoevaluacion =  new AutoEvaluation({
        period:{
          year:period.year,
          semester:period.semester,
          startDate:period.startDate,
          endDate:period.endDate,
          name:period.name
        },
        labour: labourId,
        act,
        evaluated,
        evaluator
      });
      await autoevaluacion.save();
      return autoevaluacion._id;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  static async updateAutoEvaluation(req: Request, res: Response) {
    try {

      const updateAutoEvaluation = await AutoEvaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updateAutoEvaluation) {
        res.status(404).json({ message: "AutoEvaluation not found" });
      }else{
        res.status(200).json({ message: "AutoEvaluation updated" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async getAutoEvaluations(req:Request,res:Response){
    //Filtrar por periodo.year y periodo.semester
    const year = req.query.year;
    const semester = req.query.semester;

    const autoevaluations = await AutoEvaluation.find({ 'period.year': year , 'period.semester': semester }).
    populate([
      {path: 'evaluator'},
      {path: 'evaluated'},
      {path: 'labour', populate: {path: 'labourType'}}
    ]).exec();

    if(!autoevaluations){
      res.status(404).json({message:"AutoEvaluations not found"});
    }
    else{
      res.status(200).json(autoevaluations);
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
static  async createLabour(req: Request, res: Response,next:NextFunction){
    return await LabourController.createLabour(req, res,next);
  }
  static  async getLabourTypes(req: Request, res: Response){
    return await LabourController.getLabourTypes(req, res);
  }
  static  async createLabourType(req: Request, res: Response){
    return await LabourController.createLabourType(req, res);
  }
  static async updateLabour(req: Request, res: Response){
    return await LabourController.updateLabour(req, res);
  }
 static async deleteLabour(req: Request, res: Response){
    return await LabourController.deleteLabour(req, res);
  }
static async assignLabour(req: Request, res: Response){
    return await LabourController.assignLabour(req, res);
  }
  // NotificationController
  static async createNotification(req: Request, res: Response){
    return await NotificationController.createNotification(req, res);
  }
  static async sendEmail(req: Request, res: Response){
    return await NotificationController.sendEmail(req, res);
  }
}
