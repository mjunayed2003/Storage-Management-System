import fs from "fs";
import path from "path";
import FoldersModel from "./folder.model"; 
import { FileModel } from "../file/file.model"; 

// 1. Create Folder
export const createFolder = async (email: string, folderName: string) => {
  const existingFolder = await FoldersModel.findOne({ userEmail: email, folderName });
  if (existingFolder) {
    throw new Error("Folder with this name already exists");
  }

  const folderPath = path.join(__dirname, `../../uploads/${email}/${folderName}`);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return await FoldersModel.create({
    userEmail: email,
    folderName,
  });
};

// 2. Get All Folders
export const getAllFolders = async (email: string) => {
  return await FoldersModel.find({ userEmail: email }).sort({ createdAt: -1 });
};

// 3. Delete Folder
export const deleteFolder = async (email: string, folderId: string) => {
  const folder = await FoldersModel.findOne({ _id: folderId, userEmail: email });
  if (!folder) throw new Error("Folder not found");

  if (folder.folderName === "root") {
    throw new Error("Cannot delete root folder");
  }

  await FileModel.deleteMany({ userEmail: email, folderName: folder.folderName });

  const folderPath = path.join(__dirname, `../../uploads/${email}/${folder.folderName}`);
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
  }

  await folder.deleteOne();
  return true;
};