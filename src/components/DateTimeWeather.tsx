import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

const DateTimeWeather = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: 28,
    condition: "Partly Cloudy",
    windSpeed: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getWeatherIcon = () => {
    const condition = weather.condition.toLowerCase();
    if (condition.includes("rain")) return <CloudRain className="w-5 h-5" />;
    if (condition.includes("cloud")) return <Cloud className="w-5 h-5" />;
    return <Sun className="w-5 h-5" />;
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-y border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {formatDate(currentTime)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-primary">
              {formatTime(currentTime)}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getWeatherIcon()}
              <span className="font-semibold text-foreground">
                {weather.temp}°F
              </span>
            </div>
            <span className="text-muted-foreground">{weather.condition}</span>
            <div className="flex items-center gap-1">
              <Wind className="w-4 h-4" />
              <span className="text-muted-foreground">{weather.windSpeed} mph</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeWeather;
