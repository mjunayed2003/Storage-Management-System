import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,

    pass: process.env.SMTP_PASS?.replace(/\s+/g, ""), 
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {


  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP Credentials missing in .env file");
  }

  try {
    const info = await transporter.sendMail({
      from: `"Jotter App" <${process.env.SMTP_USER}>`, 
      to,
      subject,
      html,
    });
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};