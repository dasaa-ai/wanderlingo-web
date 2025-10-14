import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { openai } from "./openai";
import Tesseract from "tesseract.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Camera translation endpoint
  app.post("/api/translate-image", async (req, res) => {
    try {
      const { image, targetLanguage = "English" } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Image data is required" });
      }

      // Extract text from image using Tesseract.js OCR
      console.log("Starting OCR...");
      const { data: { text } } = await Tesseract.recognize(image, 'eng+fra+spa+deu+ita+por+jpn+kor+chi_sim', {
        logger: (m) => console.log(m),
      });

      if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: "No text found in image" });
      }

      console.log("Extracted text:", text);

      // Detect source language and translate using OpenAI
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a travel translation assistant. Analyze the provided text (likely from a menu or sign) and provide:
1. The detected source language
2. Translation to ${targetLanguage}
3. Any allergen warnings (gluten, dairy, nuts, shellfish, eggs, soy, etc.)
4. Dietary information (vegetarian, vegan, contains meat, etc.)
5. Cultural or contextual tips if relevant

Respond in JSON format with this structure:
{
  "sourceLang": "detected language",
  "targetLang": "${targetLanguage}",
  "original": "original text",
  "translated": "translated text",
  "allergens": ["allergen1", "allergen2"],
  "dietary": ["dietary info"],
  "culturalTip": "optional cultural context",
  "confidence": "high/medium/low"
}`
          },
          {
            role: "user",
            content: text
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 8192
      });

      const result = JSON.parse(completion.choices[0].message.content || "{}");
      
      console.log("Translation result:", result);

      res.json(result);
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ 
        error: "Translation failed", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
