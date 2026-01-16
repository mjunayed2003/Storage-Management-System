import { Document } from "mongoose";

export interface IFile extends Document {
  userEmail: string;
  folderName: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
  fileURL: string;
  favorite: boolean;
  createdAt: Date;
}