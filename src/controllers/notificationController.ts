import { Request, Response } from "express";
import { Notification } from "../models/notificationModel";
import { getEmail, getPort, getUser, getPass } from "../helpers/getEmailData";
import { Notification } from "../models/notificationModel";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: getEmail,
  port: getPort || 465,
  secure: true,
  auth: {
    user: getUser,
    pass: getPass,
  },
});

export class NotificationController {
  static async getNotification(_req: any, res: Response) {
    res.send("getNotification");
  }

  static async createNotification(req: any, _res: Response) {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        return notification._id;
    }
    catch (error) {
        return null;        
    }       
  }

  static async sendEmail(req: any, res: Response) {
    try {
        const data = req.body;
        const msj = "AutoEvaluation <"+getEmail+">";
        await transporter.sendMail({             
            from: msj,
            to: data.email,
            subject: "Notification from AutoEvaluation",
            html: `<p>${data.content}</p>`,
        });
        res.status(200).json({ message: "Email sent" });
    }
    catch (error) {
        res.status(500).json({ message: "Error sending email" });         
    }       
  } 
}
