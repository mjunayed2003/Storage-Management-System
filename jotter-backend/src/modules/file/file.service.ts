import fs from "fs";
import path from "path";
import { FileModel } from "./file.model";

// 1. Save File Info to DB
export const uploadFile = async (email: string, folderName: string, file: Express.Multer.File) => {
  const fileURL = process.env.BASE_URL + "/" + file.path.split("uploads")[1].replace(/\\/g, "/"); 
  
  return await FileModel.create({
    userEmail: email,
    folderName,
    originalName: file.originalname,
    fileName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path,
    fileURL,
  });
};

// 2. List Files in Folder
export const getFilesByFolder = async (email: string, folderName: string) => {
  return await FileModel.find({ userEmail: email, folderName }).sort({ createdAt: -1 });
};

// 3. Storage Details
export const getStorageDetails = async (email: string) => {
  const files = await FileModel.find({ userEmail: email });
  
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  const pdfs = files.filter(f => f.mimeType.includes("pdf"));
  const images = files.filter(f => f.mimeType.includes("image"));

  return {
    totalFiles: files.length,
    totalSize: (totalSize / (1024 * 1024)).toFixed(2) + " MB",
    pdfCount: pdfs.length,
    imageCount: images.length,
  };
};

// 4. Rename File
export const renameFile = async (email: string, fileId: string, newName: string) => {
  const file = await FileModel.findOne({ _id: fileId, userEmail: email });
  if (!file) throw new Error("File not found");

  const dir = path.dirname(file.path);
  const newPath = path.join(dir, newName);

  // Rename on Disk
  if (fs.existsSync(file.path)) {
    fs.renameSync(file.path, newPath);
  }

  // Update DB
  return await FileModel.findByIdAndUpdate(
    fileId,
    { fileName: newName, path: newPath },
    { new: true }
  );
};

// 5. Delete File
export const deleteFile = async (email: string, fileId: string) => {
  const file = await FileModel.findOne({ _id: fileId, userEmail: email });
  if (!file) throw new Error("File not found");

  // Delete from Disk
  if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path);
  }

  // Delete from DB
  await FileModel.findByIdAndDelete(fileId);
  return true;
};

// 6. Update Text File Content
export const updateTextContent = async (email: string, fileId: string, content: string) => {
  const file = await FileModel.findOne({ _id: fileId, userEmail: email });
  if (!file) throw new Error("File not found");

  // Write new content to disk
  fs.writeFileSync(file.path, content, "utf-8");

  // Update size in DB
  const stats = fs.statSync(file.path);
  file.size = stats.size;
  await file.save();

  return file;
};

// 7. Duplicate File
export const duplicateFile = async (email: string, fileId: string) => {
  const file = await FileModel.findOne({ _id: fileId, userEmail: email });
  if (!file) throw new Error("File not found");

  const newName = "copy_" + file.fileName;
  const newPath = path.join(path.dirname(file.path), newName);

  // Copy on Disk
  fs.copyFileSync(file.path, newPath);

  // Create new DB Entry
  return await FileModel.create({
    ...file.toObject(),
    _id: undefined, // New ID
    fileName: newName,
    path: newPath,
    createdAt: new Date(),
  });
};