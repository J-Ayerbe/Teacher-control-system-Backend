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

NotificationSchema.set('toJSON', {
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
     ret.uid = ret._id;

  }
});

NotificationSchema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

  }
})
export const Notification = model("Notification", NotificationSchema);
