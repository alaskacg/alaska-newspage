import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WeeklyReport from "@/components/WeeklyReport";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Calendar, Video, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import weeklyReportBg from "@/assets/weekly-report-bg.jpg";

const WeeklyReportPage = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ["weekly-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("weekly_reports")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const latestReport = reports?.[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />
      
      {/* Hero Background Section */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${weeklyReportBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>
        
        <main className="container relative py-12">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-6">
                <Video className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Weekly Video Report</span>
              </div>
              
              <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                The Alaska News Page Weekly Report
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your comprehensive weekly roundup of Alaska's most important news, delivered every Monday with in-depth analysis and expert commentary.
              </p>
            </div>

            {/* Latest Report */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : latestReport ? (
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <WeeklyReport />
              </div>
            ) : (
              <div className="text-center py-20 glass rounded-2xl border border-border/50">
                <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Reports Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for our weekly video report
                </p>
              </div>
            )}

            {/* Previous Reports Archive */}
            {reports && reports.length > 1 && (
              <div className="mt-16 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-2xl font-semibold">Previous Reports</h2>
                </div>
                
                <div className="grid gap-4">
                  {reports.slice(1).map((report, index) => (
                    <div
                      key={report.id}
                      className="glass rounded-xl border border-border/50 p-6 hover:border-accent/50 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${(index + 3) * 100}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                          {report.description && (
                            <p className="text-muted-foreground text-sm mb-3">
                              {report.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Published {new Date(report.published_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        {report.thumbnail_url && (
                          <img
                            src={report.thumbnail_url}
                            alt={report.title}
                            className="w-32 h-20 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Section */}
            <div className="mt-16 glass rounded-2xl border border-border/50 p-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h2 className="font-display text-2xl font-semibold mb-4">About the Weekly Report</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  The Alaska News Page Weekly Report brings you the most significant stories from across the Last Frontier, carefully curated and presented each week.
                </p>
                <p>
                  Each week, we dive deep into the issues that matter most to Alaskans, from politics and economy to culture and community events. Our comprehensive coverage ensures you stay informed about the developments shaping our state.
                </p>
                <p className="text-sm pt-4 border-t border-border/50">
                  <strong>New episodes</strong> are published every Monday. Subscribe to push notifications to never miss an update!
                </p>
              </div>
            </div>

            {/* External Resources */}
            <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border/50">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Resources</h3>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.facebook.com/AlaskaNewsPage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  Follow on Facebook
                </a>
                <a 
                  href="https://alaska.gov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  State of Alaska
                </a>
                <Link 
                  to="/region/statewide"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  View Statewide News
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default WeeklyReportPage;
