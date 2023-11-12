import { generateRefreshToken, generateToken } from "./../helpers/jwt";
import { tryCatchFn } from "./../helpers/customTryCatch";
import { AppError } from "../helpers/errorHandler";
import { Educator } from "./../models/educatorModel";
import { Response, NextFunction, Request } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export class AuthController {
  static login = tryCatchFn(
    async (_req: any, res: Response, next: NextFunction) => {
      return next(new AppError("Invalid Email / Password / Method", 404));
      return res.status(400).json({
        ok: true,
      });
    }
  );

  static logout = tryCatchFn(
    async (_req: any, res: Response, _next: NextFunction) => {
      return res.status(200).json({
        ok: true,
      });
    }
  );

  static async register(req: Request, res: Response, _next: NextFunction) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { password, ...body } = req.body;
    try {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = new Educator({ ...body, password: hashedPassword });
      await user.save({ session });
      const token = await generateToken(user._id, user.role);
      const refreshToken = await generateRefreshToken(user._id, user.role);
      await session.commitTransaction();
      return res.status(201).json({
        message: "User registered successfully",
        token,
        refreshToken,
        uid:user._id
      });
    } catch (error: any) {
      await session.abortTransaction();
      console.error("Error registering user:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      session.endSession();
    }
  }
}
