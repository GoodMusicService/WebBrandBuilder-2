import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Track } from "@shared/schema";
import { Sidebar } from "@/components/layout/sidebar";
import { TrackCard } from "@/components/music/track-card";
import { AudioPlayer } from "@/components/music/audio-player";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Music2 } from "lucide-react";

export default function ShazamSongs() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // TODO: Implement Shazam tracks endpoint
  const { data: shazamTracks } = useQuery<Track[]>({
    queryKey: ["/api/shazam-tracks"],
  });

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

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Shazam Songs</h1>
              <p className="text-muted-foreground mt-2">
                Songs you've discovered using Shazam
              </p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Shazam history..."
                className="pl-10 w-[300px]"
              />
            </div>
          </div>

          {shazamTracks?.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Music2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">No Shazam Songs Yet</h3>
                  <p className="text-muted-foreground mt-2">
                    Start using Shazam to discover and save songs to your library
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shazamTracks?.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={handlePlay}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <AudioPlayer track={currentTrack} />
        </div>
      </main>
    </div>
  );
}
