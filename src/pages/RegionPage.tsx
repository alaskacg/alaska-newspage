import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import BusinessCard from "@/components/BusinessCard";
import PublicResourceCard from "@/components/PublicResourceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin, Newspaper, Building2, Shield } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

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
}

const RegionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [region, setRegion] = useState<Region | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [publicResources, setPublicResources] = useState<PublicResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    checkUser();
  }, [slug]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchFavorites(user.id);
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
      setPublicResources(resourcesData || []);
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
      
      {/* Region Header */}
      <section className="relative bg-gradient-to-br from-primary via-accent/20 to-accent py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        </div>
        
        <div className="container relative z-10">
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:translate-x-1 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Map
            </Button>
          </Link>
          <div className="flex items-start gap-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm border border-primary-foreground/30 shadow-2xl animate-scale-in">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-display font-bold text-primary-foreground mb-3 tracking-tight">
                {region.name}
              </h1>
              <p className="text-xl text-primary-foreground/90 font-light">
                {region.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-14 bg-muted/50 backdrop-blur-sm p-1 rounded-xl border border-border/50">
              <TabsTrigger value="resources" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-display">
                <Shield className="h-4 w-4" />
                Public Resources
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-display">
                <Newspaper className="h-4 w-4" />
                Local News
              </TabsTrigger>
              <TabsTrigger value="businesses" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-display">
                <Building2 className="h-4 w-4" />
                Businesses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="animate-fade-in">
              {publicResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {publicResources.map((resource, index) => (
                    <div 
                      key={resource.id}
                      className="animate-slide-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <PublicResourceCard resource={resource} />
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

            <TabsContent value="news" className="animate-fade-in">{news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map((item, index) => (
                    <div 
                      key={item.id}
                      className="animate-slide-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
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
                    <div 
                      key={business.id}
                      className="animate-slide-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <BusinessCard business={business} />
                    </div>
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
    </div>
  );
};

export default RegionPage;
