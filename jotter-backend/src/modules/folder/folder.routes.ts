import { Router } from "express";
import * as FolderController from "./folder.controller";
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// 1. Create Folder
router.post("/folderCreate", tokenVerifyingMiddleware, FolderController.createFolder);

// 2. Get All Folders
router.get("/allFOlders", tokenVerifyingMiddleware, FolderController.getAllFolders);

// 3. Delete Folder
router.delete("/folderDelete/:FOLDER_ID", tokenVerifyingMiddleware, FolderController.deleteFolder);

export const FolderRoutes = router;