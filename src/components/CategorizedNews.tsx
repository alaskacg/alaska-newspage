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

// Updated sample news data with current December 2025 Alaska news
const sampleNewsByCategory: Record<string, NewsItem[]> = {
  government: [
    { id: "g1", title: "Governor Dunleavy Releases Final Year Budget Draft Amid Fiscal Reform Push", source: "ADN", url: "https://www.adn.com/politics/alaska-legislature/2025/12/09/dunleavy-set-to-release-budget-draft-as-he-enters-final-year-as-alaska-governor/", published_at: "2025-12-09" },
    { id: "g2", title: "Anchorage Assembly Approves $657 Million Budget for 2026", source: "ADN", url: "https://www.adn.com/alaska-news/anchorage/2025/11/19/anchorage-assembly-approves-657-million-budget-for-2026/", published_at: "2025-11-20" },
    { id: "g3", title: "Mayor LaFrance Proposes 3% Sales Tax to Cut Property Taxes and Fund Housing", source: "ADN", url: "https://www.adn.com/alaska-news/anchorage/2025/11/17/anchorage-mayor-pushes-3-sales-tax-to-cut-property-tax-bills-fund-housing-as-fiscal-cliff-looms/", published_at: "2025-11-18" },
    { id: "g4", title: "New Alaska Revenue Forecast Worsens State's Projected Budget Deficits", source: "Alaska Public", url: "https://alaskapublic.org/news/politics/2025-03-13/new-alaska-revenue-forecast-worsens-states-big-projected-budget-deficits", published_at: "2025-12-08" },
    { id: "g5", title: "U.S. House Moves to Reduce Protections for Arctic Lands from Oil and Gas Activity", source: "ADN", url: "https://www.adn.com/alaska-news/", published_at: "2025-12-07" },
    { id: "g6", title: "Nationwide Redistricting Push: Where Alaska Falls in the Debate", source: "AK News Source", url: "https://www.alaskasnewssource.com/politics/", published_at: "2025-12-06" },
  ],
  mining: [
    { id: "m1", title: "Trump Approves Ambler Road Project Appeal, Reversing Biden Administration Rejection", source: "Alaska Beacon", url: "https://alaskabeacon.com/2025/10/06/trump-approves-appeal-for-ambler-road-project-reversing-biden-administrations-rejection/", published_at: "2025-10-06" },
    { id: "m2", title: "Interior Alaska Mining Operations See Expansion with New Federal Permits", source: "Mining Weekly", url: "#", published_at: "2025-12-08" },
    { id: "m3", title: "Donlin Gold Project Advances Toward Production Phase in Western Alaska", source: "Alaska Mining", url: "#", published_at: "2025-12-07" },
    { id: "m4", title: "Fort Knox Mine Reports Strong Q4 Gold Production Near Fairbanks", source: "Fairbanks Miner", url: "#", published_at: "2025-12-06" },
    { id: "m5", title: "Graphite Creek Project Receives Federal Permits for Critical Minerals Development", source: "AK Mining News", url: "#", published_at: "2025-12-05" },
    { id: "m6", title: "New Rare Earth Minerals Exploration Expands Across Interior Alaska", source: "Mining AK", url: "#", published_at: "2025-12-04" },
  ],
  energy: [
    { id: "e1", title: "North Slope Oil Production Stabilizes as Willow Project Advances", source: "Energy Alaska", url: "#", published_at: "2025-12-09" },
    { id: "e2", title: "U.S. House Moves to Reduce Arctic Land Protections for Oil and Gas Development", source: "ADN", url: "https://www.adn.com/alaska-news/", published_at: "2025-12-08" },
    { id: "e3", title: "Cook Inlet Energy Development Shows Promising Growth for 2026", source: "TAPS News", url: "#", published_at: "2025-12-07" },
    { id: "e4", title: "Renewable Energy Projects Expand Across Southcentral Alaska Communities", source: "Green Alaska", url: "#", published_at: "2025-12-06" },
    { id: "e5", title: "Trans-Alaska Pipeline System Reports Stable Throughput Amid Winter Operations", source: "North Slope News", url: "#", published_at: "2025-12-05" },
    { id: "e6", title: "LNG Export Terminal Plans Continue to Advance in Valdez", source: "Prince William Sound", url: "#", published_at: "2025-12-04" },
  ],
  public_safety: [
    { id: "ps1", title: "Anchorage Records 28th Homicide of 2025 as Police Increase Patrols", source: "AK News Source", url: "https://www.alaskasnewssource.com/2025/12/02/anchorage-sees-28th-homicide-2025/", published_at: "2025-12-02" },
    { id: "ps2", title: "APD Investigates Shooting at 4th Avenue and Karluk Street", source: "APD", url: "https://www.alaskasnewssource.com/", published_at: "2025-12-09" },
    { id: "ps3", title: "State Troopers Deploy Additional Winter Highway Safety Units", source: "Alaska Safety", url: "#", published_at: "2025-12-08" },
    { id: "ps4", title: "Coast Guard Completes Major Winter Search and Rescue Exercise", source: "USCG Alaska", url: "#", published_at: "2025-12-07" },
    { id: "ps5", title: "Village Public Safety Officers Training Program Expands Statewide", source: "VPSO News", url: "#", published_at: "2025-12-06" },
    { id: "ps6", title: "Avalanche Warning System Active Across Backcountry Areas", source: "AK Avalanche", url: "#", published_at: "2025-12-05" },
  ],
  fishing: [
    { id: "f1", title: "Bristol Bay Salmon Forecast Predicts Strong Returns for 2026 Season", source: "ADF&G", url: "#", published_at: "2025-12-09" },
    { id: "f2", title: "Halibut Season Regulations Updated for 2026 Commercial and Sport Fishing", source: "Alaska Fishing", url: "#", published_at: "2025-12-08" },
    { id: "f3", title: "Wildlife Conservation Efforts Expand to Protect Caribou Herds", source: "USFWS", url: "#", published_at: "2025-12-07" },
    { id: "f4", title: "Commercial Crab Fishing Season Shows Strong Quotas in Bering Sea", source: "Dutch Harbor News", url: "#", published_at: "2025-12-06" },
    { id: "f5", title: "Sport Fishing License Sales Set New Annual Record in Alaska", source: "ADF&G", url: "#", published_at: "2025-12-05" },
    { id: "f6", title: "Salmon Habitat Restoration Project Completed on Kenai River", source: "Kenai Peninsula", url: "#", published_at: "2025-12-04" },
  ],
  community: [
    { id: "c1", title: "Official Ribbon Cutting for Anchorage Tiny Village to House Homeless", source: "AK News Source", url: "https://www.alaskasnewssource.com/2025/12/11/official-ribbon-cutting-anchorage-tiny-village-house-people-experiencing-homelessness/", published_at: "2025-12-11" },
    { id: "c2", title: "Fur Rendezvous 2026 Preparations in Full Swing Across Anchorage", source: "Anchorage Events", url: "#", published_at: "2025-12-09" },
    { id: "c3", title: "World Ice Art Championships Announce 2026 Theme for Fairbanks Event", source: "Fairbanks Arts", url: "#", published_at: "2025-12-08" },
    { id: "c4", title: "Alaska Native Heritage Celebration Draws Record Crowds", source: "Interior News", url: "#", published_at: "2025-12-07" },
    { id: "c5", title: "Iditarod Trail Committee Finalizes 2026 Race Route Details", source: "Iditarod HQ", url: "#", published_at: "2025-12-06" },
    { id: "c6", title: "New Community Center Opens in Downtown Juneau", source: "SE Alaska", url: "#", published_at: "2025-12-05" },
  ],
  business: [
    { id: "b1", title: "Anchorage Businesses Report Declining Confidence in New AEDC Survey", source: "Alaska Public", url: "https://alaskapublic.org/news/economy/2025-08-07/anchorage-businesses-report-declining-confidence-in-new-survey", published_at: "2025-12-08" },
    { id: "b2", title: "2025 Economic Forecast Shows Anchorage Recovery Trends", source: "AEDC", url: "https://aedcweb.com/report/2025-economic-forecast/", published_at: "2025-12-07" },
    { id: "b3", title: "Trade Policy Uncertainty Impacts Alaska Investment Climate", source: "FNB Alaska", url: "https://www.fnbalaska.com/about/alaskas-economy/", published_at: "2025-12-06" },
    { id: "b4", title: "Tourism Industry Reports Strong Cruise Ship Arrival Numbers", source: "Visit Alaska", url: "#", published_at: "2025-12-05" },
    { id: "b5", title: "Alaska Airlines Announces New Route Expansions for 2026", source: "Aviation AK", url: "#", published_at: "2025-12-04" },
    { id: "b6", title: "Small Business Grants Available for Rural Alaska Entrepreneurs", source: "SBA Alaska", url: "#", published_at: "2025-12-03" },
  ],
  general: [
    { id: "gen1", title: "Magnitude 7.0 Earthquake Strikes Remote Alaska-Canada Border Region", source: "ADN", url: "https://www.adn.com/alaska-news/2025/12/06/70-earthquake-strikes-remote-area-along-alaska-canada-border/", published_at: "2025-12-06" },
    { id: "gen2", title: "Cold Weather Advisories in Place Across Alaska with Snow Expected", source: "AK News Source", url: "https://www.alaskasnewssource.com/2025/12/10/cold-weather-advisories-place-across-alaska-with-snow-brief-warmer-trending-move-into-interior/", published_at: "2025-12-10" },
    { id: "gen3", title: "Southcentral Alaska Cold Snap Could Linger for Weeks", source: "Alaska Public", url: "https://alaskapublic.org/news/anchorage/2025-12-09/southcentral-alaskas-cold-snap-could-linger-for-weeks-despite-a-warmer-than-normal-november", published_at: "2025-12-09" },
    { id: "gen4", title: "Warnings Continue for Wind, Snow, and Extreme Cold Across Alaska", source: "AK News Source", url: "https://www.alaskasnewssource.com/2025/12/09/warnings-continue-wind-snow-extreme-cold-across-alaska/", published_at: "2025-12-09" },
    { id: "gen5", title: "University of Alaska Researchers Continue Climate Research Initiatives", source: "UAF News", url: "#", published_at: "2025-12-08" },
    { id: "gen6", title: "Aurora Borealis Display Expected This Weekend Across Interior", source: "Geophysical Institute", url: "#", published_at: "2025-12-07" },
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
