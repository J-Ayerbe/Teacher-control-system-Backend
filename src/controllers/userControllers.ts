import { userModel } from "../models/userModel"; 


export class UserController{
    static async getUser(_req:any, res: any){
        const user = new userModel();
        res.status(200).json({ user });
    }
   
}