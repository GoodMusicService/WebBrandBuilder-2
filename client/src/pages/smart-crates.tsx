import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrackCard } from "@/components/music/track-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Wand2 } from "lucide-react";
import { Track } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

export default function SmartCrates() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const { data: recommendedTracks } = useQuery<Track[]>({
    queryKey: ["/api/recommendations"],
  });

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleAddToPlaylist = (track: Track) => {
    // TODO: Implement playlist functionality
  };

  const handleUploadHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement history upload functionality
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
              <h1 className="text-3xl font-bold">Smart Crates</h1>
              <p className="text-muted-foreground mt-2">
                AI-powered music recommendations based on your DJ history
              </p>
            </div>

            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload DJ History
              <input
                type="file"
                className="hidden"
                accept=".csv,.xml,.json"
                onChange={handleUploadHistory}
              />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-primary" />
                    <CardTitle>Recommended Tracks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {recommendedTracks?.map((track) => (
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
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your DJ Style Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/5">
                      <h3 className="font-medium">Top Genres</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>House</span>
                          <span className="text-primary">45%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tech House</span>
                          <span className="text-primary">30%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Melodic House</span>
                          <span className="text-primary">25%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5">
                      <h3 className="font-medium">Energy Level</h3>
                      <div className="mt-2">
                        <div className="flex justify-between">
                          <span>Peak Time</span>
                          <span className="text-primary">High</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5">
                      <h3 className="font-medium">Key Distribution</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>Cm</span>
                          <span className="text-primary">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gm</span>
                          <span className="text-primary">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fm</span>
                          <span className="text-primary">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
