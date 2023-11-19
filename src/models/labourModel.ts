import { Schema, model } from "mongoose";
import { Labour as ILabour } from "./interfaces/interfaces";
import { nanoid } from 'nanoid';


const LabourSchema = new Schema<ILabour>({
  _id: { type: String, default: () => nanoid()  },
  nameWork:{
   type: String,
    required: true, 
  },
 isActive: {
    type: Boolean,
    required: true,
  },
  labourType: {
    idlabourType: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  assignedHours: {
    type: Number,
    required: true,
  },
});

export const Labour = model("Labour", LabourSchema);
