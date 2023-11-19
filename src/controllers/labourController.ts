import { ILabourController } from "../types/IlabourController";
import { Request,Response } from 'express';
import { Labour } from "../models/labourModel";
import { LabourType } from "../models/labourTypeModel";


class LabourController implements ILabourController  {
  async getLabours(_req: Request, res:Response){
    try{
      const response=await Labour.find();
      
      res.status(200).json(response); 
    }catch(error){
      res.status(500).json({ error:error });
    }
    
  }
  async getLabourById(req: Request, res: Response){
    try{
      const response=await Labour.findById(req.params.id);
    
      res.status(200).json(response);
    }catch(error){
      res.status(500).json({ error:error });
    }

  }
  async createLabour(req: Request, res: Response){
    const labour=new Labour(req.body)
    await labour.save();
    res.status(201).json({ message: "createLabour"});
  }
  async updateLabour(req: Request, res: Response){
    try{
      const updatedLabour = await Labour.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedLabour) {
        res.status(200).json({ message: "updateLabour", data: updatedLabour });
      } else {
        res.status(404).json({ message: "Labour not found" });
      }
    }catch(error){
        res.status(500).json({ error: error });
    }

  }

  async deleteLabour(req: Request, res: Response){
    try{
      const deletedLabour=await Labour.findByIdAndDelete(req.params.id);
      if(deletedLabour){
        res.status(200).json({ message: "deleteLabour", data: deletedLabour });
      }else{
          res.status(404).json({ message: "Labour not found" });
      }

    }catch(error){
      res.status(500).json({ error:error });
    }

  }
  async getTypeLabours(_req: Request, res:Response){
    try{
      const response=await LabourType.find();
      
      res.status(200).json(response); 
    }catch(error){
      res.status(500).json({ error:error });
    }
    
  }
  async getTypeLabourById(req: Request, res: Response){
    try{
      const response=await LabourType.findById(req.params.id);
    
      res.status(200).json(response);
    }catch(error){
      res.status(500).json({ error:error });
    }

  }

}

export const labourController = new LabourController();