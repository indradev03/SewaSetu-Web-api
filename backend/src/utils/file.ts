import fs from "fs";
import path from "path";

/**
 * Deletes a file from the uploads folder
 * Works with full URL or relative path
 */

export const deleteFile = (fileName?: string) => {
  if (!fileName) return;

  try {
    const fullPath = path.join(process.cwd(), "uploads/profile", fileName);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("🗑️ File deleted:", fullPath);
    } else {
      console.log("⚠️ File not found:", fullPath);
    }
  } catch (error) {
    console.log("❌ File delete error:", error);
  }
};
