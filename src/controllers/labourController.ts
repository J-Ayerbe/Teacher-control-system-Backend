import { ILabourController } from "../types/IlabourController";
import { Request,Response } from 'express';
import { Labour } from "../models/labourModel";


class LabourController implements ILabourController  {
  async getLabours(_req: Request, res:Response){
    res.status(200).json({ message: "getLabours" });
  }
  async getLabourById(_req: Request, res: Response){
    res.status(200).json({ message: "getLabourById" });     
  }
  async createLabour(req: Request, res: Response){
    const {isActive, idlabourType, code, description, assignedHours} = req.body;
    const labour=new Labour({isActive, idlabourType, code, description, assignedHours})
    await labour.save();
    res.status(201).json({ message: "createLabour"});
  }
  async updateLabour(_req: Request, res: Response){
    res.status(200).json({ message: "updateLabour" });
  }

  async deleteLabour(_req: Request, res: Response){
    res.status(200).json({ message: "deleteLabour" });
  }

}

export const labourController = new LabourController();