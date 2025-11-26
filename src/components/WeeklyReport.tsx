import { useState, useEffect } from "react";
import { Video, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  const reportDate = latestReport 
    ? new Date(latestReport.published_at).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="container">
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30">
                <Video className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-display">Weekly Report from Kitchens</CardTitle>
            <CardDescription className="text-base mt-2">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{latestReport?.title || `Week of ${reportDate}`}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading latest report...
              </div>
            ) : latestReport ? (
              <>
                {latestReport.description && (
                  <p className="text-muted-foreground text-center">
                    {latestReport.description}
                  </p>
                )}
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <video
                    controls
                    className="w-full h-full"
                    src={latestReport.video_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No weekly report available yet.</p>
                <p className="text-sm mt-2">Check back soon for the latest update from J.R. Kitchens</p>
              </div>
            )}
            
            <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
              <p>Analysis by J.R. Kitchens | Alaska Mining & Development News</p>
              <p className="mt-1">New reports posted every Wednesday</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeeklyReport;
