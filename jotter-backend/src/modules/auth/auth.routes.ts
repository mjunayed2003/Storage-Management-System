import { Router } from "express";
import * as AuthController from "./auth.controller";
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Public Route
router.post("/signIn", AuthController.signIn);

// Protected Routes (Token Required)
router.get("/isLogged", tokenVerifyingMiddleware, AuthController.isLogged);
router.post("/logout", AuthController.logout); // Logout usually doesn't strictly need auth, but good practice

export const AuthRoutes = router;