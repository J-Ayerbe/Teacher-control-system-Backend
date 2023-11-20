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
      type: String,
      ref: "LabourType",
      required: true,
  },
  assignedHours: {
    type: Number,
    required: true,
  },
});
LabourSchema.methods.toJSON = function () {
  const { __v, _id,  ...labor } = this.toObject();
  labor.uid = _id;
  return labor;
};

export const Labour = model("Labour", LabourSchema);
