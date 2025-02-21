import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Music, 
  PlaySquare, 
  Library, 
  Settings,
  LogOut 
} from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const routes = [
    {
      label: "Music",
      icon: Music,
      href: "/music",
    },
    {
      label: "Record Pools",
      icon: PlaySquare,
      href: "/record-pools",
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
        <Button variant="ghost" className="w-full justify-start text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
