import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EnhancedVideoPlayer from "@/components/EnhancedVideoPlayer";
import { ArrowRight, Archive } from "lucide-react";
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
            {/* Main Title - "The Alaska News Page Weekly Report" with letter-by-letter animation */}
            <div className="relative mb-6 overflow-hidden">
              <h1 className="font-cinzel leading-tight perspective-1000">
                {/* "The" - Small elegant text */}
                <span className="block text-lg md:text-xl text-white/80 tracking-[0.3em] uppercase mb-2 opacity-0 animate-fade-in-down" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  The
                </span>
                
                {/* "Alaska News Page" - Main title with letter animation */}
                <span className="block text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.15em] uppercase mb-1">
                  {"Alaska News Page".split('').map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block opacity-0 animate-letter-reveal"
                      style={{ 
                        animationDelay: `${0.4 + index * 0.05}s`, 
                        animationFillMode: 'forwards',
                        textShadow: '0 0 30px rgba(255,255,255,0.4), 0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </span>
                
                {/* "Weekly Report" - Gradient animated text */}
                <span 
                  className="block text-xl md:text-2xl lg:text-3xl tracking-[0.2em] uppercase mt-2 opacity-0 animate-fade-in-up bg-gradient-to-r from-white via-amber-200 to-white bg-[length:200%_auto] animate-text-shimmer"
                  style={{ 
                    animationDelay: '1.2s', 
                    animationFillMode: 'forwards',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Weekly Report
                </span>
              </h1>
              
              {/* Animated decorative lines */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div 
                  className="h-px w-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 animate-scale-in-center"
                  style={{ animationDelay: '1.4s', animationFillMode: 'forwards', width: '80px' }}
                />
                <div 
                  className="w-2 h-2 rotate-45 bg-amber-400 opacity-0 animate-scale-in-center"
                  style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
                />
                <div 
                  className="h-px w-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 animate-scale-in-center"
                  style={{ animationDelay: '1.4s', animationFillMode: 'forwards', width: '80px' }}
                />
              </div>
            </div>
            
            {/* Host name with elegant reveal */}
            <div 
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}
            >
              <p className="text-lg md:text-xl font-cinzel text-white/90 tracking-wide">
                with{" "}
                <span className="relative inline-block group">
                  <span className="text-amber-300 font-semibold animate-word-glow">J.R. Kitchens</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </span>
              </p>
            </div>
            
            {/* Subtitle with fade in */}
            <p 
              className="mt-4 text-white/70 text-base md:text-lg max-w-2xl mx-auto opacity-0 animate-fade-in-up font-light tracking-wide"
              style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}
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

          {/* Bottom section with Published badge and Archive link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
            {/* Published badge */}
            <div className="inline-block px-5 py-2 bg-white/10 border border-white/30 rounded-full backdrop-blur-sm shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="text-xs font-cinzel font-semibold text-white/90 tracking-wider relative z-10">✦ PUBLISHED EVERY WEDNESDAY ✦</span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-white/30" />

            {/* Archive link */}
            <Link 
              to="/anpweeklyreport"
              className="group inline-flex items-center gap-2 px-5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 hover:border-amber-400/60 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300"
            >
              <Archive className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-cinzel font-semibold text-amber-200 tracking-wide">View All Reports</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyReport;