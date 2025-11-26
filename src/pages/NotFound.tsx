import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import MartinMinesAd from "@/components/MartinMinesAd";
import DateTimeWeather from "@/components/DateTimeWeather";
import NewsTicker from "@/components/NewsTicker";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-muted/50 via-background to-muted/50">
      {/* Date, Time & Weather */}
      <DateTimeWeather />
      
      {/* News Tickers */}
      <NewsTicker category="gold" color="yellow" />
      <NewsTicker category="state" color="blue" />
      <NewsTicker category="mining" color="amber" />
      <NewsTicker category="energy" color="green" />
      <NewsTicker category="crime" color="red" />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">404</h1>
            <p className="text-2xl font-semibold text-foreground">Oops! Page not found</p>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 mt-4"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Link>
          </div>

          <MartinMinesAd />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
