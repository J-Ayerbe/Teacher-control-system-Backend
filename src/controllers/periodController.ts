//Pide los datos a una api externa
//Que se encuentra en el siguiente link: http://127.0.0.1:8000/periodos
import { IPeriodController } from "../types/IperiodController";
import { Response } from 'express';

    
class PeriodController implements IPeriodController{
    async getPeriods(_req: any, res: Response) {
        try {
            const response = await fetch('http://127.0.0.1:8000/periods');
            const data = await response.json();
            res.status(200).json(data);      
        } catch (error) {
            res.status(500).json({ error: error });         
        }
    }

    async getPeriodById(req: any, res: any) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/period/${req.params.id}`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export const periodController = new PeriodController();
