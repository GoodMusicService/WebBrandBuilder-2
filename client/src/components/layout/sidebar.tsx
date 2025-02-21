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
  LogOut 
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
      label: "Video Pools",
      icon: Video,
      href: "/video-pools",
    },
    {
      label: "Patreon",
      icon: Gift,
      href: "/patreon",
    },
    {
      label: "Playlists",
      icon: Library,
      href: "/playlists",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="px-3 py-2">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6 p-4">
          <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8Z" fill="currentColor" className="text-primary"/>
            <text x="50" y="25" className="text-lg font-bold" fill="currentColor">Select Music</text>
          </svg>
        </div>

        <h2 className="mb-2 px-4 text-lg font-semibold">
          Select Music Club
        </h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant={location === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location === route.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3">
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}