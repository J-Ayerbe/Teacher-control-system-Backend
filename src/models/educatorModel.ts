import { DocentType, EducatorRole, Educator as IEducator } from './interfaces/interfaces';
import { Schema, model } from "mongoose";
import { nanoid } from 'nanoid';

const EducatorSchema = new Schema<IEducator>({
  _id: { type: String, default: () => nanoid()  },
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
    enum: Object.values(DocentType),
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
    type: String,
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
   role: {
    type: String,
    default: "Docente",
    enum: Object.values(EducatorRole),
  },
  notifications: [
  {
      type:String,
      ref: "Notification",
  },
  ],
  autoEvaluations: [
  {
    type:String,
    ref: "AutoEvaluation",
  },
  ],
});

EducatorSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
     ret.uid = ret._id;
    delete ret._id;
    delete ret.password
  }
});

EducatorSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})
export const Educator = model("Educator", EducatorSchema);