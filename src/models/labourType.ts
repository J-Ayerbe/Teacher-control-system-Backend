import {Schema,model} from "mongoose";

const LabourTypeSchema = new Schema({
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

export default model("LabourType", LabourTypeSchema);