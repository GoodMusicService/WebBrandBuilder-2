import { useQuery } from "@tanstack/react-query";
import { Track } from "@shared/schema";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrackCard } from "@/components/music/track-card";
import { AudioPlayer } from "@/components/music/audio-player";
import { useState } from "react";

export default function Dashboard() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  
  const { data: tracks } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
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
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tracks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    {tracks?.slice(0, 5).map((track) => (
                      <TrackCard
                        key={track.id}
                        track={track}
                        onPlay={handlePlay}
                        onAddToPlaylist={handleAddToPlaylist}
                      />
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Record Pools</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Record pool stats would go here */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Playlists</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Playlist list would go here */}
                </CardContent>
              </Card>
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
