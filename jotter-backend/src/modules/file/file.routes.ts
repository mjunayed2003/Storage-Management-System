import { Router } from "express";
import * as FileController from "./file.controller";
import { tokenVerifyingMiddleware } from "../../middlewares/auth.middleware";
import { fileUpload } from "../../config/fileMulter.config";

const router = Router();


router.post("/upload/:folderName", 
  tokenVerifyingMiddleware, 
  fileUpload.single("files"),
  FileController.uploadFile
);


router.post("/list/:type", tokenVerifyingMiddleware, FileController.filterByType);


router.get("/folderFiles/:folderName", tokenVerifyingMiddleware, FileController.listFiles);


router.get("/fileDetails", tokenVerifyingMiddleware, FileController.fileDetails);


router.post("/recentFile", tokenVerifyingMiddleware, FileController.recentFiles);

router.post("/allSearch", tokenVerifyingMiddleware, FileController.allSearch);
router.post("/search", tokenVerifyingMiddleware, FileController.searchComplex);
router.post("/dateFilterFile", tokenVerifyingMiddleware, FileController.dateFilter);


router.post("/favorite", tokenVerifyingMiddleware, FileController.getFavorites);
router.post("/favorite/:FILE_ID", tokenVerifyingMiddleware, FileController.manageFavorite);
router.post("/fav_search", tokenVerifyingMiddleware, FileController.searchFavorites);


router.patch("/rename/:FILE_ID", tokenVerifyingMiddleware, FileController.renameFile);
router.delete("/fileDelete/:FILE_ID", tokenVerifyingMiddleware, FileController.deleteFile);
router.post("/duplicate/:FILE_ID", tokenVerifyingMiddleware, FileController.duplicateFile);


router.post("/fileTExtUpdate", tokenVerifyingMiddleware, FileController.updateTextContent); 

export const FileRoutes = router;