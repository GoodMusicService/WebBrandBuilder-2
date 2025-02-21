import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Track } from "@shared/schema";
import { Sidebar } from "@/components/layout/sidebar";
import { TrackCard } from "@/components/music/track-card";
import { AudioPlayer } from "@/components/music/audio-player";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const GENRES = ["Hip-Hop", "Dance", "Latin", "Pop", "R&B", "World"];

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const { data: tracks } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  const filteredTracks = tracks?.filter(
    (track) => !selectedGenre || track.genre === selectedGenre
  );

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleAddToPlaylist = (track: Track) => {
    // TODO: Implement playlist functionality
  };

  return (
    <div className="h-screen flex">
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Music Library</h1>
              
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tracks..."
                    className="pl-10 w-[300px]"
                  />
                </div>
                
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Genres</SelectItem>
                    {GENRES.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks?.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={handlePlay}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <AudioPlayer track={currentTrack} />
          </div>
        </div>
      </main>
    </div>
  );
}
