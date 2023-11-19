import { Schema, model } from "mongoose";
import { Notification as INotification } from "./interfaces/interfaces";
import { nanoid } from 'nanoid';

const NotificationSchema = new Schema<INotification>({
    _id: { type: String, default: () => nanoid()  },
    title:{
        type:String,
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    }
});

NotificationSchema.methods.toJSON = function () {
  const { __v, _id, ...period } = this.toObject();
  period.uid = _id;
  return period;
};


export const Notification = model("Notification", NotificationSchema);
