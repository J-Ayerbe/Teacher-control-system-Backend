import { Educator } from './../models/educatorModel';
import {Request, Response} from "express";


export class EducatorController {
    static async createEducator(req:Request, res: Response){
        const educator= new Educator(req.body)
        await educator.save();
        res.status(201).json({ educator });
    }

    static async getEducator(req:Request, res: Response){
        const {id}=req.params;
        const educator= await Educator.findById(id);
        res.status(200).json({ educator });
    }
}