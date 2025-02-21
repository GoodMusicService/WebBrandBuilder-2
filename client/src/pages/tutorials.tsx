import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlayCircle } from "lucide-react";

const TUTORIALS = [
  {
    title: "Beginner DJ Techniques",
    instructor: "DJ TechTools",
    duration: "45 mins",
    level: "Beginner"
  },
  {
    title: "Advanced Mixing Transitions",
    instructor: "Club Ready DJ School",
    duration: "60 mins",
    level: "Advanced"
  },
  {
    title: "Harmonic Mixing Masterclass",
    instructor: "Digital DJ Tips",
    duration: "90 mins",
    level: "Intermediate"
  },
  {
    title: "Energy Flow Management",
    instructor: "Carlo Atendido",
    duration: "75 mins",
    level: "Advanced"
  },
  {
    title: "Beat Matching Fundamentals",
    instructor: "DJ Shortee",
    duration: "30 mins",
    level: "Beginner"
  }
];

export default function Tutorials() {
  return (
    <div className="h-screen flex">
      <aside className="w-64 border-r">
        <Sidebar />
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">DJ Tutorials</h1>

            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tutorials..."
                  className="pl-10 w-[300px]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TUTORIALS.map((tutorial) => (
              <Card key={tutorial.title} className="group hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{tutorial.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        By {tutorial.instructor}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <PlayCircle className="h-6 w-6 text-primary" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {tutorial.duration}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-muted">
                      {tutorial.level}
                    </span>
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
