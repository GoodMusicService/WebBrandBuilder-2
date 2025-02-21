import { InsertUser, User, Track, InsertTrack, Playlist, InsertPlaylist } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tracks
  getTracks(): Promise<Track[]>;
  getTracksByRecordPool(recordPool: string): Promise<Track[]>;
  createTrack(track: InsertTrack): Promise<Track>;
  
  // Playlists
  getPlaylistsByUser(userId: number): Promise<Playlist[]>;
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  updatePlaylist(id: number, trackIds: number[]): Promise<Playlist>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tracks: Map<number, Track>;
  private playlists: Map<number, Playlist>;
  private currentIds: { users: number; tracks: number; playlists: number };

  constructor() {
    this.users = new Map();
    this.tracks = new Map();
    this.playlists = new Map();
    this.currentIds = { users: 1, tracks: 1, playlists: 1 };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = { ...insertUser, id, isAdmin: false, recordPoolPreferences: [] };
    this.users.set(id, user);
    return user;
  }

  async getTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values());
  }

  async getTracksByRecordPool(recordPool: string): Promise<Track[]> {
    return Array.from(this.tracks.values()).filter(
      (track) => track.recordPool === recordPool
    );
  }

  async createTrack(insertTrack: InsertTrack): Promise<Track> {
    const id = this.currentIds.tracks++;
    const track: Track = { 
      ...insertTrack, 
      id, 
      uploadedAt: new Date() 
    };
    this.tracks.set(id, track);
    return track;
  }

  async getPlaylistsByUser(userId: number): Promise<Playlist[]> {
    return Array.from(this.playlists.values()).filter(
      (playlist) => playlist.userId === userId
    );
  }

  async createPlaylist(insertPlaylist: InsertPlaylist): Promise<Playlist> {
    const id = this.currentIds.playlists++;
    const playlist: Playlist = { ...insertPlaylist, id };
    this.playlists.set(id, playlist);
    return playlist;
  }

  async updatePlaylist(id: number, trackIds: number[]): Promise<Playlist> {
    const playlist = this.playlists.get(id);
    if (!playlist) throw new Error("Playlist not found");
    
    const updated = { ...playlist, trackIds };
    this.playlists.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
