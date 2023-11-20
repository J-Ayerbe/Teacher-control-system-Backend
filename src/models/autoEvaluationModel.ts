import { Schema, model } from "mongoose";
import { AutoEvaluation as IAutoEvaluation } from "./interfaces/interfaces";
import { nanoid } from 'nanoid';


const AutoEvaluationSchema = new Schema<IAutoEvaluation>({
      _id: { type: String, default: () => nanoid()  },
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
        idPeriod:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        year:{
            type:String,
            required:true
        },
        semester:{
            type:Number,
            required:true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true
        }
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
    },
    suggestions:{
        type:String
    },
    act:{
        type:Boolean,
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
