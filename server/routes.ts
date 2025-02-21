import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertTrackSchema, insertPlaylistSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Tracks routes
  app.get("/api/tracks", async (req, res) => {
    const recordPool = req.query.recordPool as string;
    const tracks = recordPool 
      ? await storage.getTracksByRecordPool(recordPool)
      : await storage.getTracks();
    res.json(tracks);
  });

  app.post("/api/tracks", async (req, res) => {
    try {
      const trackData = insertTrackSchema.parse(req.body);
      const track = await storage.createTrack(trackData);
      res.json(track);
    } catch (error) {
      res.status(400).json({ message: "Invalid track data" });
    }
  });

  // Playlist routes
  app.get("/api/playlists/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const playlists = await storage.getPlaylistsByUser(userId);
    res.json(playlists);
  });

  app.post("/api/playlists", async (req, res) => {
    try {
      const playlistData = insertPlaylistSchema.parse(req.body);
      const playlist = await storage.createPlaylist(playlistData);
      res.json(playlist);
    } catch (error) {
      res.status(400).json({ message: "Invalid playlist data" });
    }
  });

  app.patch("/api/playlists/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { trackIds } = req.body;
      const playlist = await storage.updatePlaylist(id, trackIds);
      res.json(playlist);
    } catch (error) {
      res.status(400).json({ message: "Failed to update playlist" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
