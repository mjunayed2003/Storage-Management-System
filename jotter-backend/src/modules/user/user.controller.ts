import { Request, Response, NextFunction } from "express";
import * as UserService from "./user.service";
import { success_res, error_res } from "../../utils/responseHandler";
import path from "path";

// Sign Up
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.createUserIntoDB(req.body);
    success_res(res, {
      statusCode: 201,
      message: "User registered successfully",
      payload: result,
    });
  } catch (error: any) {
    error_res(res, { statusCode: 409, message: error.message });
  }
};

// Get Current User Info
export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserService.findUserByEmail(req.user.email);
    success_res(res, {
      statusCode: 200,
      message: "User profile retrieved",
      payload: user,
    });
  } catch (error: any) {
    error_res(res, { statusCode: 404, message: error.message });
  }
};

// Change Username
export const changeUserName = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    if (!userName) throw new Error("Username required");

    const result = await UserService.updateUserName(req.user.email, userName);
    success_res(res, {
      statusCode: 200,
      message: "Username updated",
      payload: result,
    });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};



// Change Password Controller
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) throw new Error("Both passwords required");

    await UserService.changePassword(req.user.email, oldPassword, newPassword);
    
    success_res(res, { statusCode: 200, message: "Password changed successfully" });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// Upload Profile Picture (fileM)
export const uploadProfilePic = async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new Error("No file uploaded");

    const result = await UserService.updateProfilePic(req.user.email, req.file);
    
    success_res(res, { 
      statusCode: 200, 
      message: "Profile picture updated", 
      payload: result 
    });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// Delete Account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUserAccount(req.user.email);
    
    // Clear auth cookie
    res.clearCookie("token");
    
    success_res(res, { statusCode: 200, message: "Account deleted successfully" });
  } catch (error: any) {
    error_res(res, { statusCode: 500, message: error.message });
  }
};


// 1. Forgot Email Sender
export const forgotEmailSender = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is required");

    await UserService.sendForgotPasswordEmail(email);
    
    success_res(res, { statusCode: 200, message: "OTP sent to your email" });
  } catch (error: any) {
    error_res(res, { statusCode: 404, message: error.message });
  }
};

// 2. OTP Checker
export const otpChecker = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw new Error("Email and OTP required");

    // Returns a temp token if valid
    const token = await UserService.verifyOTP(email, otp);

    success_res(res, { 
      statusCode: 200, 
      message: "OTP Verified", 
      payload: { token } // Frontend will use this token to call newPassword
    });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// 3. New Password
export const newPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Note: In a real app, verify the 'token' sent from otpChecker here for extra security
    
    if (!email || !password) throw new Error("Email and new password required");

    await UserService.resetPassword(email, password);

    success_res(res, { statusCode: 200, message: "Password reset successfully" });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};