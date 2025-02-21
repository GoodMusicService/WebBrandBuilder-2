import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrackCard } from "@/components/music/track-card";
import { Track, User } from "@shared/schema";
import { Upload, Users } from "lucide-react";

export default function Admin() {
  const { data: tracks } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  return (
    <div className="h-screen flex">
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          <Tabs defaultValue="tracks">
            <TabsList className="mb-8">
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="record-pools">Record Pools</TabsTrigger>
            </TabsList>

            <TabsContent value="tracks">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Track Management</CardTitle>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Track
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Input placeholder="Search tracks..." />
                  </div>
                  <ScrollArea className="h-[600px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tracks?.map((track) => (
                        <TrackCard
                          key={track.id}
                          track={track}
                          onPlay={() => {}}
                          onAddToPlaylist={() => {}}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                    <Button>
                      <Users className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Input placeholder="Search users..." />
                  </div>
                  <div className="space-y-4">
                    {users?.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.isAdmin ? "Admin" : "User"}
                            </p>
                          </div>
                          <Button variant="outline">Manage</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="record-pools">
              <Card>
                <CardHeader>
                  <CardTitle>Record Pool Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Record pool management interface would go here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
