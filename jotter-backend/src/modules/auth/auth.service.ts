import bcryptjs from "bcryptjs";
import { UserModel } from "../user/user.model";
import { ILoginPayload } from "./auth.interface";
import { generateToken } from "../../utils/jwtHelper";

export const loginUser = async (payload: ILoginPayload) => {
  // Find user by email
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw new Error("User not found");
  }

  // Check password
  const isPasswordValid = await bcryptjs.compare(payload.password, user.password!);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Generate Token
  const token = generateToken({ email: user.email, id: user._id });

  return { user, token };
};