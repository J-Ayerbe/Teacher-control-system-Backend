import { IEducatorController } from "../types/IeducatorController";
import { Request,Response } from 'express';


class EducatorController implements IEducatorController {
    async getEducators(_req: Request, res:Response){
        res.status(200).json({ message: "getEducators" });
    }

    async getEducatorById(_req: Request, res:Response){
        res.status(200).json({ message: "getEducatorById" });
    }

    async createEducator(_req: Request, res:Response){
        res.status(200).json({ message: "createEducator" });
    }

    async updateEducator(_req: Request, res:Response){
        res.status(200).json({ message: "updateEducator" });
    }

    async deleteEducator(_req: Request, res:Response){
        res.status(200).json({ message: "deleteEducator" });
    }
}

export const educatorController = new EducatorController();