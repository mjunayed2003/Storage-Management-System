import bcryptjs from "bcryptjs";
import { UserModel } from "../user/user.model";
import { ILoginPayload } from "./auth.interface";
import { generateToken } from "../../utils/jwtHelper";

export const loginUser = async (payload: ILoginPayload) => {

  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw new Error("User not found");
  }


  const isPasswordValid = await bcryptjs.compare(payload.password, user.password!);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }


  const token = generateToken({ email: user.email, id: user._id });

  return { user, token };
};