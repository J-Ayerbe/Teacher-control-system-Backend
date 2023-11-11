import {Schema,model} from "mongoose";
import { LabourType as ILabourType } from "./interfaces/interfaces";

const LabourTypeSchema = new Schema<ILabourType>({
  id: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});


export const LabourType = model("LabourType", LabourTypeSchema);
