import { Schema, model } from "mongoose";
import { Notification } from "./interfaces/interfaces";

const NotificationSchema = new Schema<Notification>({
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

export default model("Notification", NotificationSchema);