import { Document } from "mongoose";

export interface IFile extends Document {
  userEmail: string;
  folderName: string; // e.g., 'resume', 'root'
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
  fileURL: string;
  favorite: boolean;
  createdAt: Date;
}