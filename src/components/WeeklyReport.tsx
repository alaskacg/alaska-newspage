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
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-110"
        style={{ backgroundImage: `url(${weeklyReportBg})` }}
      />
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-cyan-900/20 animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Animated aurora effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl animate-aurora"
          style={{ animationDuration: '15s' }}
        />
        <div 
          className="absolute -top-1/2 left-1/4 right-1/4 h-full bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent blur-3xl animate-aurora"
          style={{ animationDuration: '20s', animationDelay: '5s' }}
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
      
      {/* Glowing orbs with pulsing animation */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/15 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-40" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/15 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-30" style={{ animationDuration: '8s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-20" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Dynamic Title Section with enhanced animations */}
          <div className="text-center mb-12">
            {/* Published badge with shimmer effect */}
            <div className="inline-block px-6 py-2 bg-white/10 border-2 border-white/30 rounded-full mb-8 backdrop-blur-sm shadow-lg relative overflow-hidden group animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="text-sm font-display font-semibold text-white tracking-wider relative z-10">✦ PUBLISHED EVERY WEDNESDAY ✦</span>
            </div>
            
            {/* Main Title with staggered reveal animation */}
            <div className="relative mb-6 overflow-hidden">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                <span 
                  className="block text-white opacity-0 animate-slide-in-up"
                  style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                  The
                </span>
                <span 
                  className="block text-white opacity-0 animate-slide-in-up"
                  style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                >
                  ANP Weekly Report
                </span>
              </h1>
              
              {/* Animated decorative line */}
              <div className="mt-4 mx-auto overflow-hidden">
                <div 
                  className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-scale-in-center"
                  style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                />
              </div>
            </div>
            
            {/* Host name with elegant reveal */}
            <div 
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              <p className="text-xl md:text-2xl font-display text-white tracking-wide">
                with{" "}
                <span className="relative inline-block group">
                  <span className="text-white font-semibold">J.R. Kitchens</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </span>
              </p>
            </div>
            
            {/* Subtitle with fade in */}
            <p 
              className="mt-4 text-white/80 text-lg max-w-2xl mx-auto opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              Your weekly deep-dive into Alaska's most important stories
            </p>
          </div>
          
          {/* Video Section with enhanced glassmorphism */}
          <div 
            className="glass rounded-2xl border-2 border-white/20 p-6 md:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden opacity-0 animate-scale-in-center group hover:border-white/30 transition-all duration-500"
            style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
          >
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {loading ? (
              <div className="text-center py-12 text-white/80">
                <div className="inline-block w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
                <p className="animate-pulse">Loading latest report...</p>
              </div>
            ) : latestReport ? (
              <div className="space-y-6 relative z-10">
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
                <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform transition-transform duration-500 hover:scale-[1.02]">
                  <EnhancedVideoPlayer 
                    videoUrl={latestReport.video_url}
                    title={latestReport.title}
                    autoPlay={true}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
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