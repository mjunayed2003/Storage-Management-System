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
    const folderName = req.params.folderName as string;

    const result = await FileService.getFilesByFolder(req.user.email, folderName);
    success_res(res, { statusCode: 200, message: "File list", payload: result });
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