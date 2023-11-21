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
LabourSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
     ret.uid = ret._id;
    delete ret._id;
  }
});

LabourSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const Labour = model("Labour", LabourSchema);
