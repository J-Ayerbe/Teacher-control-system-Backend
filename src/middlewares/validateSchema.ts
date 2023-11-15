import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

type ValidationSchema = ReturnType<typeof z.object>;

const validateSchema =
  (schema: ValidationSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error:any) {
      const validationError = fromZodError(error);
      return res.status(400).json({ error: validationError.message });
    }
  };

export default validateSchema;
