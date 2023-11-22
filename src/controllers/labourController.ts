import { tryCatchFn } from "./../helpers/customTryCatch";
import { AppError } from "./../helpers/errorHandler";
import { NextFunction, Request, Response } from "express";
import { Labour } from "../models/labourModel";
import { LabourType } from "../models/labourTypeModel";
import { Educator } from "../models/educatorModel";
import { DocentType } from "../models/interfaces/interfaces";

export class LabourController {
  static async getLabours(_req: Request, res: Response) {
    try {
      const response = await Labour.find().populate("labourType").exec();

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async getLabourById(req: Request, res: Response) {
    try {
      const response = await Labour.findById(req.params.id)
        .populate("labourType")
        .exec();

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static createLabour = tryCatchFn(
    async (req: Request, res: Response, next: NextFunction) => {
      const { labourType: labourTypeUid } = req.body;
      const labourType = await LabourType.findById(labourTypeUid);

      if (!labourType) {
        return next(new AppError("El tipo de labor no se ha encontrado", 404));
      }
      const labour = new Labour(req.body);

      await labour.save();
      res.status(201).json({ message: "Labor creada correctamente" });
    }
  );

  static async createLabourType(req: Request, res: Response) {
    const labourType = new LabourType(req.body);
    await labourType.save();
    res.status(201).json({ message: "createLabourType" });
  }

  static async updateLabour(req: Request, res: Response) {
    try {
      console.log("llego");
      const update = req.body;
      const { id } = req.params;
      const updatedLabour = await Labour.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      );
      if (updatedLabour) {
        res.status(200).json({ message: "updateLabour", data: updatedLabour });
      } else {
        res.status(404).json({ message: "Labour not found" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async deleteLabour(req: Request, res: Response) {
    try {
      const deletedLabour = await Labour.findByIdAndDelete(req.params.id);
      if (deletedLabour) {
        res.status(200).json({ message: "deleteLabour", data: deletedLabour });
      } else {
        res.status(404).json({ message: "Labour not found" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getLabourTypes(_req: Request, res: Response) {
    try {
      const response = await LabourType.find();

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async assignLabour(req: Request, res: Response) {
    try {
      const { uid, labours } = req.body; // assuming labours is an array of labour IDs

      const educator = await Educator.findById(uid);

      if (!educator) {
        return res.status(404).json({ message: "Educator not found" });
      }
      const educatorType = educator.docentType;

      const docentTypeHours = {
        [DocentType.Catedra]: {
          max: 12,
          min: 2,
        },
        [DocentType.Planta]: {
          max: 8,
          min: 4,
        },
        [DocentType.TC]: {
          max: 16,
          min: 6,
        },
        [DocentType.Otro]: {
          max: 18,
          min: 2,
        },
      };
      let labourPromises = labours.map((labourId) => Labour.findById(labourId));

      const laboursData = await Promise.all(labourPromises);

      for (let labour of laboursData) {
        if (!labour) {
          throw new Error(`Labour with id ${labour._id} not found`);
        }
        if (labour.assignedHours > docentTypeHours[educatorType].max) {
          throw new Error(
            `Labour with id ${labour._id} has more hours than allowed`
          );
        }
        if (labour.assignedHours < docentTypeHours[educatorType].min) {
          throw new Error(
            `Labour with id ${labour._id} has less hours than allowed`
          );
        }
      }

      educator.labours = laboursData;
      await educator.save();

      return res.status(200).json({ message: "Labours assigned correctly" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async getTypeLabourById(req: Request, res: Response) {
    try {
      const response = await LabourType.findById(req.params.id);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
