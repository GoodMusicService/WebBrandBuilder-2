import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const VIDEO_POOLS = [
  {
    name: "Digital DJ Pool Videos",
    description: "Latest music videos and DJ sets",
    count: "500+ videos"
  },
  {
    name: "BPM Supreme Videos",
    description: "Professional music videos",
    count: "1000+ videos"
  },
  {
    name: "DJCity TV",
    description: "Exclusive video content",
    count: "750+ videos"
  },
  {
    name: "Club Killers VJ",
    description: "Club visuals and videos",
    count: "300+ videos"
  },
  {
    name: "Virtual DJ Network",
    description: "DJ performance videos",
    count: "400+ videos"
  }
];

export default function VideoPools() {
  return (
    <div className="h-screen flex">
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Video Pools</h1>

            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search video pools..."
                  className="pl-10 w-[300px]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_POOLS.map((pool) => (
              <Card key={pool.name} className="group hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{pool.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pool.description}
                      </p>
                      <p className="text-sm text-primary mt-2">
                        {pool.count}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
