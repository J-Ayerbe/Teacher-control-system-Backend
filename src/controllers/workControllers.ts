import { workModel } from "../models/workModel";

export class workController{
    /*
    static async createWork(req:any, res: any){

        const work= new workModel();
        res.status(200).json({work });
    }*/
    /*
    static async updateWork(_req:any, res: any){
        const work = new workModel();
        res.status(200).json({ work});
    }*/
    static async getWork(_req:any, res: any){
        const work = new workModel();
        res.status(200).json({ work });
    }/*
    static async inactiveWork(_req:any, res: any){
        const work = new workModel();
        res.status(200).json({ work });
    }*/


}