import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { openai } from "./openai";
import Tesseract from "tesseract.js";
import { db } from "./db";
import { translations, usage, insertTranslationSchema } from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Camera translation endpoint
  app.post("/api/translate-image", async (req, res) => {
    try {
      const { image, targetLanguage = "English" } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Please provide an image to translate" });
      }

      // Extract text from image using Tesseract.js OCR
      console.log("Starting OCR for image translation...");
      const { data: { text } } = await Tesseract.recognize(image, 'eng+fra+spa+deu+ita+por+jpn+kor+chi_sim', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      if (!text || text.trim().length === 0) {
        return res.status(400).json({ 
          error: "No readable text found in the image. Please try a clearer photo with visible text." 
        });
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

      // Track usage
      await trackUsage("camera");

      res.json(result);
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ 
        error: "Translation failed", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Chat translation endpoint
  app.post("/api/translate-text", async (req, res) => {
    try {
      const { text, sourceLang, targetLang } = req.body;

      if (!text || !targetLang) {
        return res.status(400).json({ error: "Text and target language are required" });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a travel translation assistant. Translate the provided text from ${sourceLang || "auto-detected language"} to ${targetLang}.
            
Respond in JSON format with this structure:
{
  "sourceLang": "detected or provided source language",
  "targetLang": "${targetLang}",
  "original": "original text",
  "translated": "translated text"
}`
          },
          {
            role: "user",
            content: text
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2048
      });

      const result = JSON.parse(completion.choices[0].message.content || "{}");
      
      // Track usage
      await trackUsage("chat");

      res.json(result);
    } catch (error) {
      console.error("Chat translation error:", error);
      res.status(500).json({ 
        error: "Translation failed", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get all translations (library)
  app.get("/api/translations", async (req, res) => {
    try {
      const allTranslations = await db.query.translations.findMany({
        orderBy: [desc(translations.createdAt)],
      });
      res.json(allTranslations);
    } catch (error) {
      console.error("Error fetching translations:", error);
      res.status(500).json({ error: "Failed to fetch translations" });
    }
  });

  // Save translation to library
  app.post("/api/translations", async (req, res) => {
    try {
      const validatedData = insertTranslationSchema.parse(req.body);
      
      const [newTranslation] = await db.insert(translations)
        .values(validatedData)
        .returning();
      
      res.json(newTranslation);
    } catch (error) {
      console.error("Error saving translation:", error);
      res.status(500).json({ error: "Failed to save translation" });
    }
  });

  // Delete translation
  app.delete("/api/translations/:id", async (req, res) => {
    try {
      await db.delete(translations)
        .where(eq(translations.id, req.params.id));
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting translation:", error);
      res.status(500).json({ error: "Failed to delete translation" });
    }
  });

  // Get usage stats
  app.get("/api/usage", async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const [usageData] = await db.query.usage.findMany({
        where: eq(usage.date, today),
      });

      if (!usageData) {
        res.json({ cameraTranslations: 0, chatMessages: 0 });
      } else {
        res.json({
          cameraTranslations: usageData.cameraTranslations,
          chatMessages: usageData.chatMessages,
        });
      }
    } catch (error) {
      console.error("Error fetching usage:", error);
      res.status(500).json({ error: "Failed to fetch usage data" });
    }
  });

  // Helper function to track usage with atomic upsert
  async function trackUsage(type: "camera" | "chat") {
    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Use upsert (insert with on conflict do update) for atomic operation
      await db.insert(usage)
        .values({
          date: today,
          cameraTranslations: type === "camera" ? 1 : 0,
          chatMessages: type === "chat" ? 1 : 0,
        })
        .onConflictDoUpdate({
          target: usage.date,
          set: type === "camera" 
            ? { cameraTranslations: sql`${usage.cameraTranslations} + 1` }
            : { chatMessages: sql`${usage.chatMessages} + 1` }
        });
    } catch (error) {
      console.error("Error tracking usage:", error);
    }
  }

  const httpServer = createServer(app);

  return httpServer;
}
