import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MartinMinesAd from "@/components/MartinMinesAd";
import DateTimeWeather from "@/components/DateTimeWeather";
import NewsTicker from "@/components/NewsTicker";
import { MapPin, Shield, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Check if user is admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      
      setIsAdmin(!!roleData);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate input
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as "email" | "password"] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: validation.data.email,
          password: validation.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        toast({
          title: "Success!",
          description: "Account created successfully. You can now sign in.",
        });
        setIsSignUp(false);
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({
          email: validation.data.email,
          password: validation.data.password,
        });
        if (error) throw error;
        
        // Check if logged-in user is admin
        if (data.user) {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id)
            .eq("role", "admin")
            .maybeSingle();
          
          setIsAdmin(!!roleData);
          
          toast({
            title: "Welcome back!",
            description: roleData ? "Admin access granted" : "Successfully signed in",
          });
        }
      }
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary via-primary/90 to-accent">
      {/* Date, Time & Weather */}
      <DateTimeWeather />
      
      {/* News Tickers */}
      <NewsTicker category="state" color="blue" />
      <NewsTicker category="mining" color="amber" />
      <NewsTicker category="energy" color="green" />
      <NewsTicker category="crime" color="red" />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Link to="/" className="flex items-center justify-center gap-2">
            <MapPin className="h-8 w-8 text-primary-foreground" />
            <span className="text-2xl font-bold text-primary-foreground">Alaska News</span>
          </Link>
          
          <MartinMinesAd />
          
          <Card>
            <CardHeader>
              <CardTitle>{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Sign up to save favorites and get personalized news"
                  : "Sign in to your account to continue"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-accent hover:underline"
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </button>
              </div>

              {isAdmin && !loading && (
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                      ✓ Admin Access Granted
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="w-full"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => navigate("/admin/weekly-reports")}
                      className="w-full"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
