import { renewToken } from "../helpers/jwt";
import { AppError } from "./../helpers/errorHandler";
import { NextFunction, Response } from "express";
import {jwtSecret} from "../config/jwtConfig";

import jwt from "jsonwebtoken";

export const validarJWT = async (req, res: Response, next: NextFunction) => {
  const refreshTokenCookie: string = req.cookies.refreshToken;
  if (!refreshTokenCookie) {
    console.log("No refresh token provided");
    return next(new AppError("No refresh token provided", 401));
  }
  const tokenCookie: string = req.cookies.jwtToken;

  let currentToken;


  if (!tokenCookie) {
    try {
      const token= await renewToken(refreshTokenCookie);
      currentToken = jwt.decode(token);
      res.cookie("jwtToken", token, { httpOnly: true });
    } catch (msgError) {
      console.log(msgError);
      return next(new AppError(msgError, 401));
    }
  } else {
    try {
      currentToken = jwt.verify(tokenCookie, jwtSecret!);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        try {
          const  token = await renewToken(refreshTokenCookie);
          currentToken = jwt.decode(token);
          res.cookie("jwtToken", token, { httpOnly: true });
        } catch (error) {
          console.log(error);
          return next(new AppError("Could not refresh token", 401));
        }
      } else {
        console.log(error.name);
        console.log("El token es invalido");
        return next(new AppError("Invalid token", 401));
      }
    }
  }

  req.uid = currentToken.uid;
  req.role = currentToken.role;

  next();
};
