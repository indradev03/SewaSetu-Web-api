import { GoogleGenerativeAI } from "@google/generative-ai";
import { HttpException } from "../exceptions/http-exception";
import { AIGeneratedItemDTO, AIGeneratedItemType } from "../dtos/ai.dto";
import fs from "fs";

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async analyzeDonationImage(imagePath: string): Promise<AIGeneratedItemType> {
    try {
      // Check if file exists
      if (!fs.existsSync(imagePath)) {
        throw new HttpException(400, "Image file not found");
      }

      // Read image file
      const imageBuffer = fs.readFileSync(imagePath);
      const mimeType = this.getMimeType(imagePath);

      // Prepare the prompt
      const prompt = `You are an assistant that helps users create donation listings.

Analyze the uploaded donation item image.

Generate donation information.

Return ONLY valid JSON.

Schema:
{
"category":"",
"title":"",
"description":"",
"quantity":1,
"unit":"",
"confidence":0
}

Rules:

Category must be exactly one of:
* Food
* Clothes
* Others

Title:
* Short
* Natural
* Maximum 100 characters

Description:
* Between 20 and 150 characters
* Mention only what is visible
* Do not invent brands or hidden details

Quantity:
* Estimate quantity from the image.
* If uncertain, return 1.

Unit must be exactly one of:
* Pieces
* Kgs
* Packets
* Liters

Choose the most appropriate unit.

Confidence:
Return an integer from 0–100 indicating confidence in the prediction.

Do not include markdown.
Do not include explanations.
Return ONLY valid JSON.`;

      // Call Gemini Vision API
      const imagePart = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: mimeType,
        },
      };

      const result = await this.model.generateContent([prompt, imagePart]);
      const response = result.response;
      const content = response.text();

      if (!content) {
        throw new HttpException(500, "Failed to get response from AI");
      }

      // Parse JSON response
      let parsedResponse: any;
      try {
        // Remove markdown code blocks if present
        const cleanedContent = content.replace(/```json\n?|\n?```/g, "").trim();
        parsedResponse = JSON.parse(cleanedContent);
      } catch (parseError) {
        throw new HttpException(500, "Invalid AI response format");
      }

      // Validate the response against our schema
      const validated = AIGeneratedItemDTO.safeParse(parsedResponse);

      if (!validated.success) {
        const errors = validated.error.issues
          .map((e: any) => `${e.path.join(".")} - ${e.message}`)
          .join(", ");
        throw new HttpException(
          500,
          `AI response validation failed: ${errors}`,
        );
      }

      return validated.data;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      // Handle Gemini API errors
      if (error?.status === 429) {
        throw new HttpException(
          429,
          "Rate limit exceeded. Please try again later.",
        );
      }

      if (error?.status === 401 || error?.message?.includes("API key")) {
        throw new HttpException(500, "Invalid Gemini API key");
      }

      if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
        throw new HttpException(504, "Request timeout. Please try again.");
      }

      console.error("Gemini API Error:", error);
      throw new HttpException(500, "Failed to analyze image with AI");
    }
  }

  private getMimeType(filePath: string): string {
    const ext = filePath.split(".").pop()?.toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
    };

    return mimeTypes[ext || ""] || "image/jpeg";
  }
}
