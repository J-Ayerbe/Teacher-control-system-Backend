import { Request, Response, NextFunction } from "express";
import { Educator } from "../models/educatorModel";
import { AppError } from "../helpers/errorHandler";
import { tryCatchFn } from "../helpers/customTryCatch";

export class EducatorController {
  static getEducators = tryCatchFn(async(_req: Request, res: Response)=> {
    const educators = await Educator.find();
    res.status(200).json({ educators });
  })

  static getEducatorById = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { uid } = req.params;
      const educator = await Educator.findById(uid);

      if (!educator) {
        return next(new AppError("Educator not found", 404));
      }

      res.status(200).json({ educator });
    }
  );

   static createEducator = tryCatchFn(async(req: Request, res: Response) =>{
    const educator = new Educator(req.body);
    await educator.save();
    return res.status(201).json({ message: "Educator created" });
  })

  static updateEducator = tryCatchFn(async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = req.body;

    const updatedEducator = await Educator.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Educador actualizado", educator: updatedEducator });
  })

  static deleteEducator = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const deletedEducator = await Educator.findByIdAndDelete(id);

      if (!deletedEducator) {
        return next(new AppError("Educador no encontrado", 404));
      }
      res
        .status(200)
        .json({ message: "Educador eliminado", educator: deletedEducator });
    }
  );
}
