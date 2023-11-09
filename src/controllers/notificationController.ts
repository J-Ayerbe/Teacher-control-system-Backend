import { Response } from "express";

export class NotificationController {
  static async test(_req: any, res: Response) {
    return res.status(200).json({
      ok: true,
    });
  }
}