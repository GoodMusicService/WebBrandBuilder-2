import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const PATREON_CREATORS = [
  {
    name: "DJ TechTools",
    description: "Exclusive remixes and edits",
    supporters: "5.2k patrons"
  },
  {
    name: "Club Ready DJ School",
    description: "Premium DJ edits and transitions",
    supporters: "3.8k patrons"
  },
  {
    name: "Live DJ Service",
    description: "Custom edits and mashups",
    supporters: "2.9k patrons"
  },
  {
    name: "DJ Carlo Atendido",
    description: "Exclusive DJ tools and edits",
    supporters: "4.1k patrons"
  },
  {
    name: "Digital DJ Tips",
    description: "Professional DJ edits",
    supporters: "3.5k patrons"
  }
];

export default function Patreon() {
  return (
    <div className="h-screen flex">
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Patreon Creators</h1>

            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search creators..."
                  className="pl-10 w-[300px]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATREON_CREATORS.map((creator) => (
              <Card key={creator.name} className="group hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{creator.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {creator.description}
                      </p>
                      <p className="text-sm text-primary mt-2">
                        {creator.supporters}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Follow
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
