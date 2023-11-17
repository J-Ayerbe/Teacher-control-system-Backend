import { Educator as IEducator } from "./interfaces/interfaces";
import { Schema, model, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const EducatorSchema = new Schema<IEducator>({
  _id: { type: String, default: uuidv4, immutable: true },
  identification: {
    type: String,
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
    required:true,
  },
  docentType: {
    type: String,
    enum:["Tiempo Completo", "Planta", "Cátedra"],
    validate: {
      validator: function() {
        // If role is "Docente", docentType must be provided
        return !(this.role === "Docente" && !this.docentType);
      },
      message: "docentType is required when role is Docente"
    }
  },
  idType: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
  },
  firstName:{
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  labours:[{
    type: Types.ObjectId,
      ref: "Labour",
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
    required:true,
    enum:["Coordinador","Decano","Docente"]
  },
  notifications: [
    {
      type:String,
      ref: "Notification",
    },
  ],
    autoEvaluations: [
    {
      type:String
    },
  ],
});

EducatorSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export const Educator = model("Educator", EducatorSchema);