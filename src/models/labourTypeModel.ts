import {Schema,model} from "mongoose";
import { LabourType as ILabourType } from "./interfaces/interfaces";
import { nanoid } from 'nanoid';


const LabourTypeSchema = new Schema<ILabourType>({
  _id: { type: String, default: () => nanoid() },
  idLabourType: {
    type: Number,
    required: true,
    unique:true
  },
  code: {
    type: String,
    required: true,
    unique:true
  },
  description: {
    type: String,
    required: true,
  },
});

// LabourTypeSchema.methods.toJSON = function () {
//   const { __v, _id,  ...laborType } = this.toObject();
//   laborType.uid = _id;
//   return laborType;
// };

LabourTypeSchema.set('toJSON', {
  versionKey: false,
  transform: function (_doc, ret) {
    // remove these props when object is serialized
     ret.uid = ret._id;
    delete ret._id;
  }
});

LabourTypeSchema.set('toObject', {
  transform: (_document, returnedObject) => {
    returnedObject.uid = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
export const LabourType = model("LabourType", LabourTypeSchema);
