import { UserModel } from "./user.model";
import FoldersModel from "../folder/folder.model";
import { hashTextGeneration } from "../../utils/hashGenerator";
import { IUser } from "./user.interface";
import bcryptjs from "bcryptjs";
import fs from "fs";
import path from "path";
import { sendEmail } from "../../utils/emailSender";
import { generateToken } from "../../utils/jwtHelper";


// Create a new user and root folder
export const createUserIntoDB = async (payload: IUser) => {
  const existingUser = await UserModel.findOne({
    $or: [{ email: payload.email }, { userName: payload.userName }],
  });

  if (existingUser) {
    throw new Error("User or Email already exists");
  }

  // Hash password
  payload.password = await hashTextGeneration(payload.password!);

  const newUser = await UserModel.create(payload);

  // Create root folder for user
  await FoldersModel.create({
    userEmail: payload.email,
    folderName: "root",
  });

  return newUser;
};

// Find user by email
export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

// Update user profile picture
export const updateUserProfilePic = async (email: string, filePath: string) => {
  const fileURL = process.env.BASE_URL + "/" + filePath;
  return await UserModel.findOneAndUpdate(
    { email },
    { $set: { profilePic: fileURL } },
    { new: true }
  );
};

// Change username
export const updateUserName = async (email: string, newName: string) => {
  const isTaken = await UserModel.findOne({ userName: newName });
  if (isTaken) throw new Error("Username already taken");

  return await UserModel.findOneAndUpdate(
    { email },
    { userName: newName },
    { new: true }
  );
};



// Change Password Logic
export const changePassword = async (email: string, oldPass: string, newPass: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  // Verify old password
  const isMatch = await bcryptjs.compare(oldPass, user.password!);
  if (!isMatch) throw new Error("Old password is incorrect");

  // Hash new password
  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(newPass, salt);

  // Update DB
  await UserModel.findOneAndUpdate({ email }, { password: hashedPass });
  return true;
};

// Update Profile Picture Logic
export const updateProfilePic = async (email: string, file: Express.Multer.File) => {
  // Create relative URL
  const fileURL = `uploads/profilePictures/${file.filename}`;
  
  const updatedUser = await UserModel.findOneAndUpdate(
    { email },
    { profilePic: fileURL },
    { new: true }
  );
  return updatedUser;
};

// Delete Account Logic
export const deleteUserAccount = async (email: string) => {
  // 1. Delete User from DB
  await UserModel.findOneAndDelete({ email });

  // 2. Delete User's Folders from DB
  await FoldersModel.deleteMany({ userEmail: email });

  // 3. Delete User's Files from DB (Uncomment if FileModel exists)
  // await FileModel.deleteMany({ userEmail: email });

  // 4. Delete Physical Folder (uploads/userEmail)
  const userFolderPath = path.join(__dirname, `../../../uploads/${email}`);
  if (fs.existsSync(userFolderPath)) {
    fs.rmSync(userFolderPath, { recursive: true, force: true });
  }

  return true;
};





// 1. Forgot Password Service
export const sendForgotPasswordEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found with this email");

  // Generate 6 digit OTP
  const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

  // Save OTP to DB
  await UserModel.findOneAndUpdate(
    { email },
    { OTP: { value: otpValue, createAT: expiresAt } }
  );

  // Email Template
  const emailBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
      <h2>Password Reset Request</h2>
      <p>Your OTP is:</p>
      <h1 style="color: #4CAF50;">${otpValue}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    </div>
  `;

  await sendEmail(email, "Forgot Password OTP", emailBody);
  return true;
};

// 2. OTP Checker Service
export const verifyOTP = async (email: string, otp: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.OTP?.value !== otp) {
    throw new Error("Invalid OTP");
  }

  const now = new Date();
  const otpTime = new Date(user.OTP.createAT);

  if (now > otpTime) {
    throw new Error("OTP Expired");
  }

  // Generate a temporary token for resetting password (valid for 5 mins)
  const tempToken = generateToken({ email, purpose: "reset-password" });
  
  return tempToken;
};

// 3. New Password Service
export const resetPassword = async (email: string, newPass: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(newPass, salt);

  await UserModel.findOneAndUpdate(
    { email },
    { 
      password: hashedPass, 
      $unset: { OTP: 1 } // Remove OTP after successful reset
    }
  );

  return true;
};

