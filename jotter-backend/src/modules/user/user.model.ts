import mongoose, { Schema, Model } from "mongoose";
import { IUser, IOTP } from "./user.interface";

const otpSchema = new Schema<IOTP>(
  {
    value: String,
    createAT: Date,
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, "UserName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    profilePic: {
      type: String,
      default: "",
    },
    OTP: otpSchema,
  },
  { versionKey: false }
);

export const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);