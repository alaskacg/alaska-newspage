import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle } from "lucide-react";
import { z } from "zod";

const setupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  setupCode: z.string().min(1, "Setup code is required"),
});

const SetupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [adminExists, setAdminExists] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    setupCode: "",
  });

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("id")
        .eq("role", "admin")
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setAdminExists(true);
        toast({
          title: "Setup Already Complete",
          description: "An administrator already exists. Redirecting...",
        });
        setTimeout(() => navigate("/auth"), 2000);
      }
    } catch (error) {
      console.error("Error checking admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      setupSchema.parse(formData);

      // Verify setup code
      if (formData.setupCode !== "ANPadmin") {
        toast({
          title: "Invalid Setup Code",
          description: "The setup code you entered is incorrect.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Create user account
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/weekly-reports`,
        },
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Assign admin role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: authData.user.id,
          role: "admin",
        });

      if (roleError) throw roleError;

      setSetupComplete(true);
      toast({
        title: "Setup Complete!",
        description: "Your admin account has been created successfully.",
      });

      setTimeout(() => {
        navigate("/admin/weekly-reports");
      }, 3000);
    } catch (error: any) {
      console.error("Setup error:", error);
      toast({
        title: "Setup Failed",
        description: error.message || "Failed to complete setup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !setupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Checking setup status...</p>
        </div>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Setup Already Complete
            </CardTitle>
            <CardDescription>
              An administrator already exists. Redirecting to login...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (setupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Admin Account Created!
            </CardTitle>
            <CardDescription>
              Redirecting to the admin panel...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✓ Account created successfully
                  <br />
                  ✓ Admin privileges granted
                  <br />
                  ✓ Ready to upload weekly reports
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            First-Time Admin Setup
          </CardTitle>
          <CardDescription>
            Create your administrator account to manage weekly reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@alaskanews.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                Minimum 6 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="setupCode">Setup Code</Label>
              <Input
                id="setupCode"
                type="text"
                placeholder="Enter your setup code"
                value={formData.setupCode}
                onChange={(e) =>
                  setFormData({ ...formData, setupCode: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                Use the setup code provided: <strong>ANPadmin</strong>
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Admin Account"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> This setup page will only work once. After
              the first admin account is created, it will be disabled for
              security.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupPage;
