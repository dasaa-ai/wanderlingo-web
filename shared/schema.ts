import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const translations = pgTable("translations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type", { length: 20 }).notNull(), // "camera" or "chat"
  originalText: text("original_text").notNull(),
  translatedText: text("translated_text").notNull(),
  sourceLang: varchar("source_lang", { length: 50 }).notNull(),
  targetLang: varchar("target_lang", { length: 50 }).notNull(),
  allergens: text("allergens").array(),
  dietary: text("dietary").array(),
  culturalTip: text("cultural_tip"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const usage = pgTable("usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: varchar("date", { length: 10 }).notNull().unique(), // YYYY-MM-DD
  cameraTranslations: integer("camera_translations").notNull().default(0),
  chatMessages: integer("chat_messages").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTranslationSchema = createInsertSchema(translations).omit({
  id: true,
  createdAt: true,
});

export const insertUsageSchema = createInsertSchema(usage).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Translation = typeof translations.$inferSelect;
export type InsertTranslation = z.infer<typeof insertTranslationSchema>;
export type Usage = typeof usage.$inferSelect;
export type InsertUsage = z.infer<typeof insertUsageSchema>;
