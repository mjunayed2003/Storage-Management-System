import { Router } from "express";
import * as UserController from "./user.controller";
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";
import { upload } from "../../config/multer.config";

const router = Router();

// Public Routes
router.post("/signUP", UserController.registerUser);

// Private Routes (Requires Token)
router.get("/me", tokenVerifyingMiddleware, UserController.getMyProfile);
router.post("/changeUserName", tokenVerifyingMiddleware, UserController.changeUserName);

router.post("/changePassword", tokenVerifyingMiddleware, UserController.changePassword);

// Upload Profile Pic (Corresponds to your "fileM")
router.post("/upload-profile-pic", 
  tokenVerifyingMiddleware, 
  upload.single("profile"), // "profile" is the key name in form-data
  UserController.uploadProfilePic
);

// Delete Account
router.delete("/deleteAccount", tokenVerifyingMiddleware, UserController.deleteAccount);


// Forgot Password Routes
router.post("/forgotEmailSender", UserController.forgotEmailSender);
router.post("/otpChecker", UserController.otpChecker);
router.post("/newPassword", UserController.newPassword);

export const UserRoutes = router;