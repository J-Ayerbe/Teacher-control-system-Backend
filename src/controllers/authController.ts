import { Response } from "express";

export class AuthController {
  static async login(_req: any, res: Response) {
    return res.status(200).json({
      ok: true,
    });
  }
}
