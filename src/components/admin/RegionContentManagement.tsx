import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Video, Newspaper, Trash2, Upload } from "lucide-react";

interface Region {
  id: string;
  name: string;
  slug: string;
}

interface RegionContentManagementProps {
  regionId: string;
  regionName: string;
}

const RegionContentManagement = ({ regionId, regionName }: RegionContentManagementProps) => {
  const { toast } = useToast();
  const [newsDialogOpen, setNewsDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  
  // News form state
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [newsSource, setNewsSource] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [newsImageUrl, setNewsImageUrl] = useState("");
  const [newsPublishedAt, setNewsPublishedAt] = useState("");
  
  // Video form state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("news_items")
        .insert({
          title: newsTitle,
          description: newsDescription || null,
          url: newsUrl,
          source: newsSource || null,
          category: newsCategory || null,
          image_url: newsImageUrl || null,
          published_at: newsPublishedAt || new Date().toISOString(),
          region_id: regionId,
        });

      if (error) throw error;

      toast({
        title: "News article added",
        description: "The news article has been successfully added to this region.",
      });

      // Reset form
      setNewsTitle("");
      setNewsDescription("");
      setNewsUrl("");
      setNewsSource("");
      setNewsCategory("");
      setNewsImageUrl("");
      setNewsPublishedAt("");
      setNewsDialogOpen(false);
      
      // Refresh the page to show new content
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error adding news",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "No file selected",
        description: "Please select a video file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload video to storage
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${regionId}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('weekly-reports')
        .upload(filePath, videoFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('weekly-reports')
        .getPublicUrl(filePath);

      // Insert video record with region reference
      const { error: insertError } = await supabase
        .from('weekly_reports')
        .insert({
          title: `${regionName} - ${videoTitle}`,
          description: videoDescription || null,
          video_url: publicUrl,
        });

      if (insertError) throw insertError;

      toast({
        title: "Video uploaded",
        description: "The video has been successfully uploaded.",
      });

      // Reset form
      setVideoFile(null);
      setVideoTitle("");
      setVideoDescription("");
      setVideoDialogOpen(false);
      
      // Refresh the page
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error uploading video",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex gap-3">
      {/* Add News Dialog */}
      <Dialog open={newsDialogOpen} onOpenChange={setNewsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="shadow-2xl gap-2 hover:scale-105 transition-transform">
            <Newspaper className="h-5 w-5" />
            Add News
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add News Article</DialogTitle>
            <DialogDescription>
              Add a news article to {regionName}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newsTitle">Title *</Label>
              <Input
                id="newsTitle"
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                required
                placeholder="Enter news title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newsDescription">Description</Label>
              <Textarea
                id="newsDescription"
                value={newsDescription}
                onChange={(e) => setNewsDescription(e.target.value)}
                placeholder="Enter news description"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newsUrl">Article URL *</Label>
              <Input
                id="newsUrl"
                type="url"
                value={newsUrl}
                onChange={(e) => setNewsUrl(e.target.value)}
                required
                placeholder="https://example.com/article"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newsSource">Source</Label>
                <Input
                  id="newsSource"
                  value={newsSource}
                  onChange={(e) => setNewsSource(e.target.value)}
                  placeholder="News source"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newsCategory">Category</Label>
                <Select value={newsCategory} onValueChange={setNewsCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="mining">Mining</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="crime">Crime</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newsImageUrl">Image URL</Label>
              <Input
                id="newsImageUrl"
                type="url"
                value={newsImageUrl}
                onChange={(e) => setNewsImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newsPublishedAt">Published Date</Label>
              <Input
                id="newsPublishedAt"
                type="datetime-local"
                value={newsPublishedAt}
                onChange={(e) => setNewsPublishedAt(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setNewsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Article</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload Video Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="shadow-2xl gap-2 hover:scale-105 transition-transform">
            <Video className="h-5 w-5" />
            Upload Video
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Regional Video</DialogTitle>
            <DialogDescription>
              Upload a video for {regionName}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVideoUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoTitle">Title *</Label>
              <Input
                id="videoTitle"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                required
                placeholder="Enter video title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="videoDescription">Description</Label>
              <Textarea
                id="videoDescription"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                placeholder="Enter video description"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="videoFile">Video File *</Label>
              <Input
                id="videoFile"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setVideoDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Video"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegionContentManagement;