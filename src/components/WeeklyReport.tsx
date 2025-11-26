import { useState, useEffect } from "react";
import { Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
    <section className="py-16 relative overflow-hidden bg-muted/30">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nature-gold/5 via-transparent to-accent/5" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${weeklyReportBg})` }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-nature-gold/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20" style={{ animationDuration: '8s' }} />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-nature-gold/20 to-yellow-500/20 border-2 border-nature-gold/40 rounded-full mb-6 backdrop-blur-sm shadow-lg">
              <span className="text-sm font-display font-semibold text-nature-gold">✦ Published Every Wednesday ✦</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3 text-muted-foreground">
              The Alaska News Page Weekly Report w/ J.R. Kitchens
            </h2>
          </div>
          <div className="glass rounded-2xl border-2 border-nature-gold/30 p-8 md:p-12 shadow-2xl hover:shadow-nature-gold/20 transition-all duration-500 hover:scale-[1.02] group">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Loading latest report...</p>
              </div>
            ) : latestReport ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    {latestReport.title}
                  </h3>
                  {latestReport.description && (
                    <p className="text-muted-foreground">
                      {latestReport.description}
                    </p>
                  )}
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-black shadow-xl">
                  <video
                    controls
                    className="w-full h-full"
                    src={latestReport.video_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-center text-lg leading-relaxed">
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
