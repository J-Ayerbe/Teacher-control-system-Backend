//Interface para periodController
import { Request,Response } from 'express';

export interface IPeriodController {
    getPeriods(req: Request, res: Response): Promise<void>;
    getPeriodById(req: Request, res: Response): Promise<void>;
    createPeriod(req: Request, res: Response): Promise<void>;
}