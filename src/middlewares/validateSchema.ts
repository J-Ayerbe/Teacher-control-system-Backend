import { NextFunction, Request, Response } from "express"
import {z} from "zod"

type ValidationSchema = ReturnType<typeof z.object>

const validateSchema = (schema:ValidationSchema) => async (req:Request,
 res:Response, next:NextFunction) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
}

export default validateSchema