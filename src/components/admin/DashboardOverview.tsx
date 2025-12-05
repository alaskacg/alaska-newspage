import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Newspaper, MapPin, Building2, FileText, TrendingUp, Calendar, Eye } from "lucide-react";

interface Stats {
  totalReports: number;
  totalNews: number;
  totalRegions: number;
  totalBusinesses: number;
  totalResources: number;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalReports: 0,
    totalNews: 0,
    totalRegions: 0,
    totalBusinesses: 0,
    totalResources: 0,
  });
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [latestReport, setLatestReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch counts
      const [reportsRes, newsRes, regionsRes, businessesRes, resourcesRes] = await Promise.all([
        supabase.from("weekly_reports").select("id", { count: "exact", head: true }),
        supabase.from("news_items").select("id", { count: "exact", head: true }),
        supabase.from("regions").select("id", { count: "exact", head: true }),
        supabase.from("local_businesses").select("id", { count: "exact", head: true }),
        supabase.from("public_resources").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        totalReports: reportsRes.count || 0,
        totalNews: newsRes.count || 0,
        totalRegions: regionsRes.count || 0,
        totalBusinesses: businessesRes.count || 0,
        totalResources: resourcesRes.count || 0,
      });

      // Fetch recent news
      const { data: newsData } = await supabase
        .from("news_items")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentNews(newsData || []);

      // Fetch latest report
      const { data: reportData } = await supabase
        .from("weekly_reports")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setLatestReport(reportData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: "Weekly Reports", value: stats.totalReports, icon: Video, color: "from-blue-500 to-cyan-500" },
    { title: "News Articles", value: stats.totalNews, icon: Newspaper, color: "from-green-500 to-emerald-500" },
    { title: "Regions", value: stats.totalRegions, icon: MapPin, color: "from-purple-500 to-pink-500" },
    { title: "Businesses", value: stats.totalBusinesses, icon: Building2, color: "from-orange-500 to-red-500" },
    { title: "Resources", value: stats.totalResources, icon: FileText, color: "from-amber-500 to-yellow-500" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-white/10 animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-slate-700 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-display font-bold text-white mb-2">Welcome to the Admin Dashboard</h2>
        <p className="text-white/70">Manage your weekly reports, news articles, regions, businesses, and public resources all in one place.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-white/10 hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Weekly Report */}
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Video className="h-5 w-5 text-amber-400" />
              Latest Weekly Report
            </CardTitle>
            <CardDescription className="text-white/60">Most recent published report</CardDescription>
          </CardHeader>
          <CardContent>
            {latestReport ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-white">{latestReport.title}</h3>
                <p className="text-sm text-white/60">{latestReport.description || "No description"}</p>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Calendar className="h-3 w-3" />
                  {new Date(latestReport.published_at).toLocaleDateString()}
                </div>
              </div>
            ) : (
              <p className="text-white/60">No weekly reports yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card className="bg-slate-800/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-green-400" />
              Recent News
            </CardTitle>
            <CardDescription className="text-white/60">Latest published articles</CardDescription>
          </CardHeader>
          <CardContent>
            {recentNews.length > 0 ? (
              <div className="space-y-3">
                {recentNews.slice(0, 4).map((news) => (
                  <div key={news.id} className="flex items-start gap-3 pb-3 border-b border-white/10 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{news.title}</p>
                      <p className="text-xs text-white/50">{news.source || "Unknown source"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">No news articles yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="bg-slate-800/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Upload weekly reports every Wednesday to maintain consistency
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Keep news articles updated with fresh content from your sources
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Add local businesses to build your directory and community engagement
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Ensure all regions have complete descriptions for better SEO
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
