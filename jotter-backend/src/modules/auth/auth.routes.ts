import { Router } from "express";
import * as AuthController from "./auth.controller";
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";
import passport from "passport"; 

const router = Router();

// Public Route
router.post("/signIn", AuthController.signIn);

// Protected Routes (Token Required)
router.get("/isLogged", tokenVerifyingMiddleware, AuthController.isLogged);
router.post("/logout", AuthController.logout); // 



// Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/signin" }),
  AuthController.googleAuthCallback
);


export const AuthRoutes = router;