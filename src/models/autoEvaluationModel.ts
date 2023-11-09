import { Schema, model,Types } from "mongoose";
import { AutoEvaluation } from "./interfaces/interfaces";

const AutoEvaluationSchema = new Schema<AutoEvaluation>({
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
    date:{
        type:Date,
        required:true
    },
    evaluator:{
        type:Types.ObjectId,
        ref:"Educator",
        required:true
    },
    evaluated:{
        type:Types.ObjectId,
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
        type:Number,
        enum:[0,1]
    },
    observation:{
        type:String
    },
    labour:{
        type:Types.ObjectId,
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

export default model("AutoEvaluation", AutoEvaluationSchema);