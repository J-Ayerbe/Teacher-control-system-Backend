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

  static async getPercentageAutoEvaluations(req: Request, res: Response) {
    try {
        const year = req.query.year;
        const semester = req.query.semester;
        const autoevaluations = await AutoEvaluation.find({ 'period.year': year, 'period.semester': semester })
            .populate([
                { path: "evaluated" },
                { path: "labour" }
            ]).exec();

        // Contador para el total de autoevaluaciones
        let totalAutoevaluations = 0;
        // Contador para el total de autoevaluaciones completas
        let completedAutoevaluations = 0;

        // Array para almacenar el conteo de autoevaluaciones por identification
        const evaluated: Array<{
           total: number; completed: number; Percentage: number; 
           identification: string;
           firstName: string; 
           lastName: string; 
           role: string ;
           labour: string;

          }> = [];

        // Iterar sobre las autoevaluaciones
        autoevaluations.forEach((evaluation) => {
            const identification = evaluation.evaluated.identification;

            // Incrementar el total de autoevaluaciones para esta identification
            let countInfo = evaluated.find((info) => info.identification === identification);

            if (!countInfo) {
                countInfo = { 
                  total: 0, completed: 0, 
                  identification, 
                  firstName: evaluation.evaluated.firstName, 
                  lastName: evaluation.evaluated.lastName,
                  role: evaluation.evaluated.role,
                  labour: evaluation.labour.nameWork,
                  Percentage: 0

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

        evaluated.forEach((info) => {
            info.Percentage = (info.completed / info.total) * 100 || 0;
        });


        // Calcular el promedio
        const percentageCompleted = (completedAutoevaluations / totalAutoevaluations) * 100 || 0;

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
        res.status(500).json({ error: 'Internal Server Error' });
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
