import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RECORD_POOLS = [
  "BPM Supreme",
  "DJCity",
  "Digital DJ Pool",
  "ZipDJ",
  "Heavy Hits",
  "Club Killers",
];

const VIDEO_POOLS = [
  "Digital DJ Pool Videos",
  "BPM Supreme Videos",
  "DJCity TV",
  "Club Killers VJ",
  "Virtual DJ Network",
];

export default function RecordPools() {
  return (
    <div className="h-screen flex">
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Record Pools</h1>

            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pools..."
                  className="pl-10 w-[300px]"
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="music" className="space-y-6">
            <TabsList className="w-full flex justify-start space-x-2 mb-6">
              <TabsTrigger value="music" className="px-8">Music Pools</TabsTrigger>
              <TabsTrigger value="video" className="px-8">Video Pools</TabsTrigger>
            </TabsList>

            <TabsContent value="music">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RECORD_POOLS.map((pool) => (
                  <Card key={pool} className="group hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{pool}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Latest tracks updated daily
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
            </TabsContent>

            <TabsContent value="video">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {VIDEO_POOLS.map((pool) => (
                  <Card key={pool} className="group hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{pool}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Latest videos updated daily
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}