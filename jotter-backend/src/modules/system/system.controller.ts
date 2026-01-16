import { Request, Response } from "express";
import mongoose from "mongoose";
import { success_res, error_res } from "../../utils/responseHandler";

export const resetDatabase = async (req: Request, res: Response) => {
  try {
    // Check environment to prevent accidental reset in production
    if (process.env.NODE_ENV === "production") {
      throw new Error("Cannot reset database in production environment");
    }

    // Drop the entire database
    await mongoose.connection.dropDatabase();

    success_res(res, {
      statusCode: 200,
      message: "Database reset successfully! All data has been cleared.",
    });
  } catch (error: any) {
    error_res(res, { statusCode: 500, message: error.message });
  }
};  