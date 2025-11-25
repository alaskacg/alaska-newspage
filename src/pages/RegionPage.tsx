import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MapPin } from "lucide-react";
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

const RegionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [region, setRegion] = useState<Region | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
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
        .single();

      if (regionError) throw regionError;
      setRegion(regionData);

      // Fetch news for this region
      const { data: newsData, error: newsError } = await supabase
        .from("news_items")
        .select("*")
        .eq("region_id", regionData.id)
        .order("created_at", { ascending: false });

      if (newsError) throw newsError;
      setNews(newsData || []);
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
      <section className="bg-gradient-to-br from-primary to-accent py-12">
        <div className="container">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Map
            </Button>
          </Link>
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-foreground mb-2">
                {region.name}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {region.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container">
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard
                  key={item.id}
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No news items available for this region yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RegionPage;
