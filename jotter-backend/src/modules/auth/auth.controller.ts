import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { success_res, error_res } from "../../utils/responseHandler";
import { generateToken } from "../../utils/jwtHelper";

// Sign In Controller
export const signIn = async (req: Request, res: Response) => {
  try {
    const { user, token } = await AuthService.loginUser(req.body);

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    success_res(res, {
      statusCode: 200,
      message: "Login successful",
      payload: { token }, // Optional: send token in body too
    });
  } catch (error: any) {
    error_res(res, { statusCode: 401, message: error.message });
  }
};

// Check if Logged In
export const isLogged = async (req: Request, res: Response) => {
  try {
    // req.user is populated by the middleware
    success_res(res, {
      statusCode: 200,
      message: "User is authenticated",
      payload: req.user,
    });
  } catch (error: any) {
    error_res(res, { statusCode: 401, message: "Not authenticated" });
  }
};

// Logout Controller
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  success_res(res, { statusCode: 200, message: "Logged out successfully" });
};


// Google Callback Controller
export const googleAuthCallback = async (req: Request, res: Response) => {
  try {

    const user: any = req.user;

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/signin?error=auth_failed`);
    }


    const token = generateToken({ email: user.email, id: user._id });


    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.redirect(`${process.env.CLIENT_URL}/`); 
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.redirect(`${process.env.CLIENT_URL}/signin?error=server_error`);
  }
};