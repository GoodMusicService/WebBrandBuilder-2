import { useQuery } from "@tanstack/react-query";
import { Track } from "@shared/schema";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrackCard } from "@/components/music/track-card";
import { AudioPlayer } from "@/components/music/audio-player";
import { useState } from "react";
import { Music2, Disc3, ListMusic } from "lucide-react";

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
    <div className="h-screen flex bg-gradient-to-b from-background to-background/95">
      <aside className="w-64 border-r border-border/10">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Welcome Back
              </h1>
              <p className="text-muted-foreground mt-2">
                Your professional DJ dashboard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Music2 className="h-5 w-5 text-primary" />
                    <CardTitle>Recent Tracks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
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

              <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Disc3 className="h-5 w-5 text-primary" />
                    <CardTitle>Top Record Pools</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                      <span>BPM Supreme</span>
                      <span className="text-primary">2.4k tracks</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                      <span>DJCity</span>
                      <span className="text-primary">1.8k tracks</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                      <span>Digital DJ Pool</span>
                      <span className="text-primary">1.2k tracks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ListMusic className="h-5 w-5 text-primary" />
                    <CardTitle>My Playlists</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                      <span>Club Mix</span>
                      <span className="text-primary">32 tracks</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                      <span>Hip Hop Set</span>
                      <span className="text-primary">28 tracks</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
                      <span>Latin Night</span>
                      <span className="text-primary">45 tracks</span>
                    </div>
                  </div>
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