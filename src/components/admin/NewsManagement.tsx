import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Newspaper, Trash2, Edit, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  url: string;
  source: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
  region_id: string | null;
}

interface Region {
  id: string;
  name: string;
  slug: string;
}

const NewsManagement = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [regionId, setRegionId] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    fetchNewsItems();
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    const { data } = await supabase
      .from("regions")
      .select("*")
      .order("name");
    if (data) setRegions(data);
  };

  const fetchNewsItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading news",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setNewsItems(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setSource("");
    setCategory("");
    setImageUrl("");
    setRegionId("");
    setEditingItem(null);
  };

  const handleSubmit = async () => {
    if (!title || !url) {
      toast({
        title: "Missing information",
        description: "Please provide at least a title and URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const newsData = {
        title,
        description: description || null,
        url,
        source: source || null,
        category: category || null,
        image_url: imageUrl || null,
        region_id: regionId || null,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("news_items")
          .update(newsData)
          .eq("id", editingItem.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "News article updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("news_items")
          .insert(newsData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "News article created successfully",
        });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchNewsItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description || "");
    setUrl(item.url);
    setSource(item.source || "");
    setCategory(item.category || "");
    setImageUrl(item.image_url || "");
    setRegionId(item.region_id || "");
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("news_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "News article removed successfully",
      });

      fetchNewsItems();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>News Articles</CardTitle>
              <CardDescription>Manage news articles and updates</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Edit News Article" : "Create News Article"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Article title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">URL *</label>
                    <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/article"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Source</label>
                      <Input
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        placeholder="Alaska Dispatch News"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="mining">Mining</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="crime">Crime</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="politics">Politics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Region</label>
                    <Select value={regionId} onValueChange={setRegionId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All regions</SelectItem>
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSubmit} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {editingItem ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        {editingItem ? "Update Article" : "Create Article"}
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {loading && newsItems.length === 0 ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            </div>
          ) : newsItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No news articles yet</p>
          ) : (
            <div className="space-y-3">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Newspaper className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{item.title}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                        {item.source && <span>{item.source}</span>}
                        {item.category && <span>• {item.category}</span>}
                        {item.published_at && (
                          <span>• {new Date(item.published_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManagement;
