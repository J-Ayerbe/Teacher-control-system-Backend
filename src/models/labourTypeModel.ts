import {Schema,model} from "mongoose";
import { LabourType as ILabourType } from "./interfaces/interfaces";
import { nanoid } from 'nanoid';


const LabourTypeSchema = new Schema<ILabourType>({
  _id: { type: String, default: () => nanoid() },
  idLabourType: {
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
