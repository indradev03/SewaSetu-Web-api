import { Request, Response } from "express";
import { AIService } from "../services/ai.service";
import { HttpException } from "../exceptions/http-exception";
import { ApiResponseHelper } from "../utils/api-response";
import { deleteFile } from "../utils/file";

const aiService = new AIService();

export class AIController {
  async generateDonationItem(req: Request, res: Response) {
    try {
      // Check if image was uploaded
      if (!req.file) {
        throw new HttpException(400, "No image uploaded");
      }

      const imagePath = req.file.path;

      // Analyze the image with AI
      const aiResult = await aiService.analyzeDonationImage(imagePath);

      // Clean up the uploaded file after analysis
      deleteFile(imagePath);

      return ApiResponseHelper.success(
        res,
        aiResult,
        200,
        "AI item generated successfully",
      );
    } catch (error: any) {
      // Clean up uploaded file if it exists and an error occurred
      if (req.file) {
        try {
          deleteFile(req.file.path);
        } catch (cleanupError) {
          console.error("Failed to clean up uploaded file:", cleanupError);
        }
      }

      return ApiResponseHelper.error(
        res,
        error.message || "Failed to generate AI item",
        error.status || 500,
      );
    }
  }
}
