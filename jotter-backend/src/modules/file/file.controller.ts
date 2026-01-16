import { Request, Response } from "express";
import * as FileService from "./file.service";
import { success_res, error_res } from "../../utils/responseHandler";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new Error("No file uploaded");
    
    const folderName = req.params.folderName as string; 

    const result = await FileService.uploadFile(req.user.email, folderName, req.file);
    success_res(res, { statusCode: 201, message: "File uploaded", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

export const listFiles = async (req: Request, res: Response) => {
  try {
    const result = await FileService.getAllFiles(req.user.email);

    success_res(res, {
      statusCode: 200,
      message: "All files",
      payload: result,
    });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};


export const fileDetails = async (req: Request, res: Response) => {
  try {
    const result = await FileService.getStorageDetails(req.user.email);
    success_res(res, { statusCode: 200, message: "Storage details", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

export const renameFile = async (req: Request, res: Response) => {
  try {
    const { newName } = req.body;
    
    // Update: id -> FILE_ID
    const fileId = req.params.FILE_ID as string;

    const result = await FileService.renameFile(req.user.email, fileId, newName);
    success_res(res, { statusCode: 200, message: "File renamed", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    // Update: id -> FILE_ID
    const fileId = req.params.FILE_ID as string;

    await FileService.deleteFile(req.user.email, fileId);
    success_res(res, { statusCode: 200, message: "File deleted" });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

export const updateTextContent = async (req: Request, res: Response) => {
  try {
    // Update: id -> FILE_ID (Body তেও FILE_ID নামেই রিসিভ করবে)
    const { content, FILE_ID } = req.body; 
    
    const result = await FileService.updateTextContent(req.user.email, FILE_ID, content);
    success_res(res, { statusCode: 200, message: "Content updated", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

export const duplicateFile = async (req: Request, res: Response) => {
  try {
    // Update: id -> FILE_ID
    const fileId = req.params.FILE_ID as string;

    const result = await FileService.duplicateFile(req.user.email, fileId);
    success_res(res, { statusCode: 201, message: "File duplicated", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};


// /allSearch
export const allSearch = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.body;
    const result = await FileService.searchFilesByKeyword(req.user.email, keyword);
    success_res(res, { statusCode: 200, message: "Search results", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// /search (Keyword + Type)
export const searchComplex = async (req: Request, res: Response) => {
  try {
    const { keyword, mimeType } = req.body;
    const result = await FileService.searchByKeywordAndType(req.user.email, keyword, mimeType);
    success_res(res, { statusCode: 200, message: "Search results", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// /type/:type (Changed URL slightly to avoid conflict with list/:folderName)
export const filterByType = async (req: Request, res: Response) => {
  try {
    const type = req.params.type as string; // e.g., 'pdf', 'image'
    const result = await FileService.getFilesByType(req.user.email, type);
    success_res(res, { statusCode: 200, message: `Files of type ${type}`, payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// /dateFilterFile
export const dateFilter = async (req: Request, res: Response) => {
  try {
    const { date } = req.body; // Format: "YYYY-MM-DD"
    const result = await FileService.getFilesByDate(req.user.email, date);
    success_res(res, { statusCode: 200, message: "Files by date", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// /recentFile
export const recentFiles = async (req: Request, res: Response) => {
  try {
    const result = await FileService.getRecentFiles(req.user.email);
    success_res(res, { statusCode: 200, message: "Recent files", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};


// Get Favorites
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const result = await FileService.getFavoriteFiles(req.user.email);
    success_res(res, { statusCode: 200, message: "Favorite files", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// Toggle Favorite
export const manageFavorite = async (req: Request, res: Response) => {
  try {
    const fileId = req.params.FILE_ID as string;
    const result = await FileService.toggleFavorite(req.user.email, fileId);
    
    const statusMsg = result.favorite ? "Added to favorites" : "Removed from favorites";
    success_res(res, { statusCode: 200, message: statusMsg, payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

// Search Favorites
export const searchFavorites = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.body;
    const result = await FileService.searchFavoriteFiles(req.user.email, keyword);
    success_res(res, { statusCode: 200, message: "Search result in favorites", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};


