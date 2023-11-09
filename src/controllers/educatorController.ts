import {Request, Response} from "express";
import User from "../models/educatorModel";

export class EducatorController {
    static async createUser(req:Request, res: Response){
        const user= new User(req.body)
        await user.save();
        res.status(201).json({ user });
    }

    static async getUser(req:Request, res: Response){
        const {id}=req.params;
        const user= await User.findById(id);
        res.status(200).json({ user });
    }
}