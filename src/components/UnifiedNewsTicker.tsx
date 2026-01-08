import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  category?: string;
}

// Fallback news organized by category
const fallbackNewsData: Record<string, string[]> = {
  state: [
    "Governor Dunleavy presents final year legislative agenda for 2026 session",
    "Alaska Legislature convenes January 21 with budget reform priority",
  ],
  mining: [
    "Ambler Road project moves forward with new federal approval",
    "Donlin Gold completes key permitting milestone in Western Alaska",
  ],
  energy: [
    "Willow Project on track for 2026 production milestones on North Slope",
    "Cook Inlet natural gas exploration yields promising results",
  ],
  crime: [
    "Anchorage Police Department increases downtown patrols for holiday season",
    "State Troopers remind drivers of winter road safety precautions",
  ],
};

// Category keyword mapping
const categoryKeywords: Record<string, string[]> = {
  state: ["state", "government", "governor", "legislature", "assembly", "budget", "policy", "law"],
  mining: ["mining", "mineral", "ambler", "donlin", "graphite", "rare earth", "gold", "nugget"],
  energy: ["energy", "oil", "gas", "pipeline", "willow", "cook inlet", "renewable", "power"],
  crime: ["crime", "police", "trooper", "homicide", "shooting", "safety", "arrest"],
};

const categoryLabels: Record<string, string> = {
  state: "STATE",
  mining: "MINING",
  energy: "ENERGY",
  crime: "CRIME",
};

const categoryColors: Record<string, string> = {
  state: "text-blue-300",
  mining: "text-amber-300",
  energy: "text-emerald-300",
  crime: "text-red-300",
};

const UnifiedNewsTicker = () => {
  const [allNews, setAllNews] = useState<{ title: string; category: string }[]>([]);

  useEffect(() => {
    fetchAllCategoryNews();
  }, []);

  const fetchAllCategoryNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news_items")
        .select("id, title, category, description")
        .order("published_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      const categorizedNews: { title: string; category: string }[] = [];

      // Process each category
      Object.keys(categoryKeywords).forEach(category => {
        const keywords = categoryKeywords[category];
        
        if (data && data.length > 0) {
          const filtered = data.filter(item => {
            const titleLower = item.title.toLowerCase();
            const descLower = (item.description || "").toLowerCase();
            const catLower = (item.category || "").toLowerCase();
            
            return keywords.some(keyword => 
              titleLower.includes(keyword) || 
              descLower.includes(keyword) || 
              catLower.includes(keyword)
            );
          });

          if (filtered.length > 0) {
            filtered.slice(0, 3).forEach(item => {
              categorizedNews.push({ title: item.title, category });
            });
          } else {
            // Use fallback for this category
            fallbackNewsData[category]?.slice(0, 2).forEach(title => {
              categorizedNews.push({ title, category });
            });
          }
        } else {
          // Use fallback
          fallbackNewsData[category]?.slice(0, 2).forEach(title => {
            categorizedNews.push({ title, category });
          });
        }
      });

      setAllNews(categorizedNews);
    } catch (error) {
      console.error("Error fetching ticker news:", error);
      // Use fallback data
      const fallbackNews: { title: string; category: string }[] = [];
      Object.keys(fallbackNewsData).forEach(category => {
        fallbackNewsData[category].forEach(title => {
          fallbackNews.push({ title, category });
        });
      });
      setAllNews(fallbackNews);
    }
  };

  // Build the scrolling content with category labels
  const buildTickerContent = () => {
    return allNews.map((item, index) => (
      <span key={index} className="inline-flex items-center">
        <span className={`font-bold text-xs uppercase mr-2 ${categoryColors[item.category] || 'text-slate-300'}`}>
          [{categoryLabels[item.category] || item.category.toUpperCase()}]
        </span>
        <span className="text-slate-100">{item.title}</span>
        <span className="mx-4 text-slate-500">•</span>
      </span>
    ));
  };

  return (
    <div className="bg-slate-900/95 dark:bg-slate-950/80 border-y border-slate-700 dark:border-slate-800/50 overflow-hidden">
      <div className="flex items-center">
        <div className="px-4 py-2.5 font-bold uppercase text-xs whitespace-nowrap border-r border-slate-700 bg-primary/90 text-primary-foreground">
          Alaska News
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left flex items-center py-2.5">
            <span className="text-sm whitespace-nowrap px-4 flex items-center">
              {buildTickerContent()}
              {/* Duplicate for seamless loop */}
              {buildTickerContent()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedNewsTicker;