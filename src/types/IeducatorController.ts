//Interface para edutacatorController
import { Request,Response } from 'express';

export interface IEducatorController {
    getEducatorById(req: Request, res: Response): Promise<void>;
    toggleEducatorStatus(req: Request, res: Response): Promise<any>;
    updateEducator(req: Request, res: Response): Promise<any>;
    addNotification(req: Request, res: Response): Promise<any>;
    addAutoEvaluation(req: Request, res: Response): Promise<any>;
    addLabor(req: Request, res: Response): Promise<any>;
    getNotifications(req: Request, res: Response): Promise<any>;
}