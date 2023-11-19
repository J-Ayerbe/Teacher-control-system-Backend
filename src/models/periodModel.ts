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
  autoEvaluations: [{
    type: Types.ObjectId,
    ref: "AutoEvaluation",
  }],
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

PeriodSchema.methods.toJSON = function () {
  const { __v, _id, ...period } = this.toObject();
  period.uid = _id;
  return period;
};

export const Period = model("Period", PeriodSchema);
