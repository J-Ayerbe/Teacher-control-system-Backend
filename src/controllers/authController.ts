import { AutoEvaluation } from './../models/interfaces/interfaces';
import {
  refreshTokenCookieOptions,
  tokenCookieOptions,
} from "./../config/cookiesConfig";
import {
  generateRefreshToken,
  generateToken,
  generateTokenAndRefreshToken,
} from "./../helpers/jwt";
import { tryCatchFn } from "./../helpers/customTryCatch";
import { AppError } from "../helpers/errorHandler";
import { Educator } from "./../models/educatorModel";
import { Response, NextFunction, Request } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export class AuthController {
  static login = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const educator = await Educator.findOne({ email });
      if (!educator) {
        return next(new AppError("Credenciales inválidas", 401));
      }
      const validPassword = bcrypt.compareSync(password, educator.password);

      if (!validPassword) {
        return next(new AppError("Credenciales inválidas", 401));
      }
      const { token, refreshToken } = await generateTokenAndRefreshToken(
        educator._id,
        educator.role
      );

      return res
        .cookie("jwtToken", token, tokenCookieOptions)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
        .status(200)
        .json({
          message: "Usuario autenticado correctamente",
        });
    }
  );

  static async logout(_req: any, res: Response, _next: NextFunction) {
    res
      .clearCookie("jwtToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({ ok: true, message: "Sesión cerrada" });
  }

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
      const refreshToken = await generateRefreshToken(user._id);
      await session.commitTransaction();

      return res
        .cookie("jwtToken", token, tokenCookieOptions)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
        .status(201)
        .json({
          message: "Usuario registrado correctamente",
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
