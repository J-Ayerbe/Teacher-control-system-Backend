import { tryCatchFn } from "./../helpers/customTryCatch";
import { AppError } from "../helpers/errorHandler";
import { Educator } from "./../models/educatorModel";
import { Response, NextFunction } from "express";

export class AuthController {
  static login = tryCatchFn(async (_req: any, res: Response, next: NextFunction) => {
      return next(new AppError("Invalid Email / Password / Method", 404));
      return res.status(400).json({
        ok: true,
      });
    }
  );

  static logout = tryCatchFn(async (_req: any, res: Response, _next: NextFunction) => {
      return res.status(200).json({
        ok: true,
      });
    }
  );

  static register = tryCatchFn(async (_req: any, res: Response, _next: NextFunction) => {
      const user = new Educator(_req.body);
      await user.save();
      return res.status(200).json({
        ok: true,
      });
    }
  );
}
