import { Schema, model,Types } from "mongoose";
import { Period as IPeriod } from "./interfaces/interfaces";
import { nanoid } from 'nanoid';


const PeriodSchema = new Schema<IPeriod>({
  _id: { type: String, default: () => nanoid()  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type:String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

PeriodSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
     ret.uid = ret._id;

  }
});

PeriodSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

  }
})
export const Period = model("Period", PeriodSchema);
