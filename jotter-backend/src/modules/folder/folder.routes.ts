import { Router } from "express";
import * as FolderController from "./folder.controller";
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";

const router = Router();


router.get("/allFOlders", tokenVerifyingMiddleware, FolderController.getAllFolders);


router.post("/folderCreate", tokenVerifyingMiddleware, FolderController.createFolder);


router.delete("/folderDelete/:FOLDER_ID", tokenVerifyingMiddleware, FolderController.deleteFolder);

export const FolderRoutes = router;