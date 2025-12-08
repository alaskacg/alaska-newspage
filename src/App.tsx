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
import CommunityPage from "./pages/CommunityPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import CookiesPage from "./pages/CookiesPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import NotFound from "./pages/NotFound";
import AdminPanel from "./components/AdminPanel";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Data is immediately stale, will refetch on mount
      gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes (garbage collection)
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      refetchOnMount: true, // Always refetch on component mount
      refetchOnReconnect: true, // Refetch when reconnecting
    },
  },
});

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
              <Route path="/community/:slug" element={<CommunityPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/weekly-reports" element={<AdminPanel />} />
              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
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
