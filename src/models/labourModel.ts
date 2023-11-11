import { Schema, model, Types } from "mongoose";
import { Labour as ILabour } from "./interfaces/interfaces";

const LabourSchema = new Schema<ILabour>({
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
