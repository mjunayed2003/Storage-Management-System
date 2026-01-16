import { Router } from "express";
import * as UserController from "./user.controller";
import * as AuthController from "../auth/auth.controller"; 
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../config/multer.config";

const router = Router();


router.post("/user/signUP", UserController.registerUser);
router.post("/user/signIn", AuthController.signIn);
router.get("/user/isLogged", tokenVerifyingMiddleware, AuthController.isLogged);
router.get("/user/logout", AuthController.logout);


router.post("/user/forgotEmailSender", UserController.forgotEmailSender);
router.post("/user/otpChecker", UserController.otpChecker);
router.post("/user/newPassword", UserController.newPassword);


router.post("/user/changePassword", tokenVerifyingMiddleware, UserController.changePassword);
router.post("/user/changeUserName", tokenVerifyingMiddleware, UserController.changeUserName);

router.post("/user/fileM", 
  tokenVerifyingMiddleware, 
  upload.single("profile"), 
  UserController.uploadProfilePic
);

router.delete("/accountDelete", tokenVerifyingMiddleware, UserController.deleteAccount);

export const UserRoutes = router;