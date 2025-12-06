import { useEffect, useState } from "react";
import { ExternalLink, Building, Pickaxe, Zap, Shield, Fish, Globe, Briefcase, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  source?: string;
  category?: string;
  published_at?: string;
}

// News categories with icons and colors
const newsCategories = [
  { 
    id: "government", 
    label: "State & Government", 
    icon: Building, 
    color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    keywords: ["state", "government", "legislature", "governor", "law", "policy"]
  },
  { 
    id: "mining", 
    label: "Mining & Resources", 
    icon: Pickaxe, 
    color: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    keywords: ["mining", "gold", "mineral", "resource", "extraction"]
  },
  { 
    id: "energy", 
    label: "Energy & Oil", 
    icon: Zap, 
    color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    keywords: ["energy", "oil", "gas", "renewable", "power", "pipeline"]
  },
  { 
    id: "public_safety", 
    label: "Public Safety", 
    icon: Shield, 
    color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30",
    keywords: ["crime", "safety", "police", "trooper", "emergency", "fire"]
  },
  { 
    id: "fishing", 
    label: "Fishing & Wildlife", 
    icon: Fish, 
    color: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    keywords: ["fish", "salmon", "wildlife", "hunting", "conservation"]
  },
  { 
    id: "community", 
    label: "Community & Culture", 
    icon: Heart, 
    color: "bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/30",
    keywords: ["community", "culture", "native", "tribal", "festival", "event"]
  },
  { 
    id: "business", 
    label: "Business & Economy", 
    icon: Briefcase, 
    color: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
    keywords: ["business", "economy", "job", "tourism", "development"]
  },
  { 
    id: "general", 
    label: "General News", 
    icon: Globe, 
    color: "bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30",
    keywords: []
  },
];

// Expanded sample news data with 6 items per category
const sampleNewsByCategory: Record<string, NewsItem[]> = {
  government: [
    { id: "g1", title: "Alaska Legislature Begins 2026 Session with Focus on Fiscal Reform", source: "Alaska News", url: "#", published_at: "2025-12-06" },
    { id: "g2", title: "Governor Signs Historic Infrastructure Bill for Rural Alaska", source: "Anchorage Daily", url: "#", published_at: "2025-12-05" },
    { id: "g3", title: "State Budget Proposal Includes Record Education Funding", source: "Fairbanks News", url: "#", published_at: "2025-12-04" },
    { id: "g4", title: "New Legislation Aims to Protect Alaska's Coastal Communities", source: "Juneau Empire", url: "#", published_at: "2025-12-03" },
    { id: "g5", title: "Alaska Permanent Fund Dividend Amount Announced for 2026", source: "KTUU", url: "#", published_at: "2025-12-02" },
    { id: "g6", title: "State of the State Address Highlights Economic Priorities", source: "APRN", url: "#", published_at: "2025-12-01" },
  ],
  mining: [
    { id: "m1", title: "Major Gold Discovery Announced Near Nome Region", source: "Mining Weekly", url: "#", published_at: "2025-12-06" },
    { id: "m2", title: "Interior Mining Operations See 30% Expansion in Production", source: "Alaska Mining", url: "#", published_at: "2025-12-05" },
    { id: "m3", title: "Environmental Review Update on Pebble Mine Project", source: "Bristol Bay Times", url: "#", published_at: "2025-12-04" },
    { id: "m4", title: "Fort Knox Mine Reports Record Annual Gold Output", source: "Fairbanks Miner", url: "#", published_at: "2025-12-03" },
    { id: "m5", title: "New Rare Earth Minerals Deposit Found in Southeast Alaska", source: "AK Mining News", url: "#", published_at: "2025-12-02" },
    { id: "m6", title: "Mining Industry Creates 500 New Jobs in Interior Region", source: "Jobs Alaska", url: "#", published_at: "2025-12-01" },
  ],
  energy: [
    { id: "e1", title: "North Slope Oil Production Reaches 5-Year High", source: "Energy Alaska", url: "#", published_at: "2025-12-06" },
    { id: "e2", title: "Major Renewable Energy Project Announced for Southcentral", source: "Green Alaska", url: "#", published_at: "2025-12-05" },
    { id: "e3", title: "Trans-Alaska Pipeline Maintenance Completed Ahead of Schedule", source: "TAPS News", url: "#", published_at: "2025-12-04" },
    { id: "e4", title: "Willow Project Begins First Phase of Construction", source: "North Slope News", url: "#", published_at: "2025-12-03" },
    { id: "e5", title: "Solar Farm Project Breaks Ground in Fairbanks", source: "Interior Energy", url: "#", published_at: "2025-12-02" },
    { id: "e6", title: "LNG Export Terminal Plans Move Forward in Valdez", source: "Prince William Sound", url: "#", published_at: "2025-12-01" },
  ],
  public_safety: [
    { id: "ps1", title: "State Troopers Deploy Additional Units for Winter Patrol", source: "Alaska Safety", url: "#", published_at: "2025-12-06" },
    { id: "ps2", title: "Coast Guard Completes Major Search and Rescue Exercise", source: "USCG Alaska", url: "#", published_at: "2025-12-05" },
    { id: "ps3", title: "New Emergency Alert System Launches Statewide", source: "Emergency AK", url: "#", published_at: "2025-12-04" },
    { id: "ps4", title: "Village Public Safety Officers Training Program Expands", source: "VPSO News", url: "#", published_at: "2025-12-03" },
    { id: "ps5", title: "Avalanche Warning System Upgraded for Backcountry Safety", source: "AK Avalanche", url: "#", published_at: "2025-12-02" },
    { id: "ps6", title: "Rural Fire Department Receives New Equipment Grant", source: "AK Fire Service", url: "#", published_at: "2025-12-01" },
  ],
  fishing: [
    { id: "f1", title: "Bristol Bay Salmon Forecast Predicts Record Returns", source: "ADF&G", url: "#", published_at: "2025-12-06" },
    { id: "f2", title: "Halibut Season Regulations Updated for 2026", source: "Alaska Fishing", url: "#", published_at: "2025-12-05" },
    { id: "f3", title: "Wildlife Conservation Efforts Expand to Protect Caribou Herds", source: "USFWS", url: "#", published_at: "2025-12-04" },
    { id: "f4", title: "Commercial Crab Fishing Season Opens with High Quotas", source: "Dutch Harbor News", url: "#", published_at: "2025-12-03" },
    { id: "f5", title: "Sport Fishing License Sales Break Annual Record", source: "ADF&G", url: "#", published_at: "2025-12-02" },
    { id: "f6", title: "Salmon Habitat Restoration Project Completed on Kenai River", source: "Kenai Peninsula", url: "#", published_at: "2025-12-01" },
  ],
  community: [
    { id: "c1", title: "Fur Rendezvous 2026 Preparations in Full Swing", source: "Anchorage Events", url: "#", published_at: "2025-12-06" },
    { id: "c2", title: "Alaska Native Heritage Celebration Draws Record Crowds", source: "Interior News", url: "#", published_at: "2025-12-05" },
    { id: "c3", title: "New Community Center Opens in Downtown Juneau", source: "SE Alaska", url: "#", published_at: "2025-12-04" },
    { id: "c4", title: "World Ice Art Championships Announce 2026 Theme", source: "Fairbanks Arts", url: "#", published_at: "2025-12-03" },
    { id: "c5", title: "Iditarod Trail Committee Announces Route Changes", source: "Iditarod HQ", url: "#", published_at: "2025-12-02" },
    { id: "c6", title: "Alaska State Fair Sets New Attendance Record", source: "Palmer Events", url: "#", published_at: "2025-12-01" },
  ],
  business: [
    { id: "b1", title: "Tourism Industry Reports Record Cruise Ship Arrivals", source: "Visit Alaska", url: "#", published_at: "2025-12-06" },
    { id: "b2", title: "Tech Startup Hub Opens in Downtown Anchorage", source: "AK Business", url: "#", published_at: "2025-12-05" },
    { id: "b3", title: "Fishing Industry Economic Report Shows Strong Growth", source: "Commerce AK", url: "#", published_at: "2025-12-04" },
    { id: "b4", title: "Alaska Airlines Announces New International Routes", source: "Aviation AK", url: "#", published_at: "2025-12-03" },
    { id: "b5", title: "Small Business Grants Available for Rural Entrepreneurs", source: "SBA Alaska", url: "#", published_at: "2025-12-02" },
    { id: "b6", title: "Real Estate Market Shows Continued Growth in Anchorage", source: "AK Real Estate", url: "#", published_at: "2025-12-01" },
  ],
  general: [
    { id: "gen1", title: "Winter Storm Advisory Issued for Southcentral Alaska", source: "NWS Alaska", url: "#", published_at: "2025-12-06" },
    { id: "gen2", title: "DOT Announces Major Highway Improvement Projects", source: "AKDOT", url: "#", published_at: "2025-12-05" },
    { id: "gen3", title: "University of Alaska Researchers Make Climate Breakthrough", source: "UAF News", url: "#", published_at: "2025-12-04" },
    { id: "gen4", title: "Aurora Borealis Display Expected This Weekend", source: "Geophysical Institute", url: "#", published_at: "2025-12-03" },
    { id: "gen5", title: "Alaska Public Library System Expands Digital Resources", source: "AK Libraries", url: "#", published_at: "2025-12-02" },
    { id: "gen6", title: "New Documentary Highlights Alaska's Wilderness Areas", source: "Alaska Film", url: "#", published_at: "2025-12-01" },
  ],
};

const CategorizedNews = () => {
  const [newsByCategory, setNewsByCategory] = useState<Record<string, NewsItem[]>>(sampleNewsByCategory);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_items")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Categorize news items
        const categorized: Record<string, NewsItem[]> = {};
        newsCategories.forEach(cat => {
          categorized[cat.id] = [];
        });

        data.forEach(item => {
          let assigned = false;
          const titleLower = item.title.toLowerCase();
          const descLower = (item.description || "").toLowerCase();
          const categoryLower = (item.category || "").toLowerCase();

          for (const cat of newsCategories) {
            if (cat.id === "general") continue;
            for (const keyword of cat.keywords) {
              if (titleLower.includes(keyword) || descLower.includes(keyword) || categoryLower.includes(keyword)) {
                if (categorized[cat.id].length < 6) {
                  categorized[cat.id].push(item);
                }
                assigned = true;
                break;
              }
            }
            if (assigned) break;
          }

          if (!assigned && categorized.general.length < 6) {
            categorized.general.push(item);
          }
        });

        // Fill with sample data if empty
        Object.keys(categorized).forEach(catId => {
          if (categorized[catId].length === 0) {
            categorized[catId] = sampleNewsByCategory[catId] || [];
          }
        });

        setNewsByCategory(categorized);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
          className="rounded-full"
        >
          All Categories
        </Button>
        {newsCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full"
            >
              <Icon className="h-3 w-3 mr-1" />
              {cat.label}
            </Button>
          );
        })}
      </div>

      {/* News Grid by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsCategories
          .filter(cat => activeCategory === null || activeCategory === cat.id)
          .map((category) => {
            const Icon = category.icon;
            const news = newsByCategory[category.id] || [];
            
            return (
              <Card 
                key={category.id} 
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-border transition-colors"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Badge variant="outline" className={cn("p-1.5", category.color)}>
                      <Icon className="h-4 w-4" />
                    </Badge>
                    <span className="font-display font-semibold">{category.label}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {news.slice(0, 6).map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                            {item.source && <span>{item.source}</span>}
                            {item.published_at && (
                              <>
                                <span>•</span>
                                <span>{formatDate(item.published_at)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                  
                  {news.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No news in this category
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default CategorizedNews;