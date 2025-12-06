import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EnhancedVideoPlayer from "@/components/EnhancedVideoPlayer";
import weeklyReportBg from "@/assets/weekly-report-bg.jpg";

interface WeeklyReportData {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  published_at: string;
}

const WeeklyReport = () => {
  const [latestReport, setLatestReport] = useState<WeeklyReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLatestReport();
  }, []);

  const fetchLatestReport = async () => {
    try {
      const { data, error } = await supabase
        .from("weekly_reports")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setLatestReport(data);
    } catch (error: any) {
      toast({
        title: "Error loading report",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Investigative team background - high visibility */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${weeklyReportBg})` }}
      />
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-30" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-20" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Dynamic Title Section */}
          <div className="text-center mb-12 animate-fade-in">
            {/* Published badge */}
            <div className="inline-block px-6 py-2 bg-white/10 border-2 border-white/30 rounded-full mb-8 backdrop-blur-sm shadow-lg animate-bounce-soft">
              <span className="text-sm font-display font-semibold text-white tracking-wider">✦ PUBLISHED EVERY WEDNESDAY ✦</span>
            </div>
            
            {/* Main Title with dynamic animation */}
            <div className="relative mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                <span className="block text-white animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                  The
                </span>
                <span 
                  className="block text-white animate-slide-in-right"
                  style={{ animationDelay: '0.3s' }}
                >
                  ANP Weekly Report
                </span>
              </h1>
              
              {/* Decorative line */}
              <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-scale-in" style={{ animationDelay: '0.5s' }} />
            </div>
            
            {/* Host name with elegant styling */}
            <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <p className="text-xl md:text-2xl font-display text-white tracking-wide">
                with{" "}
                <span className="relative inline-block">
                  <span className="text-white font-semibold">J.R. Kitchens</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0" />
                </span>
              </p>
            </div>
            
            {/* Subtitle */}
            <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.9s' }}>
              Your weekly deep-dive into Alaska's most important stories
            </p>
          </div>
          
          {/* Video Section */}
          <div className="glass rounded-2xl border-2 border-white/30 p-6 md:p-10 shadow-2xl hover:shadow-white/10 transition-all duration-500 animate-scale-in" style={{ animationDelay: '1s' }}>
            {loading ? (
              <div className="text-center py-12 text-white/80">
                <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
                <p>Loading latest report...</p>
              </div>
            ) : latestReport ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white">
                    {latestReport.title}
                  </h3>
                  {latestReport.description && (
                    <p className="text-white/80">
                      {latestReport.description}
                    </p>
                  )}
                </div>
                <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <EnhancedVideoPlayer 
                    videoUrl={latestReport.video_url}
                    title={latestReport.title}
                    autoPlay={true}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg leading-relaxed max-w-md mx-auto">
                  The latest weekly report will be posted here every Wednesday. Check back for J.R. Kitchens' insights on Alaska news and events.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyReport;
