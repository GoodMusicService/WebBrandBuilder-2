import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Track } from "@shared/schema";

interface AudioPlayerProps {
  track: Track | null;
}

export function AudioPlayer({ track }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.previewUrl;
      audioRef.current.load();
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!track) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 p-4 border-t">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-semibold">{track.title}</h3>
          <p className="text-sm text-muted-foreground">{track.artist}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <div className="w-[200px]">
            <Slider
              value={[progress]}
              max={100}
              step={1}
              onValueChange={handleProgressChange}
            />
          </div>
          <Button size="icon" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <div className="w-[100px]">
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0] / 100)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}