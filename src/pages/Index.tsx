import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AlaskaMap from "@/components/AlaskaMap";
import RegionNavigator from "@/components/RegionNavigator";
import NewsCard from "@/components/NewsCard";
import PartnerSites from "@/components/PartnerSites";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, MapPin, Users, Search } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import InstallPrompt from "@/components/InstallPrompt";
import type { InteractiveMapRef } from "@/components/InteractiveMap";
import weeklyReportBg from "@/assets/weekly-report-bg.jpg";
import welcomeSectionBg from "@/assets/welcome-section-bg.jpg";
import regionNavigatorBg from "@/assets/region-navigator-bg.jpg";
import latestNewsBg from "@/assets/latest-news-bg.jpg";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any; // JSONB from database
}

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  source?: string;
  category?: string;
  published_at?: string;
  image_url?: string;
}

const Index = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const mapRef = useRef<InteractiveMapRef>(null);

  const handleRegionClick = (region: Region) => {
    mapRef.current?.zoomToRegion(region);
    // Smooth scroll to map
    document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch regions
      const { data: regionsData, error: regionsError } = await supabase
        .from("regions")
        .select("*")
        .order("name");

      if (regionsError) throw regionsError;
      setRegions(regionsData || []);

      // Fetch latest news
      const { data: newsData, error: newsError } = await supabase
        .from("news_items")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (newsError) throw newsError;
      setLatestNews(newsData || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20">
          <LoadingSpinner size="lg" text="Loading Alaska news..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <InstallPrompt />
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20 overflow-hidden">
        <div className="container">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Gateway to Alaska News
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Discover regional news and information organized by Alaska's unique geography.
              Stay connected to what matters in your community.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="transition-all duration-300 hover:scale-105"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Explore Regions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105"
              >
                <Search className="mr-2 h-5 w-5" />
                Search News
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Moved above Weekly Report */}
      <section className="py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${welcomeSectionBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-display font-semibold mb-3">Welcome to Alaska News Page</h2>
            <p className="text-muted-foreground mb-8">
              Learn how to navigate regional news and stay informed about Alaska
            </p>
            <div className="aspect-video rounded-lg overflow-hidden border border-border shadow-xl bg-card">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-center space-y-4">
                  <Newspaper className="h-16 w-16 mx-auto text-primary" />
                  <p className="text-muted-foreground">Intro video placeholder</p>
                  <p className="text-xs text-muted-foreground">Embed your Canva video here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Report Section */}
      <section className="py-16 relative overflow-hidden bg-muted/30">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-nature-gold/5 via-transparent to-accent/5" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${weeklyReportBg})` }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-nature-gold/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20" style={{ animationDuration: '8s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-nature-gold/20 to-yellow-500/20 border-2 border-nature-gold/40 rounded-full mb-6 backdrop-blur-sm shadow-lg">
                <span className="text-sm font-display font-semibold text-nature-gold">✦ Published Every Wednesday ✦</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3 text-muted-foreground">
                The Alaska News Page Weekly Report w/ J.R. Kitchens
              </h2>
            </div>
            <div className="glass rounded-2xl border-2 border-nature-gold/30 p-8 md:p-12 shadow-2xl hover:shadow-nature-gold/20 transition-all duration-500 hover:scale-[1.02] group">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground text-center text-lg leading-relaxed">
                  The latest weekly report will be posted here every Wednesday. Check back for J.R. Kitchens' insights on Alaska news and events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Region Navigator Section */}
      <section className="py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${regionNavigatorBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="container relative z-10">
          {regions.length > 0 && (
            <RegionNavigator regions={regions} onRegionClick={handleRegionClick} />
          )}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map-section" className="py-16">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl font-display font-semibold mb-3">Explore Alaska by Region</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any region to discover local news, events, and information relevant to that area
            </p>
          </div>
          {regions.length > 0 ? (
            <AlaskaMap ref={mapRef} regions={regions} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No regions available</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${latestNewsBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-transparent to-accent/5" />
        <div className="container relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-semibold">Latest News</h2>
            <Button variant="outline" onClick={() => navigate('/region/statewide')}>
              View All
            </Button>
          </div>
          {latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((news, index) => (
                <div 
                  key={news.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NewsCard
                    title={news.title}
                    description={news.description}
                    url={news.url}
                    source={news.source}
                    category={news.category}
                    publishedAt={news.published_at}
                    imageUrl={news.image_url}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No news items available yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Regional Focus",
                description: "News organized by Alaska's unique geographic regions",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Stay connected to what matters in your local area",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Newspaper,
                title: "Comprehensive Coverage",
                description: "From Ketchikan to Utqiaġvik, all Alaska in one place",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center group animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Sites */}
      <PartnerSites />

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card/50 backdrop-blur-sm">
        <div className="container text-center">
          <p className="text-muted-foreground font-light">© 2025 Alaska News Page. Connecting communities across the Last Frontier.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
