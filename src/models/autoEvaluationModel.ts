import { Schema, model,Types } from "mongoose";
import { AutoEvaluation as IAutoEvaluation } from "./interfaces/interfaces";
import { v4 as uuidv4 } from 'uuid';

const AutoEvaluationSchema = new Schema<IAutoEvaluation>({
     _id: { type: String, default: uuidv4, immutable: true },
    state:{
        type:String,
        required:true,
        enum:["En ejecución","Terminado","Suspendido"]
    },
    puntuation:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    period:{
        type:Types.ObjectId,
        ref:"Period",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    evaluator:{
        type:String,
        ref:"Educator",
        required:true
    },
    evaluated:{
        type:String,
        ref:"Educator",
        required:true
    },
    results:{
        type:String,
        required:true
    },
    suggestions:{
        type:String
    },
    act:{
        type:Boolean,
        enum:[0,1]
    },
    observation:{
        type:String,
    },
    labour:{
        type:String,
        ref:"Labour",
        required:true
    },
    evidencesLink:{
        type:String
    }
});

AutoEvaluationSchema.methods.toJSON = function () {
  const { __v, _id, ...autoEvaluation } = this.toObject();
  autoEvaluation.uid = _id;
  return autoEvaluation;
};

export const AutoEvaluation = model("AutoEvaluation", AutoEvaluationSchema);
