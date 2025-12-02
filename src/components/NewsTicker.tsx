import { useState } from "react";

interface NewsTickerProps {
  category: string;
  color: string;
}

const mockNewsData: Record<string, string[]> = {
  gold: [
    "Gold prices rise to $2,050 per ounce amid market uncertainty",
    "Alaska gold mining production increases 15% this quarter",
    "New gold discovery reported in Interior Alaska region",
    "Gold futures show strong momentum for Q4",
  ],
  state: [
    "Governor announces new infrastructure funding for rural Alaska",
    "Alaska Legislature convenes for special session on budget",
    "State ferry system announces expanded summer schedule",
    "New education initiatives approved for statewide implementation",
  ],
  mining: [
    "Donlin Gold project advances toward production phase",
    "Mining industry reports record investment in Alaska",
    "New environmental standards for mining operations announced",
    "Graphite Creek project receives federal permits",
  ],
  energy: [
    "Alaska North Slope oil production stabilizes at 480,000 bpd",
    "Renewable energy projects expand across Southcentral Alaska",
    "Natural gas pipeline project receives key regulatory approval",
    "Cook Inlet energy development shows promising growth",
  ],
  crime: [
    "Anchorage Police Department reports decrease in property crime",
    "State Troopers increase patrols on Alaska Highway",
    "New public safety initiative launched in rural communities",
    "Drug interdiction efforts show positive results statewide",
  ],
};

// Using Tailwind semantic classes for theme support
const colorClasses: Record<string, { wrapper: string; label: string; text: string }> = {
  yellow: {
    wrapper: "bg-amber-950/50 dark:bg-amber-950/50 border-amber-800/50 dark:border-amber-800/50",
    label: "bg-amber-900/80 dark:bg-amber-900/80 text-amber-300 dark:text-amber-300",
    text: "text-amber-200 dark:text-amber-200"
  },
  blue: {
    wrapper: "bg-blue-950/50 dark:bg-blue-950/50 border-blue-800/50 dark:border-blue-800/50",
    label: "bg-blue-900/80 dark:bg-blue-900/80 text-blue-300 dark:text-blue-300",
    text: "text-blue-200 dark:text-blue-200"
  },
  amber: {
    wrapper: "bg-orange-950/50 dark:bg-orange-950/50 border-orange-800/50 dark:border-orange-800/50",
    label: "bg-orange-900/80 dark:bg-orange-900/80 text-orange-300 dark:text-orange-300",
    text: "text-orange-200 dark:text-orange-200"
  },
  green: {
    wrapper: "bg-emerald-950/50 dark:bg-emerald-950/50 border-emerald-800/50 dark:border-emerald-800/50",
    label: "bg-emerald-900/80 dark:bg-emerald-900/80 text-emerald-300 dark:text-emerald-300",
    text: "text-emerald-200 dark:text-emerald-200"
  },
  red: {
    wrapper: "bg-red-950/50 dark:bg-red-950/50 border-red-800/50 dark:border-red-800/50",
    label: "bg-red-900/80 dark:bg-red-900/80 text-red-300 dark:text-red-300",
    text: "text-red-200 dark:text-red-200"
  }
};

const NewsTicker = ({ category, color }: NewsTickerProps) => {
  const [news] = useState(mockNewsData[category] || []);
  const classes = colorClasses[color] || colorClasses.blue;
  
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
