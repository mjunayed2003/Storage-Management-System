import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error_res } from "../utils/responseHandler";
import { UserModel } from "../modules/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const tokenVerifyingMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return error_res(res, { statusCode: 401, message: "Unauthorized access" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return error_res(res, { statusCode: 403, message: "Invalid token" });
    }

    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      return error_res(res, { statusCode: 404, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error: any) {
    error_res(res, { statusCode: 500, message: "Token verification failed" });
  }
};