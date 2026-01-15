import mongoose, { Schema, Model } from "mongoose";
import { IFile } from "./file.interface";

const fileSchema = new Schema<IFile>(
  {
    userEmail: { type: String, required: true },
    folderName: { type: String, default: "root" },
    originalName: { type: String, required: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    fileURL: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const FileModel: Model<IFile> = mongoose.model<IFile>("File", fileSchema);