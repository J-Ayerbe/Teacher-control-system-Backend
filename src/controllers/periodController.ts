import Period from "../models/periodModel";
//Pide los datos a una api externa
//Que se encuentra en el siguiente link: http://127.0.0.1:8000/periodos
import { Response,Request } from "express";

export class PeriodController {
    static async createPeriod(req:Request, res: Response){
        const period= new Period(req.body)
        await period.save();
        res.status(201).json({ period });
    }
}
