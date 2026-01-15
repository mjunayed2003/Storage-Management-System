import { Request, Response } from "express";
import * as FolderService from "./folder.service";
import { success_res, error_res } from "../../utils/responseHandler";

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { folderName } = req.body;
    if (!folderName) throw new Error("Folder Name is required");

    const result = await FolderService.createFolder(req.user.email, folderName);
    success_res(res, { statusCode: 201, message: `Folder '${folderName}' created`, payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

export const getAllFolders = async (req: Request, res: Response) => {
  try {
    const result = await FolderService.getAllFolders(req.user.email);
    success_res(res, { statusCode: 200, message: "All folders", payload: result });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folderId = req.params.FOLDER_ID as string;
    
    await FolderService.deleteFolder(req.user.email, folderId);
    success_res(res, { statusCode: 200, message: "Folder and all its files deleted" });
  } catch (error: any) {
    error_res(res, { statusCode: 400, message: error.message });
  }
};