import { Schema, model, Types } from "mongoose";
import { Labour as ILabour } from "./interfaces/interfaces";
import { v4 as uuidv4 } from 'uuid';

const LabourSchema = new Schema<ILabour>({
  _id: { type: String, default: uuidv4, immutable: true },
  isActive:{
    type:Boolean,
    required:true,
  },
  labourType: {
    type: Types.ObjectId,
    ref:"LabourType",
    required: true,
  },
  idLabourType:{
    type:Number,
    requerid:true,
  },
  code:{
    type:String,
    requerid:true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedHours: {
    type: Number,
    required: true,
  },
});

export const Labour = model("Labour", LabourSchema);
