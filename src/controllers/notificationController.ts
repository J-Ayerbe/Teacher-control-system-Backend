import { Request,Response} from "express";
import { Notification } from "../models/notificationModel";


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export class NotificationController {
  static async getNotification(_req: any, res: Response) {
        res.send("getNotification");
  }

  static async createNotification(req: Request, res: Response) {
        const { title, content, email , date } = req.body;
        const data = new Notification({ title, content, email , date });
        await data.save();

        return res.status(201).json({
            message: "Notification created "
        });
  }

  static async sendEmail(req: any, res: Response) {
      try {
          const data = req.body;
          const msj = "AutoEvaluation <"+process.env.EMAIL_USER+">";
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