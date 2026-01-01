import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AlaskaMap from "@/components/AlaskaMap";
import RegionNavigator from "@/components/RegionNavigator";
import CategorizedNews from "@/components/CategorizedNews";
import PartnerSites from "@/components/PartnerSites";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, MapPin, Users } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import InstallPrompt from "@/components/InstallPrompt";
import MartinMinesAd from "@/components/MartinMinesAd";
import GreatNorthernAd from "@/components/GreatNorthernAd";
import DateTimeWeather from "@/components/DateTimeWeather";
import NewsTicker from "@/components/NewsTicker";
import WeeklyReport from "@/components/WeeklyReport";
import AlaskaEventsCalendar from "@/components/AlaskaEventsCalendar";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import type { InteractiveMapRef } from "@/components/InteractiveMap";
import weeklyReportBg from "@/assets/weekly-report-bg.jpg";
import regionNavigatorBg from "@/assets/region-navigator-bg.jpg";
import latestNewsBg from "@/assets/latest-news-bg.jpg";
import alaskaMapBg from "@/assets/alaska-map-bg.jpg";
import alaskaEventsBg from "@/assets/alaska-events-bg.jpg";
import builtForAlaskansBg from "@/assets/built-for-alaskans-bg.jpg";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any; // JSONB from database
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
      
      {/* Weekly Report Section - Now at the top */}
      <WeeklyReport />

      {/* First Ad - Martin Mines - Full Width */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-10 bg-gradient-to-br from-background via-muted/10 to-background">
          <div className="container max-w-7xl">
            <MartinMinesAd />
          </div>
        </section>
      </AnimatedSection>

      {/* Region Navigator Section */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-16 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-60"
            style={{ backgroundImage: `url(${regionNavigatorBg})` }}
          />
          <div className="absolute inset-0 bg-background/30 dark:bg-background/40" />
          <div className="container relative z-10">
            {regions.length > 0 && (
              <RegionNavigator regions={regions} onRegionClick={handleRegionClick} />
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* Second Ad - Great Northern - Full Width */}
      <AnimatedSection animation="fade-left" delay={100}>
        <section className="py-10 bg-gradient-to-br from-background via-muted/10 to-background">
          <div className="container max-w-7xl">
            <GreatNorthernAd />
          </div>
        </section>
      </AnimatedSection>

      {/* Interactive Map Section */}
      <AnimatedSection animation="scale" delay={150}>
        <section id="map-section" className="py-16 section-divider relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-75 dark:opacity-55"
            style={{ backgroundImage: `url(${alaskaMapBg})` }}
          />
          <div className="absolute inset-0 bg-background/25 dark:bg-background/35" />
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 dark:bg-primary/10 text-primary-foreground dark:text-primary text-xs font-medium mb-4 border border-primary/30 animate-pulse">
                Interactive Explorer
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground title-gradient-animated">
                Explore Alaska by Region
              </h2>
              <p className="text-foreground/70 dark:text-muted-foreground max-w-2xl mx-auto">
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


      {/* Alaska Events Calendar Section */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-16 relative overflow-hidden section-divider">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-55"
            style={{ backgroundImage: `url(${alaskaEventsBg})` }}
          />
          <div className="absolute inset-0 bg-background/25 dark:bg-background/40" />
          <div className="container relative z-10">
            <div className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 dark:bg-accent/10 text-accent-foreground dark:text-accent text-xs font-medium mb-4 border border-accent/30">
                Stay Informed
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground title-glow">
                Alaska Events & Important Dates
              </h2>
              <p className="text-foreground/70 dark:text-muted-foreground max-w-2xl mx-auto">
                Fur Rendezvous, Iditarod, World Ice Art Championships, hunting seasons, fishing openings, and more
              </p>
            </div>
            <AlaskaEventsCalendar />
          </div>
        </section>
      </AnimatedSection>

      {/* Latest News Section - Categorized */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-16 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-40"
            style={{ backgroundImage: `url(${latestNewsBg})` }}
          />
          <div className="absolute inset-0 bg-background/50 dark:bg-background/60" />
          <div className="container max-w-7xl relative z-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 dark:bg-primary/10 text-primary dark:text-primary text-xs font-medium mb-3 border border-primary/30">
                  Breaking Stories
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Latest Alaska News</h2>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/region/statewide')}
                className="hover-lift hover:border-accent"
              >
                View All News
              </Button>
            </div>
            <CategorizedNews />
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection animation="blur" delay={100}>
        <section className="py-20 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-55"
            style={{ backgroundImage: `url(${builtForAlaskansBg})` }}
          />
          <div className="absolute inset-0 bg-background/25 dark:bg-background/40" />
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 dark:bg-accent/10 text-accent-foreground dark:text-accent text-xs font-medium mb-4 border border-accent/30">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground title-gradient-animated">
                Built for Alaskans
              </h2>
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
                    <div className="text-center group p-8 rounded-2xl bg-card/70 backdrop-blur-sm border border-border/50 card-hover">
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
