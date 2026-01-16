import multer from "multer";
import fs from "fs";
import path from "path";


const storage = multer.diskStorage({
  destination: (req: any, file, cb) => {
    const userEmail = req.user.email;
    const folderName = req.params.folderName || "root";
    
    const uploadPath = path.join(__dirname, `../../uploads/${userEmail}/${folderName}`);
    

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const fileUpload = multer({ storage });