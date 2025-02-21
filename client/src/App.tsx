import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";

import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import RecordPools from "@/pages/record-pools";
import VideoPools from "@/pages/video-pools";
import Patreon from "@/pages/patreon";
import Tutorials from "@/pages/tutorials";
import SmartCrates from "@/pages/smart-crates";
import ShazamSongs from "@/pages/shazam-songs";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/record-pools" component={RecordPools} />
      <Route path="/video-pools" component={VideoPools} />
      <Route path="/patreon" component={Patreon} />
      <Route path="/tutorials" component={Tutorials} />
      <Route path="/smart-crates" component={SmartCrates} />
      <Route path="/shazam-songs" component={ShazamSongs} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;