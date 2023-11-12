import { Schema, model } from "mongoose";
import { Notification as INotification } from "./interfaces/interfaces";
import { v4 as uuidv4 } from 'uuid';

const NotificationSchema = new Schema<INotification>({
    _id: { type: String, default: uuidv4, immutable: true },
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
