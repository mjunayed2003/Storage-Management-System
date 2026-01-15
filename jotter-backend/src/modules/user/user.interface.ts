import { Document } from "mongoose";

export interface IOTP {
  value: string;
  createAT: Date;
}

export interface IUser extends Document {
  userName: string;
  email: string;
  password?: string;
  createdAt: Date;
  profilePic?: string;
  OTP?: IOTP;
}