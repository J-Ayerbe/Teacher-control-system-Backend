import { Educator } from "./interfaces/interfaces";
import { Schema, model, Types } from "mongoose";

const EducatorSchema = new Schema<Educator>({
  id: {
    type: Number,
    sparse: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  idType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  labours:[{
    type: Types.ObjectId,
      ref: "Labours",
  }],
  joinDate: {
    type: Date,
    default: Date.now,
  },
  picture: {
    type: String,
    default: null,
  },
  role:{
    type:String,
    required:true
  },
  notifications: [
    {
      type: Types.ObjectId,
      ref: "Notification",
    },
  ],
    autoEvaluations: [
    {
      type: Types.ObjectId,
      ref: "AutoEvaluation",
    },
  ],
});

EducatorSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model("Educator", EducatorSchema);
