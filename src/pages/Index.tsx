import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AlaskaMap from "@/components/AlaskaMap";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Newspaper, MapPin, Users, Search } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Gateway to Alaska News
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Discover regional news and information organized by Alaska's unique geography.
              Stay connected to what matters in your community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Explore Regions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Search className="mr-2 h-5 w-5" />
                Search News
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to Alaska News Portal</h2>
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

      {/* Interactive Map Section */}
      <section id="map-section" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Alaska by Region</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any region to discover local news, events, and information relevant to that area
            </p>
          </div>
          {!loading && regions.length > 0 && <AlaskaMap regions={regions} />}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button variant="outline" onClick={() => navigate('/region/statewide')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                description={news.description}
                url={news.url}
                source={news.source}
                category={news.category}
                publishedAt={news.published_at}
                imageUrl={news.image_url}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Regional Focus</h3>
              <p className="text-muted-foreground">
                News organized by Alaska's unique geographic regions
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-muted-foreground">
                Stay connected to what matters in your local area
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                <Newspaper className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
              <p className="text-muted-foreground">
                From Ketchikan to Utqiaġvik, all Alaska in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Alaska News Portal. Connecting communities across the Last Frontier.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
