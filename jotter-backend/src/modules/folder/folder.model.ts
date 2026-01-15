import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFolder extends Document {
  userEmail: string;
  folderName: string;
  createdAt: Date;
}

const folderSchema = new Schema<IFolder>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    folderName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const FoldersModel: Model<IFolder> = mongoose.model<IFolder>("Folder", folderSchema);
export default FoldersModel;