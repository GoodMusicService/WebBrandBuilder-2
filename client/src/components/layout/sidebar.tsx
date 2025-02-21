import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  PlaySquare, 
  Library, 
  Settings,
  Video,
  Gift,
  GraduationCap,
  Music2,
  LogOut,
  ListMusic,
  Import
} from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const routes = [
    {
      label: "Record Pools",
      icon: PlaySquare,
      href: "/record-pools",
    },
    {
      label: "Patreon",
      icon: Gift,
      href: "/patreon",
    },
    {
      label: "Video Pools",
      icon: Video,
      href: "/video-pools",
    },
    {
      label: "Recommended Songs for My Sets",
      icon: ListMusic,
      href: "/recommended-songs",
    },
    {
      label: "My Shazam Songs",
      icon: Music2,
      href: "/shazam-songs",
    },
    {
      label: "Import A Playlist",
      icon: Import,
      href: "/import-playlist",
    },
    {
      label: "Tutorials",
      icon: GraduationCap,
      href: "/tutorials",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen"