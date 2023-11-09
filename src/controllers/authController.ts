import { Response } from "express";

export class AuthController {
  static async login(_req: any, res: Response) {
    //TODO: check token
    return res.status(200).json({
      ok: true,
    });
  }
}
