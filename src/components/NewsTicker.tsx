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

const colorStyles: Record<string, { bg: string; border: string; label: string; text: string }> = {
  yellow: {
    bg: "rgb(20, 16, 6)",
    border: "rgb(55, 48, 18)",
    label: "rgb(234, 179, 8)",
    text: "rgb(253, 224, 71)"
  },
  blue: {
    bg: "rgb(3, 7, 18)",
    border: "rgb(30, 58, 138)",
    label: "rgb(147, 197, 253)",
    text: "rgb(191, 219, 254)"
  },
  amber: {
    bg: "rgb(23, 15, 3)",
    border: "rgb(78, 44, 0)",
    label: "rgb(251, 191, 36)",
    text: "rgb(252, 211, 77)"
  },
  green: {
    bg: "rgb(2, 16, 8)",
    border: "rgb(5, 46, 22)",
    label: "rgb(74, 222, 128)",
    text: "rgb(134, 239, 172)"
  },
  red: {
    bg: "rgb(20, 3, 3)",
    border: "rgb(127, 29, 29)",
    label: "rgb(252, 165, 165)",
    text: "rgb(254, 202, 202)"
  }
};

const NewsTicker = ({ category, color }: NewsTickerProps) => {
  const [news] = useState(mockNewsData[category] || []);
  const colors = colorStyles[color] || colorStyles.blue;
  
  const newsString = news.join(" • ") + " • " + news.join(" • ");

  return (
    <div 
      className="border-y overflow-hidden"
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
    >
      <div className="flex items-center">
        <div 
          className="px-4 py-2 font-bold uppercase text-xs whitespace-nowrap border-r"
          style={{ 
            backgroundColor: colors.border, 
            color: colors.label,
            borderRightColor: colors.border 
          }}
        >
          {category} News
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left flex items-center py-2">
            <span 
              className="text-sm whitespace-nowrap px-4"
              style={{ color: colors.text }}
            >
              {newsString}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
