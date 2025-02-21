import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table with record pool preferences
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  recordPoolPreferences: jsonb("record_pool_preferences").default([]),
});

// Tracks table for music files
export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  recordPool: text("record_pool").notNull(),
  genre: text("genre").notNull(),
  audioUrl: text("audio_url").notNull(),
  previewUrl: text("preview_url").notNull(),
  bpm: integer("bpm"),
  key: text("key"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// Playlists table for user collections
export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  trackIds: integer("track_ids").array(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

export const insertTrackSchema = createInsertSchema(tracks).omit({
  id: true,
  uploadedAt: true,
});

export const insertPlaylistSchema = createInsertSchema(playlists).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Track = typeof tracks.$inferSelect;
export type InsertTrack = z.infer<typeof insertTrackSchema>;
export type Playlist = typeof playlists.$inferSelect;
export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;