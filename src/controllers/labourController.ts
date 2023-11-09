import { Response } from "express";


export class LabourController {
  static async test(_req: any, res: Response) {
    return res.status(200).json({
      ok: true,
    });
  }
}