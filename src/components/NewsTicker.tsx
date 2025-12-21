import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface NewsTickerProps {
  category: string;
  color: string;
}

interface NewsItem {
  id: string;
  title: string;
  category?: string;
}

// Fallback news if database is empty
const fallbackNewsData: Record<string, string[]> = {
  gold: [
    "Gold prices surge past $2,650 amid global economic uncertainty",
    "Juneau gold nugget discovery sparks renewed interest in Southeast Alaska prospecting",
    "Fort Knox Mine reports strong Q4 production numbers near Fairbanks",
    "Interior Alaska gold mining operations expand with new environmental permits",
  ],
  state: [
    "Governor Dunleavy releases final year budget draft with focus on fiscal reform",
    "Alaska Legislature prepares for 2026 session amid projected budget deficits",
    "Anchorage Assembly approves $657 million budget for 2026",
    "Mayor LaFrance proposes 3% sales tax to cut property taxes and fund housing",
  ],
  mining: [
    "Trump administration approves Ambler Road project appeal, reversing Biden rejection",
    "Donlin Gold project advances toward production phase in Western Alaska",
    "Graphite Creek project receives federal permits for critical minerals development",
    "New rare earth minerals exploration expands across Interior Alaska",
  ],
  energy: [
    "North Slope oil production stabilizes as Willow Project advances",
    "Alaska House moves to reduce protections for Arctic lands from oil and gas activity",
    "Cook Inlet energy development shows promising growth for 2026",
    "Renewable energy projects expand across Southcentral Alaska communities",
  ],
  crime: [
    "Anchorage records 28th homicide of 2025 as police increase patrols",
    "State Troopers deploy additional units for winter highway safety",
    "APD investigates shooting at 4th Ave and Karluk St in Anchorage",
    "New public safety initiatives launched in rural Alaska communities",
  ],
};

// Category keyword mapping for fetching from database
const categoryKeywords: Record<string, string[]> = {
  gold: ["gold", "nugget", "prospecting", "placer"],
  state: ["state", "government", "governor", "legislature", "assembly", "budget", "policy", "law"],
  mining: ["mining", "mineral", "ambler", "donlin", "graphite", "rare earth"],
  energy: ["energy", "oil", "gas", "pipeline", "willow", "cook inlet", "renewable", "power"],
  crime: ["crime", "police", "trooper", "homicide", "shooting", "safety", "arrest"],
};

// Using Tailwind semantic classes for theme support - darker backgrounds for light mode
const colorClasses: Record<string, { wrapper: string; label: string; text: string }> = {
  yellow: {
    wrapper: "bg-amber-900/90 dark:bg-amber-950/50 border-amber-700 dark:border-amber-800/50",
    label: "bg-amber-800 dark:bg-amber-900/80 text-amber-100 dark:text-amber-300",
    text: "text-amber-100 dark:text-amber-200"
  },
  blue: {
    wrapper: "bg-blue-900/90 dark:bg-blue-950/50 border-blue-700 dark:border-blue-800/50",
    label: "bg-blue-800 dark:bg-blue-900/80 text-blue-100 dark:text-blue-300",
    text: "text-blue-100 dark:text-blue-200"
  },
  amber: {
    wrapper: "bg-orange-900/90 dark:bg-orange-950/50 border-orange-700 dark:border-orange-800/50",
    label: "bg-orange-800 dark:bg-orange-900/80 text-orange-100 dark:text-orange-300",
    text: "text-orange-100 dark:text-orange-200"
  },
  green: {
    wrapper: "bg-emerald-900/90 dark:bg-emerald-950/50 border-emerald-700 dark:border-emerald-800/50",
    label: "bg-emerald-800 dark:bg-emerald-900/80 text-emerald-100 dark:text-emerald-300",
    text: "text-emerald-100 dark:text-emerald-200"
  },
  red: {
    wrapper: "bg-red-900/90 dark:bg-red-950/50 border-red-700 dark:border-red-800/50",
    label: "bg-red-800 dark:bg-red-900/80 text-red-100 dark:text-red-300",
    text: "text-red-100 dark:text-red-200"
  }
};

const NewsTicker = ({ category, color }: NewsTickerProps) => {
  const [news, setNews] = useState<string[]>(fallbackNewsData[category] || []);
  const classes = colorClasses[color] || colorClasses.blue;

  useEffect(() => {
    fetchCategoryNews();
  }, [category]);

  const fetchCategoryNews = async () => {
    try {
      const keywords = categoryKeywords[category] || [];
      
      // Fetch news items from database
      const { data, error } = await supabase
        .from("news_items")
        .select("id, title, category, description")
        .order("published_at", { ascending: false })
        .limit(50);

      if (error) throw error;

      if (data && data.length > 0) {
        // Filter news by category keywords
        const filteredNews = data.filter(item => {
          const titleLower = item.title.toLowerCase();
          const descLower = (item.description || "").toLowerCase();
          const categoryLower = (item.category || "").toLowerCase();
          
          return keywords.some(keyword => 
            titleLower.includes(keyword) || 
            descLower.includes(keyword) || 
            categoryLower.includes(keyword)
          );
        });

        if (filteredNews.length > 0) {
          setNews(filteredNews.slice(0, 8).map(item => item.title));
        }
        // If no filtered results, keep fallback data
      }
    } catch (error) {
      console.error("Error fetching ticker news:", error);
      // Keep fallback data on error
    }
  };
  
  const newsString = news.join(" • ") + " • " + news.join(" • ");

  return (
    <div className={`border-y overflow-hidden ${classes.wrapper}`}>
      <div className="flex items-center">
        <div className={`px-4 py-2 font-bold uppercase text-xs whitespace-nowrap border-r border-inherit ${classes.label}`}>
          {category} News
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left flex items-center py-2">
            <span className={`text-sm whitespace-nowrap px-4 ${classes.text}`}>
              {newsString}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
