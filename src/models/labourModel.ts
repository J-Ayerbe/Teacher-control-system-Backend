import { Schema, model, Types } from "mongoose";
import { Labour as ILabour } from "./interfaces/interfaces";
import { v4 as uuidv4 } from 'uuid';

const LabourSchema = new Schema<ILabour>({
  _id: { type: String, default: uuidv4, immutable: true },
  description: {
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean,
    required:true
  },
  labourType: {
    type: Types.ObjectId,
    ref:"LabourType",
    required: true,
  },
  assignedHours: {
    type: Number,
    required: true,
  },
  autoEvaluations: [
    {
      type: Types.ObjectId,
      ref: "AutoEvaluation",
    },
  ],
});

export const Labour = model("Labour", LabourSchema);
