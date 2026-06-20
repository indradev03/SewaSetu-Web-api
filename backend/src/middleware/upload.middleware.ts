import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";

const createFolder = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const createUpload = (mainFolder: string, subFolder: string) => {
  const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      const folder = `uploads/${mainFolder}/`;
      createFolder(folder);
      cb(null, folder);
    },

    filename: (req: Request, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

    const isMimeValid = allowedTypes.includes(file.mimetype);
    const isExtValid = allowedExt.includes(ext);

    if (isMimeValid && isExtValid) {
      cb(null, true);
    } else {
      cb(new Error("Only valid image files are allowed"));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
};
/**
 * Pre-configured uploads (READY TO USE)
 */

// 👤 Donor profile image
export const uploadDonorProfile = createUpload("profile", "donor");

// 🏢 NGO profile image
export const uploadNgoProfile = createUpload("profile", "ngo");
