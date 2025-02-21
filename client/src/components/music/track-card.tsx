import { Play, Download, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Track } from "@shared/schema";

interface TrackCardProps {
  track: Track;
  onPlay: (track: Track) => void;
  onAddToPlaylist: (track: Track) => void;
}

export function TrackCard({ track, onPlay, onAddToPlaylist }: TrackCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold truncate">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={() => onPlay(track)}>
              <Play className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onAddToPlaylist(track)}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" asChild>
              <a href={track.audioUrl} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-4 flex gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
            {track.genre}
          </span>
          <span className="px-2 py-1 rounded-full bg-muted">
            {track.bpm} BPM
          </span>
          <span className="px-2 py-1 rounded-full bg-muted">
            Key: {track.key}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
