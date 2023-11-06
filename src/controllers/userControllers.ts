import { userModel } from "../models/userModel";
import {Request, Response} from "express";

export class UserController {
    static async createUser(req:Request, res: Response){
        const { id,name,lastName,typeID,typeEducator,email,password,title } = req.body;
        const user = new userModel(
          undefined,id,name,lastName,typeID,typeEducator,email,password,title
        );
        // TODO: guardar en base de datos
        res.status(201).json({ user });
    }

    static async getUser(_req:Request, res: Response){
        // TODO: obtener usuario desde base de datos
        res.status(200).json();
     }
}