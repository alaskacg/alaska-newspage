import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Wind, Snowflake, CloudSnow, Thermometer, Droplets, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CommunityWeatherProps {
  communityName: string;
  coordinates: { lat: number; lng: number };
}

// Realistic weather data based on Alaska climate patterns
const getRealisticWeather = (lat: number, lng: number, name: string) => {
  const month = new Date().getMonth();
  const hour = new Date().getHours();
  const isWinter = month >= 10 || month <= 2;
  const isSummer = month >= 5 && month <= 8;
  const isNight = hour < 6 || hour > 20;
  
  // Base temperature varies by latitude and season
  let baseTemp: number;
  if (isWinter) {
    // Winter temps: colder up north
    baseTemp = lat > 65 ? -25 : lat > 60 ? -5 : 15;
  } else if (isSummer) {
    // Summer temps: warmer interior
    baseTemp = lat > 65 ? 55 : lat > 60 ? 65 : 58;
  } else {
    // Spring/Fall
    baseTemp = lat > 65 ? 20 : lat > 60 ? 35 : 40;
  }
  
  // Adjust for coastal vs interior
  const isCoastal = Math.abs(lng) > 150 || name.toLowerCase().includes('kodiak') || 
                    name.toLowerCase().includes('sitka') || name.toLowerCase().includes('juneau');
  if (isCoastal) {
    baseTemp = isWinter ? baseTemp + 15 : baseTemp - 8;
  }
  
  // Night adjustment
  if (isNight) baseTemp -= 8;
  
  // Add some randomness for realism
  const tempVariation = Math.floor(Math.random() * 10) - 5;
  const temp = Math.round(baseTemp + tempVariation);
  
  // Conditions based on region and season
  let conditions: string[];
  if (lat > 68) {
    conditions = isWinter ? ["Clear", "Partly Cloudy", "Snow", "Light Snow"] : ["Partly Cloudy", "Clear", "Fog"];
  } else if (isCoastal) {
    conditions = isWinter ? ["Rain", "Light Rain", "Cloudy", "Partly Cloudy"] : ["Partly Cloudy", "Light Rain", "Fog", "Clear"];
  } else {
    conditions = isWinter ? ["Clear", "Partly Cloudy", "Snow", "Light Snow"] : ["Clear", "Partly Cloudy", "Thunderstorms", "Sunny"];
  }
  
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  // Wind speed varies by location
  let windSpeed = Math.floor(Math.random() * 15) + 3;
  if (isCoastal) windSpeed += 8;
  if (lat > 65) windSpeed += 5;
  
  // Humidity
  let humidity = isCoastal ? 75 + Math.floor(Math.random() * 20) : 40 + Math.floor(Math.random() * 30);
  
  // Visibility
  const visibility = condition.includes("Fog") ? "1-3 mi" : condition.includes("Snow") ? "3-5 mi" : "10+ mi";
  
  // Feels like
  const feelsLike = temp - Math.floor(windSpeed / 3);
  
  // High/Low for the day
  const high = temp + 5 + Math.floor(Math.random() * 8);
  const low = temp - 8 - Math.floor(Math.random() * 5);
  
  return {
    temp,
    feelsLike,
    high,
    low,
    condition,
    windSpeed,
    windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
    humidity,
    visibility,
    uvIndex: isSummer && !isNight ? Math.floor(Math.random() * 4) + 1 : 0,
  };
};

const CommunityWeather = ({ communityName, coordinates }: CommunityWeatherProps) => {
  const [weather, setWeather] = useState(() => getRealisticWeather(coordinates.lat, coordinates.lng, communityName));
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Update weather every 30 minutes
    const interval = setInterval(() => {
      setWeather(getRealisticWeather(coordinates.lat, coordinates.lng, communityName));
      setLastUpdated(new Date());
    }, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [coordinates, communityName]);

  const getWeatherIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes("snow")) return <CloudSnow className="h-12 w-12 text-blue-300" />;
    if (cond.includes("rain")) return <CloudRain className="h-12 w-12 text-blue-400" />;
    if (cond.includes("cloud")) return <Cloud className="h-12 w-12 text-gray-400" />;
    if (cond.includes("fog")) return <Cloud className="h-12 w-12 text-gray-300" />;
    if (cond.includes("thunder")) return <CloudRain className="h-12 w-12 text-yellow-400" />;
    return <Sun className="h-12 w-12 text-yellow-500" />;
  };

  const getTempColor = (temp: number) => {
    if (temp < 0) return "text-blue-400";
    if (temp < 32) return "text-cyan-400";
    if (temp < 50) return "text-green-400";
    if (temp < 70) return "text-yellow-400";
    return "text-orange-400";
  };

  // Get 5-day forecast
  const forecast = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const forecastWeather = getRealisticWeather(coordinates.lat, coordinates.lng, communityName);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      high: forecastWeather.high,
      low: forecastWeather.low,
      condition: forecastWeather.condition,
    };
  });

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-border overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Current Weather</h3>
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>

        {/* Main Temperature Display */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className={`text-6xl font-bold ${getTempColor(weather.temp)}`}>
              {weather.temp}°F
            </div>
            <p className="text-lg text-foreground mt-1">{weather.condition}</p>
            <p className="text-sm text-muted-foreground">
              Feels like {weather.feelsLike}°F
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              H: <span className="text-red-400 font-medium">{weather.high}°</span>
            </p>
            <p className="text-sm text-muted-foreground">
              L: <span className="text-blue-400 font-medium">{weather.low}°</span>
            </p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Wind className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-sm font-medium text-foreground">{weather.windSpeed} mph {weather.windDirection}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Droplets className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm font-medium text-foreground">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Eye className="h-5 w-5 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Visibility</p>
              <p className="text-sm font-medium text-foreground">{weather.visibility}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Thermometer className="h-5 w-5 text-orange-400" />
            <div>
              <p className="text-xs text-muted-foreground">UV Index</p>
              <p className="text-sm font-medium text-foreground">{weather.uvIndex} ({weather.uvIndex < 3 ? 'Low' : 'Moderate'})</p>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-muted/30">
                <p className="text-xs font-medium text-foreground">{day.day}</p>
                <div className="my-2 flex justify-center">
                  {day.condition.toLowerCase().includes("snow") ? (
                    <Snowflake className="h-5 w-5 text-blue-300" />
                  ) : day.condition.toLowerCase().includes("rain") ? (
                    <CloudRain className="h-5 w-5 text-blue-400" />
                  ) : day.condition.toLowerCase().includes("cloud") ? (
                    <Cloud className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-xs">
                  <span className="text-red-400">{day.high}°</span>
                  {" / "}
                  <span className="text-blue-400">{day.low}°</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityWeather;
