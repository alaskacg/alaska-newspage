import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AlaskaMap from "@/components/AlaskaMap";
import RegionNavigator from "@/components/RegionNavigator";
import NewsCard from "@/components/NewsCard";
import PartnerSites from "@/components/PartnerSites";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, MapPin, Users, Sparkles, Mountain, TreePine } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import InstallPrompt from "@/components/InstallPrompt";
import MartinMinesAd from "@/components/MartinMinesAd";
import GreatNorthernAd from "@/components/GreatNorthernAd";
import BidCalendarAd from "@/components/BidCalendarAd";
import DateTimeWeather from "@/components/DateTimeWeather";
import NewsTicker from "@/components/NewsTicker";
import WeeklyReport from "@/components/WeeklyReport";
import AlaskaEventsCalendar from "@/components/AlaskaEventsCalendar";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import SkeletonCard from "@/components/SkeletonCard";
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

interface Business {
  id: string;
  name: string;
  city: string;
  address: string | null;
  region_id: string;
}

interface PublicResource {
  id: string;
  name: string;
  city: string;
  address: string | null;
  region_id: string;
}

const Index = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [publicResources, setPublicResources] = useState<PublicResource[]>([]);
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

      // Fetch businesses
      const { data: businessesData, error: businessesError } = await supabase
        .from("local_businesses")
        .select("id, name, city, address, region_id");

      if (businessesError) throw businessesError;
      setBusinesses(businessesData || []);

      // Fetch public resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from("public_resources")
        .select("id, name, city, address, region_id");

      if (resourcesError) throw resourcesError;
      setPublicResources(resourcesData || []);
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
      <PWAInstallPrompt />
      <ScrollToTop />
      <Header />
      
      {/* Date, Time & Weather */}
      <DateTimeWeather />
      
      {/* News Tickers */}
      <div className="animate-fade-in">
        <NewsTicker category="state" color="blue" />
        <NewsTicker category="mining" color="amber" />
        <NewsTicker category="energy" color="green" />
        <NewsTicker category="crime" color="red" />
      </div>
      
      {/* First Ad - Compact */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-6 bg-gradient-to-br from-background via-muted/10 to-background">
          <div className="container">
            <MartinMinesAd compact />
          </div>
        </section>
      </AnimatedSection>

      {/* Video Section */}
      <AnimatedSection animation="scale" delay={150}>
        <section className="py-16 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${welcomeSectionBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          
          {/* Floating decorative elements */}
          <div className="absolute top-10 left-10 opacity-20">
            <Mountain className="h-24 w-24 text-accent animate-float" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-20">
            <TreePine className="h-20 w-20 text-primary animate-float animation-delay-500" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-bounce-soft">
                <Sparkles className="h-4 w-4" />
                Your Gateway to Alaska
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gradient-text">
                Welcome to Alaska News Page
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Your trusted resource for regional news across the Last Frontier
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-card hover-glow transition-all duration-500">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <Newspaper className="h-20 w-20 mx-auto text-primary animate-pulse-soft" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                    </div>
                    <p className="text-muted-foreground font-medium">Intro video placeholder</p>
                    <p className="text-xs text-muted-foreground/70">Embed your Canva video here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Weekly Report Section */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-16 relative overflow-hidden bg-muted/30">
          <div className="absolute inset-0 bg-gradient-to-br from-nature-gold/5 via-transparent to-accent/5" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${weeklyReportBg})` }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-nature-gold/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-15" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          
          <div className="container relative z-10">
            <WeeklyReport />
          </div>
        </section>
      </AnimatedSection>

      {/* Second Ad - Compact */}
      <AnimatedSection animation="fade-left" delay={100}>
        <section className="py-6 bg-gradient-to-br from-background via-muted/10 to-background">
          <div className="container">
            <GreatNorthernAd compact />
          </div>
        </section>
      </AnimatedSection>

      {/* Region Navigator Section */}
      <AnimatedSection animation="fade-up" delay={100}>
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
      </AnimatedSection>

      {/* Interactive Map Section */}
      <AnimatedSection animation="scale" delay={150}>
        <section id="map-section" className="py-16 section-divider">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                Interactive Explorer
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">Explore Alaska by Region</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Click on any region to discover local news, events, and information relevant to that area
              </p>
            </div>
            {regions.length > 0 ? (
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 hover-glow transition-all duration-500">
                <AlaskaMap ref={mapRef} regions={regions} businesses={businesses} publicResources={publicResources} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No regions available</p>
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* Third Ad - Compact */}
      <AnimatedSection animation="fade-right" delay={100}>
        <section className="py-6 bg-gradient-to-br from-background via-muted/10 to-background">
          <div className="container">
            <BidCalendarAd compact />
          </div>
        </section>
      </AnimatedSection>

      {/* Alaska Events Calendar Section */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-16 relative overflow-hidden section-divider">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container relative z-10">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
                Stay Informed
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">Alaska Events & Important Dates</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Track hunting seasons, fishing openings, salmon runs, moon phases, and more
              </p>
            </div>
            <AlaskaEventsCalendar />
          </div>
        </section>
      </AnimatedSection>

      {/* Latest News Section */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-16 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${latestNewsBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-transparent to-accent/5" />
          <div className="container relative z-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  Breaking Stories
                </span>
                <h2 className="text-3xl font-display font-bold">Latest News</h2>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/region/statewide')}
                className="hover-lift hover:border-accent"
              >
                View All News
              </Button>
            </div>
            {latestNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestNews.map((news, index) => (
                  <AnimatedSection
                    key={news.id}
                    animation="fade-up"
                    delay={index * 100}
                  >
                    <div className="card-hover h-full">
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
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection animation="blur" delay={100}>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl font-display font-bold">Built for Alaskans</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: MapPin,
                  title: "Regional Focus",
                  description: "News organized by Alaska's unique geographic regions for relevance",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description: "Stay connected to what matters most in your local community",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: Newspaper,
                  title: "Comprehensive Coverage",
                  description: "From Ketchikan to Utqiaġvik, all Alaska news in one place",
                  color: "from-orange-500 to-red-500"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <AnimatedSection
                    key={index}
                    animation="scale"
                    delay={index * 150}
                  >
                    <div className="text-center group p-8 rounded-2xl bg-card/50 border border-border/50 card-hover">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-display font-semibold mb-4 group-hover:text-accent transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Partner Sites */}
      <AnimatedSection animation="fade-up" delay={100}>
        <PartnerSites />
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
