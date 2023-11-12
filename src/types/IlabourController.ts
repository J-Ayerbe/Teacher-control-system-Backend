//Interface para labourController
import { Request,Response } from 'express';

export interface ILabourController {
    getLabours(req: Request, res: Response): Promise<void>;
    getLabourById(req: Request, res: Response): Promise<void>;
    createLabour(req: Request, res: Response): Promise<void>;
    updateLabour(req: Request, res: Response): Promise<void>;
    deleteLabour(req: Request, res: Response): Promise<void>;
}