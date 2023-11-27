import { tryCatchFn } from "./../helpers/customTryCatch";
import { AppError } from "./../helpers/errorHandler";
import { getAutoEvaluationFromDatabase } from "../helpers/getLabourFromAutoEvalToEdit";
import { NextFunction, Response } from "express";

export const getLabourFromAutoEvaluation = tryCatchFn(
  async (req: any, _res: Response, next: NextFunction) => {
    const autoevaluation = await getAutoEvaluationFromDatabase(req.params.id);
    if (!autoevaluation) {
      return next(new AppError("Autoevaluation not found", 404));
    }
    const { labour } = autoevaluation;
    req.labourType = labour.labourType;
    next();
  }
);
