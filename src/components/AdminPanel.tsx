import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import WeeklyReportManagement from "./admin/WeeklyReportManagement";
import NewsManagement from "./admin/NewsManagement";

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast({
          title: "Access denied",
          description: "You do not have permission to access this page",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify admin access",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 bg-card/50 backdrop-blur">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">Manage your content and site settings</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="videos">Weekly Reports</TabsTrigger>
            <TabsTrigger value="news">News Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            <WeeklyReportManagement />
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <NewsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
