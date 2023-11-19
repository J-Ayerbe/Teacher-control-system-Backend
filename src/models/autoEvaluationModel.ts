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
        idEvaluator:{
            type:String,
            ref:"Educator",
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
    },
    evaluated:{
        idEvaluated:{
            type:String,
            ref:"Educator",
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
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
        idLabour:{
            type:String,
            ref:"Labour",
            required:true
        },
        assignedHours:{
            type:Number,
            required:true
        },
        isActive:{
            type:Boolean,
            required:true
        },
        labourType:{
            idlabourType:{
                type:Number,
                required:true
            },
            code:{
                type:String,
                required:true
            },
            description:{
                type:String,
                required:true
            }
        }
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
