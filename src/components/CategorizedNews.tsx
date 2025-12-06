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

// Sample news data organized by category (will be replaced with Supabase data)
const sampleNewsByCategory: Record<string, NewsItem[]> = {
  government: [
    { id: "1", title: "Alaska Legislature Begins 2026 Session", source: "Alaska News", url: "#", published_at: "2025-12-05" },
    { id: "2", title: "Governor Signs New Infrastructure Bill", source: "Anchorage Daily", url: "#", published_at: "2025-12-04" },
    { id: "3", title: "State Budget Proposal Released", source: "Fairbanks News", url: "#", published_at: "2025-12-03" },
  ],
  mining: [
    { id: "4", title: "New Gold Discovery Near Nome", source: "Mining Weekly", url: "#", published_at: "2025-12-05" },
    { id: "5", title: "Interior Mining Operations Expand", source: "Alaska Mining", url: "#", published_at: "2025-12-04" },
    { id: "6", title: "Environmental Review for Pebble Mine Update", source: "Bristol Bay Times", url: "#", published_at: "2025-12-03" },
  ],
  energy: [
    { id: "7", title: "North Slope Oil Production Increases", source: "Energy Alaska", url: "#", published_at: "2025-12-05" },
    { id: "8", title: "Renewable Energy Projects Announced", source: "Green Alaska", url: "#", published_at: "2025-12-04" },
    { id: "9", title: "Pipeline Maintenance Scheduled", source: "TAPS News", url: "#", published_at: "2025-12-03" },
  ],
  public_safety: [
    { id: "10", title: "State Troopers Respond to Winter Storms", source: "Alaska Safety", url: "#", published_at: "2025-12-05" },
    { id: "11", title: "Search and Rescue Training Exercise", source: "AKSAR", url: "#", published_at: "2025-12-04" },
    { id: "12", title: "New Emergency Alert System Launched", source: "Emergency AK", url: "#", published_at: "2025-12-03" },
  ],
  fishing: [
    { id: "13", title: "Bristol Bay Salmon Forecast Released", source: "ADF&G", url: "#", published_at: "2025-12-05" },
    { id: "14", title: "Halibut Season Regulations Updated", source: "Alaska Fishing", url: "#", published_at: "2025-12-04" },
    { id: "15", title: "Wildlife Conservation Efforts Expand", source: "USFWS", url: "#", published_at: "2025-12-03" },
  ],
  community: [
    { id: "16", title: "Fur Rendezvous Preparations Underway", source: "Anchorage Events", url: "#", published_at: "2025-12-05" },
    { id: "17", title: "Native Culture Celebration in Fairbanks", source: "Interior News", url: "#", published_at: "2025-12-04" },
    { id: "18", title: "Community Center Opens in Juneau", source: "SE Alaska", url: "#", published_at: "2025-12-03" },
  ],
  business: [
    { id: "19", title: "Tourism Numbers Reach New High", source: "Visit Alaska", url: "#", published_at: "2025-12-05" },
    { id: "20", title: "New Tech Startup Launches in Anchorage", source: "AK Business", url: "#", published_at: "2025-12-04" },
    { id: "21", title: "Fishing Industry Economic Report", source: "Commerce AK", url: "#", published_at: "2025-12-03" },
  ],
  general: [
    { id: "22", title: "Weather Advisory for Southcentral Alaska", source: "NWS Alaska", url: "#", published_at: "2025-12-05" },
    { id: "23", title: "Transportation Updates for Winter", source: "AKDOT", url: "#", published_at: "2025-12-04" },
    { id: "24", title: "University of Alaska Research Highlights", source: "UAF News", url: "#", published_at: "2025-12-03" },
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
        .limit(50);

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
                if (categorized[cat.id].length < 4) {
                  categorized[cat.id].push(item);
                }
                assigned = true;
                break;
              }
            }
            if (assigned) break;
          }

          if (!assigned && categorized.general.length < 4) {
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
                  {news.slice(0, 4).map((item) => (
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
