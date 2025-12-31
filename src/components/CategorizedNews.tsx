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

// Updated sample news data - Late December 2025 / January 2026 Alaska news
const sampleNewsByCategory: Record<string, NewsItem[]> = {
  government: [
    { id: "g1", title: "Alaska Legislature Convenes January 21 for 2026 Session", source: "ADN", url: "https://www.adn.com/politics/alaska-legislature/", published_at: "2025-12-30" },
    { id: "g2", title: "Governor Dunleavy Outlines Final Year Legislative Priorities", source: "ADN", url: "https://www.adn.com/politics/", published_at: "2025-12-28" },
    { id: "g3", title: "State Revenue Forecast Shows Modest Improvement for FY2026", source: "Alaska Public", url: "https://alaskapublic.org/news/politics/", published_at: "2025-12-27" },
    { id: "g4", title: "Anchorage 2026 Budget Implementation Begins January 1", source: "ADN", url: "https://www.adn.com/alaska-news/anchorage/", published_at: "2025-12-26" },
    { id: "g5", title: "Legislature to Address Fiscal Gap in Upcoming Session", source: "Alaska Beacon", url: "https://alaskabeacon.com/", published_at: "2025-12-25" },
    { id: "g6", title: "Municipal Elections Calendar Set for 2026 Statewide", source: "AK News Source", url: "https://www.alaskasnewssource.com/politics/", published_at: "2025-12-24" },
  ],
  mining: [
    { id: "m1", title: "Ambler Road Project Advances with 2026 Construction Timeline", source: "Alaska Beacon", url: "https://alaskabeacon.com/", published_at: "2025-12-30" },
    { id: "m2", title: "Fort Knox Mine Announces Strong 2025 Production Results", source: "Fairbanks Miner", url: "#", published_at: "2025-12-29" },
    { id: "m3", title: "Donlin Gold Environmental Review Nears Completion", source: "Alaska Mining", url: "#", published_at: "2025-12-28" },
    { id: "m4", title: "Critical Minerals Initiative Gains Momentum in Alaska", source: "Mining Weekly", url: "#", published_at: "2025-12-27" },
    { id: "m5", title: "Graphite Creek Project Sets 2026 Development Goals", source: "AK Mining News", url: "#", published_at: "2025-12-26" },
    { id: "m6", title: "Interior Placer Mining Permits Increase for 2026 Season", source: "Mining AK", url: "#", published_at: "2025-12-25" },
  ],
  energy: [
    { id: "e1", title: "Willow Project On Track for 2026 Production Milestones", source: "Energy Alaska", url: "#", published_at: "2025-12-30" },
    { id: "e2", title: "North Slope Oil Production Ends 2025 Above Projections", source: "ADN", url: "https://www.adn.com/alaska-news/", published_at: "2025-12-29" },
    { id: "e3", title: "Cook Inlet Natural Gas Exploration Yields New Discoveries", source: "TAPS News", url: "#", published_at: "2025-12-28" },
    { id: "e4", title: "Renewable Energy Projects Expand Across Rural Alaska", source: "Green Alaska", url: "#", published_at: "2025-12-27" },
    { id: "e5", title: "Trans-Alaska Pipeline Reports Record Winter Efficiency", source: "North Slope News", url: "#", published_at: "2025-12-26" },
    { id: "e6", title: "Valdez LNG Terminal Feasibility Study Released", source: "Prince William Sound", url: "#", published_at: "2025-12-25" },
  ],
  public_safety: [
    { id: "ps1", title: "APD Increases Holiday Patrols Through New Years", source: "AK News Source", url: "https://www.alaskasnewssource.com/", published_at: "2025-12-30" },
    { id: "ps2", title: "State Troopers Issue Winter Driving Safety Reminder", source: "AST", url: "#", published_at: "2025-12-29" },
    { id: "ps3", title: "Coast Guard Maintains Winter Readiness in Alaskan Waters", source: "USCG Alaska", url: "#", published_at: "2025-12-28" },
    { id: "ps4", title: "Avalanche Danger Elevated Across Backcountry Areas", source: "AK Avalanche", url: "#", published_at: "2025-12-27" },
    { id: "ps5", title: "Village Public Safety Program Expands to Additional Communities", source: "VPSO News", url: "#", published_at: "2025-12-26" },
    { id: "ps6", title: "Fire Departments Prepare for Dry Winter Fire Season", source: "Alaska Safety", url: "#", published_at: "2025-12-25" },
  ],
  fishing: [
    { id: "f1", title: "Bristol Bay 2026 Salmon Forecast Released by ADF&G", source: "ADF&G", url: "#", published_at: "2025-12-30" },
    { id: "f2", title: "Commercial Crab Season Wraps Up Strong in Bering Sea", source: "Dutch Harbor News", url: "#", published_at: "2025-12-29" },
    { id: "f3", title: "Halibut Regulations Finalized for 2026 Season", source: "Alaska Fishing", url: "#", published_at: "2025-12-28" },
    { id: "f4", title: "Ice Fishing Season Peaks Across Interior Alaska Lakes", source: "Interior Outdoors", url: "#", published_at: "2025-12-27" },
    { id: "f5", title: "Salmon Habitat Enhancement Projects Planned for 2026", source: "USFWS", url: "#", published_at: "2025-12-26" },
    { id: "f6", title: "Sport Fishing License Revenue Sets Record in 2025", source: "ADF&G", url: "#", published_at: "2025-12-25" },
  ],
  community: [
    { id: "c1", title: "New Years Eve Celebrations Planned Across Alaska", source: "AK News Source", url: "https://www.alaskasnewssource.com/", published_at: "2025-12-31" },
    { id: "c2", title: "Fur Rendezvous 2026 Schedule Announced for February", source: "Anchorage Events", url: "#", published_at: "2025-12-29" },
    { id: "c3", title: "World Ice Art Championships Carving Begins February 16", source: "Fairbanks Arts", url: "#", published_at: "2025-12-28" },
    { id: "c4", title: "Iditarod 2026 Musher Entries Now Open", source: "Iditarod HQ", url: "#", published_at: "2025-12-27" },
    { id: "c5", title: "Winter Festival Season Continues Through January", source: "Visit Alaska", url: "#", published_at: "2025-12-26" },
    { id: "c6", title: "Community Ice Rinks Open Across Southcentral Alaska", source: "Parks & Rec", url: "#", published_at: "2025-12-25" },
  ],
  business: [
    { id: "b1", title: "Alaska Economic Outlook 2026: Cautious Optimism", source: "AEDC", url: "https://aedcweb.com/", published_at: "2025-12-30" },
    { id: "b2", title: "Holiday Retail Sales Strong Across Anchorage", source: "Alaska Business", url: "#", published_at: "2025-12-29" },
    { id: "b3", title: "Tourism Industry Projects Record 2026 Season", source: "Visit Alaska", url: "#", published_at: "2025-12-28" },
    { id: "b4", title: "Alaska Airlines Expands Seattle-Alaska Routes", source: "Aviation AK", url: "#", published_at: "2025-12-27" },
    { id: "b5", title: "Small Business Development Programs Launch for 2026", source: "SBA Alaska", url: "#", published_at: "2025-12-26" },
    { id: "b6", title: "Construction Industry Outlook Positive for New Year", source: "AGC Alaska", url: "#", published_at: "2025-12-25" },
  ],
  general: [
    { id: "gen1", title: "New Years Weather: Cold Temperatures Expected Statewide", source: "NWS Alaska", url: "#", published_at: "2025-12-31" },
    { id: "gen2", title: "Northern Lights Viewing Excellent Through Holiday Week", source: "Geophysical Institute", url: "#", published_at: "2025-12-30" },
    { id: "gen3", title: "Winter Storm Advisories Posted for Coastal Communities", source: "AK News Source", url: "https://www.alaskasnewssource.com/", published_at: "2025-12-29" },
    { id: "gen4", title: "Alaska DOT Crews Working to Keep Highways Clear", source: "AKDOT", url: "#", published_at: "2025-12-28" },
    { id: "gen5", title: "Year in Review: Top Alaska Stories of 2025", source: "ADN", url: "https://www.adn.com/", published_at: "2025-12-27" },
    { id: "gen6", title: "Cold Snap Expected to Continue Into Early January", source: "Alaska Public", url: "https://alaskapublic.org/", published_at: "2025-12-26" },
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
