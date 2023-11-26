//Pide los datos a una api externa
import { Response } from 'express';
import { apiPeriodUrl } from "../helpers/apiPeriodUrl";


export class PeriodController{
   static async getPeriods(_req: any, res: Response) {
        try {
            const response = await fetch(`${apiPeriodUrl}/periods`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
  static async getPeriodByIdHelper(periodId) {
        try {
            const response = await fetch(`${apiPeriodUrl}/period/${periodId}`);
            const data = await response.json();
           return data;
        } catch (error) {
           return null;
        }
    }
   static async getPeriodById(req: any, res: any) {
        try {
            const response = await fetch(`${apiPeriodUrl}/period/${req.params.id}`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

   static async createPeriod(req: any, res: any) {
        try {
            const data = req.body;
            const apiUrl = `${apiPeriodUrl}/period`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            const responseData = await response.json();
            res.status(200).json(responseData);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

}

export const periodController = new PeriodController();
