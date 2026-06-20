import fs from "fs";
import path from "path";

/**
 * Deletes a file from the uploads folder
 * Works with full URL or relative path
 */
export const deleteFile = (filePath?: string) => {
  if (!filePath) return;

  try {
    let fullPath: string;

    // If full URL is stored in DB
    if (filePath.startsWith("http")) {
      const url = new URL(filePath);
      fullPath = path.join(process.cwd(), url.pathname);
    } else {
      // If relative path is stored (recommended)
      fullPath = path.join(process.cwd(), filePath);
    }

    // Check if file exists
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("🗑️ File deleted:", fullPath);
    }
  } catch (error) {
    console.log("❌ File delete error:", error);
  }
};
