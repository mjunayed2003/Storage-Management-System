import { Router } from "express";
import * as FileController from "./file.controller";
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";
import { fileUpload } from "../../config/fileMulter.config";

const router = Router();

// Upload
router.post("/upload/:folderName", 
  tokenVerifyingMiddleware, 
  fileUpload.single("file"), 
  FileController.uploadFile
);

// List
router.get("/list/:folderName", tokenVerifyingMiddleware, FileController.listFiles);

// Details
router.get("/fileDetails", tokenVerifyingMiddleware, FileController.fileDetails);

// --- ID Related Routes (Updated to :FILE_ID) ---

// Rename
router.patch("/rename/:FILE_ID", tokenVerifyingMiddleware, FileController.renameFile);

// Delete
router.delete("/fileDelete/:FILE_ID", tokenVerifyingMiddleware, FileController.deleteFile);

// Duplicate
router.post("/duplicate/:FILE_ID", tokenVerifyingMiddleware, FileController.duplicateFile);

// Text Update (Body te FILE_ID pathabo)
router.put("/textFileTile", tokenVerifyingMiddleware, FileController.updateTextContent);

export const FileRoutes = router;