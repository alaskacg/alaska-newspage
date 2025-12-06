import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import RegionPage from "./pages/RegionPage";
import AuthPage from "./pages/AuthPage";
import SetupPage from "./pages/SetupPage";
import DownloadAppPage from "./pages/DownloadAppPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import EventPage from "./pages/EventPage";
import NotFound from "./pages/NotFound";
import AdminPanel from "./components/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/region/:slug" element={<RegionPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/setup" element={<SetupPage />} />
              <Route path="/download" element={<DownloadAppPage />} />
              <Route path="/anpweeklyreport" element={<WeeklyReportPage />} />
              <Route path="/event/:slug" element={<EventPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/weekly-reports" element={<AdminPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
