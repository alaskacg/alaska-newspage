import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video, Trash2, Loader2 } from "lucide-react";

interface WeeklyReportData {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  published_at: string;
}

const WeeklyReportAdmin = () => {
  const [reports, setReports] = useState<WeeklyReportData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("weekly_reports")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading reports",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setReports(data || []);
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !title) {
      toast({
        title: "Missing information",
        description: "Please provide a title and select a video file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload video to storage
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("weekly-reports")
        .upload(fileName, videoFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("weekly-reports")
        .getPublicUrl(fileName);

      // Insert record into database
      const { error: insertError } = await supabase
        .from("weekly_reports")
        .insert({
          title,
          description: description || null,
          video_url: publicUrl,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Weekly report uploaded successfully",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setVideoFile(null);
      fetchReports();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, videoUrl: string) => {
    try {
      // Extract file name from URL
      const fileName = videoUrl.split('/').pop();
      
      // Delete from storage
      if (fileName) {
        await supabase.storage.from("weekly-reports").remove([fileName]);
      }

      // Delete from database
      const { error } = await supabase
        .from("weekly_reports")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Weekly report removed successfully",
      });

      fetchReports();
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Weekly Report</CardTitle>
          <CardDescription>Upload J.R. Kitchens' weekly video report</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Week of December 25, 2025"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description (optional)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of this week's report..."
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Video File</label>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
          </div>
          <Button onClick={handleUpload} disabled={uploading} className="w-full">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Reports</CardTitle>
          <CardDescription>Manage uploaded weekly reports</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No reports uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(report.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(report.id, report.video_url)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyReportAdmin;
