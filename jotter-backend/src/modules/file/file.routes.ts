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

// 1. Search Only Keyword
router.post("/allSearch", tokenVerifyingMiddleware, FileController.allSearch);

// 2. Search Keyword & Type
router.post("/search", tokenVerifyingMiddleware, FileController.searchComplex);

// 3. Filter by Type (Use /type/pdf instead of /list/pdf to avoid conflict with folder list)
router.get("/type/:type", tokenVerifyingMiddleware, FileController.filterByType);

// 4. Date Filter
router.post("/dateFilterFile", tokenVerifyingMiddleware, FileController.dateFilter);

// 5. Recent Files
router.get("/recentFile", tokenVerifyingMiddleware, FileController.recentFiles);

export const FileRoutes = router;