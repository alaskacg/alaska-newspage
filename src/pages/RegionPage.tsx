import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import BusinessCard from "@/components/BusinessCard";
import PublicResourceCard from "@/components/PublicResourceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerSites from "@/components/PartnerSites";
import MartinMinesAd from "@/components/MartinMinesAd";
import DateTimeWeather from "@/components/DateTimeWeather";
import NewsTicker from "@/components/NewsTicker";
import WeeklyReport from "@/components/WeeklyReport";
import RegionContentManagement from "@/components/admin/RegionContentManagement";
import AlaskaEventsCalendar from "@/components/AlaskaEventsCalendar";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, Newspaper, Building2, Shield } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

// Import regional banner images
import interiorBanner from "@/assets/interior-banner.jpg";
import northernBanner from "@/assets/northern-banner.jpg";
import southcentralBanner from "@/assets/southcentral-banner.jpg";
import southeastBanner from "@/assets/southeast-banner.jpg";
import southwestBanner from "@/assets/southwest-banner.jpg";
import statewideBanner from "@/assets/statewide-banner.jpg";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
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
  description: string | null;
  category: string;
  tags: string[] | null;
  contact_phone: string | null;
  contact_email: string | null;
  address: string | null;
  website_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  logo_url: string | null;
  is_featured: boolean;
  city: string | null;
}

interface PublicResource {
  id: string;
  name: string;
  category: string;
  description: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  website_url: string | null;
  address: string | null;
  hours: string | null;
  is_featured: boolean;
  city: string | null;
}

const RegionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [region, setRegion] = useState<Region | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [publicResources, setPublicResources] = useState<PublicResource[]>([]);
  const [resourcesByCity, setResourcesByCity] = useState<Map<string, PublicResource[]>>(new Map());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // Map region slugs to banner images
  const regionBanners: Record<string, string> = {
    interior: interiorBanner,
    northern: northernBanner,
    southcentral: southcentralBanner,
    southeast: southeastBanner,
    southwest: southwestBanner,
    statewide: statewideBanner,
  };

  useEffect(() => {
    fetchData();
    checkUser();
  }, [slug]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchFavorites(user.id);
      // Check if user is admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      
      if (roleData) {
        setIsAdmin(true);
      }
    }
  };

  const fetchFavorites = async (userId: string) => {
    const { data } = await supabase
      .from("user_favorites")
      .select("news_item_id")
      .eq("user_id", userId);
    
    if (data) {
      setFavorites(new Set(data.map(f => f.news_item_id)));
    }
  };

  const fetchData = async () => {
    try {
      // Fetch region
      const { data: regionData, error: regionError } = await supabase
        .from("regions")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (regionError) throw regionError;
      setRegion(regionData);

      if (!regionData) {
        setLoading(false);
        return;
      }

      // Fetch news for this region
      const { data: newsData, error: newsError } = await supabase
        .from("news_items")
        .select("*")
        .eq("region_id", regionData.id)
        .order("created_at", { ascending: false });

      if (newsError) throw newsError;
      setNews(newsData || []);

      // Fetch businesses for this region
      const { data: businessData, error: businessError } = await supabase
        .from("local_businesses")
        .select("*")
        .eq("region_id", regionData.id)
        .order("is_featured", { ascending: false })
        .order("name", { ascending: true });

      if (businessError) throw businessError;
      setBusinesses(businessData || []);

      // Fetch public resources for this region
      const { data: resourcesData, error: resourcesError } = await supabase
        .from("public_resources")
        .select("*")
        .eq("region_id", regionData.id)
        .order("is_featured", { ascending: false })
        .order("category", { ascending: true });

      if (resourcesError) throw resourcesError;
      
      // Remove duplicates by name within the same city/category
      const uniqueResources = (resourcesData || []).reduce((acc: PublicResource[], current) => {
        const key = `${current.city}-${current.name}-${current.category}`;
        const isDuplicate = acc.some(item => 
          `${item.city}-${item.name}-${item.category}` === key
        );
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);
      
      setPublicResources(uniqueResources);
      
      // Group resources by city
      const cityMap = new Map<string, PublicResource[]>();
      uniqueResources.forEach((resource) => {
        const city = resource.city || 'Other';
        if (!cityMap.has(city)) {
          cityMap.set(city, []);
        }
        cityMap.get(city)?.push(resource);
      });
      setResourcesByCity(cityMap);
    } catch (error: any) {
      toast({
        title: "Error loading region data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (newsId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
      });
      return;
    }

    const isFavorite = favorites.has(newsId);

    if (isFavorite) {
      await supabase
        .from("user_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("news_item_id", newsId);
      
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(newsId);
        return newSet;
      });
    } else {
      await supabase
        .from("user_favorites")
        .insert({ user_id: user.id, news_item_id: newsId });
      
      setFavorites(prev => new Set(prev).add(newsId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20">
          <LoadingSpinner size="lg" text="Loading region news..." />
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p>Region not found</p>
          <Link to="/">
            <Button className="mt-4">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />
      
      {/* Date, Time & Weather */}
      <DateTimeWeather region={region?.slug} />
      
      {/* News Tickers */}
      <div className="animate-fade-in">
        <NewsTicker category="state" color="blue" />
        <NewsTicker category="mining" color="amber" />
        <NewsTicker category="energy" color="green" />
        <NewsTicker category="crime" color="red" />
      </div>
      
      {/* Region Header with Banner */}
      <section className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ 
            backgroundImage: `url(${regionBanners[region.slug] || statewideBanner})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="container relative z-10 h-full flex flex-col justify-between py-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:translate-x-1 group border border-white/20">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Map
            </Button>
          </Link>
          
          <div className="flex items-end gap-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-2xl animate-scale-in">
              <MapPin className="h-10 w-10" />
            </div>
            <div className="flex-1 pb-2 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-3 tracking-tight drop-shadow-2xl">
                {region.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 font-light drop-shadow-lg">
                {region.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Martin Mines Ad */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-8 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container">
            <MartinMinesAd />
          </div>
        </section>
      </AnimatedSection>

      {/* Content Tabs */}
      <AnimatedSection animation="fade-up" delay={150}>
        <section className="py-16">
          <div className="container">
            <Tabs defaultValue="resources" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-14 bg-muted/50 backdrop-blur-sm p-1 rounded-xl border border-border/50">
                <TabsTrigger value="resources" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-display">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Public</span> Resources
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-display">
                  <Newspaper className="h-4 w-4" />
                  <span className="hidden sm:inline">Local</span> News
                </TabsTrigger>
                <TabsTrigger value="businesses" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-display">
                  <Building2 className="h-4 w-4" />
                  Businesses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resources" className="animate-fade-in">
                {publicResources.length > 0 ? (
                  <div className="space-y-12">
                    {Array.from(resourcesByCity.entries())
                      .sort(([cityA], [cityB]) => {
                        if (cityA === 'Other') return 1;
                        if (cityB === 'Other') return -1;
                        return cityA.localeCompare(cityB);
                      })
                      .map(([city, resources]) => (
                        <div key={city} className="space-y-6">
                          <div className="flex items-center gap-3 pb-4 border-b-2 border-primary/20">
                            <MapPin className="h-6 w-6 text-primary" />
                            <h3 className="text-2xl font-display font-semibold text-foreground">
                              {city}
                            </h3>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({resources.length} {resources.length === 1 ? 'resource' : 'resources'})
                            </span>
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {resources.map((resource, index) => (
                              <AnimatedSection
                                key={resource.id}
                                animation="fade-up"
                                delay={index * 50}
                              >
                                <div className="card-hover h-full">
                                  <PublicResourceCard resource={resource} />
                                </div>
                              </AnimatedSection>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                      <Shield className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      Public resources information coming soon for this region.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="news" className="animate-fade-in">
                {news.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item, index) => (
                      <AnimatedSection
                        key={item.id}
                        animation="fade-up"
                        delay={index * 50}
                      >
                        <div className="card-hover h-full">
                          <NewsCard
                            title={item.title}
                            description={item.description}
                            url={item.url}
                            source={item.source}
                            category={item.category}
                            publishedAt={item.published_at}
                            imageUrl={item.image_url}
                            isFavorite={favorites.has(item.id)}
                            onToggleFavorite={() => toggleFavorite(item.id)}
                          />
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                      <Newspaper className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      No news items available for this region yet.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="businesses" className="animate-fade-in">
                {businesses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businesses.map((business, index) => (
                      <AnimatedSection
                        key={business.id}
                        animation="fade-up"
                        delay={index * 50}
                      >
                        <div className="card-hover h-full">
                          <BusinessCard business={business} />
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                      <Building2 className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      No businesses listed for this region yet.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </AnimatedSection>

      {/* Alaska Events Calendar */}
      <AnimatedSection animation="fade-up" delay={100}>
        <section className="py-12 bg-muted/20">
          <div className="container">
            <AlaskaEventsCalendar region={region?.slug} />
          </div>
        </section>
      </AnimatedSection>

      {/* Weekly Report from Kitchens */}
      <AnimatedSection animation="scale" delay={100}>
        <WeeklyReport />
      </AnimatedSection>

      {/* Partner Sites */}
      <AnimatedSection animation="fade-up" delay={100}>
        <PartnerSites title="Explore Our Partner Platforms" compact />
      </AnimatedSection>

      {/* Admin Controls - Only visible to admins */}
      {isAdmin && region && (
        <RegionContentManagement regionId={region.id} regionName={region.name} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RegionPage;
