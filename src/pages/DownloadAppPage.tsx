import { useState } from "react";
import { Download, Smartphone, Apple, PlayCircle, Shield, Zap, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const DownloadAppPage = () => {
  const { toast } = useToast();
  const [installing, setInstalling] = useState(false);

  const handlePWAInstall = () => {
    toast({
      title: "Install the App",
      description: "Use your browser's menu to install this app on your device. Look for 'Add to Home Screen' or 'Install App'.",
    });
  };

  const handleIOSDownload = () => {
    setInstalling(true);
    toast({
      title: "iOS App Coming Soon",
      description: "The iOS app is currently in development. Use the web app for now by adding to your home screen.",
    });
    setTimeout(() => setInstalling(false), 2000);
  };

  const handleAndroidDownload = () => {
    setInstalling(true);
    toast({
      title: "Android App Coming Soon",
      description: "The Android app is currently in development. Use the web app for now by adding to your home screen.",
    });
    setTimeout(() => setInstalling(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <main className="container py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
            <Smartphone className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Download Alaska News Page
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected with Alaska's latest news, weekly reports, and regional updates — anywhere, anytime.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <Bell className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Push Notifications</CardTitle>
              <CardDescription>
                Get instant alerts when new weekly reports are published
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
              <CardDescription>
                Optimized for speed with offline access to saved content
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Always Secure</CardTitle>
              <CardDescription>
                End-to-end encrypted data with secure authentication
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Download Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* PWA - Installable Web App */}
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Web App (PWA)</CardTitle>
              <CardDescription>
                Install directly from your browser - works on all devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ No app store needed</p>
                <p>✓ Automatic updates</p>
                <p>✓ Works offline</p>
                <p>✓ Push notifications</p>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePWAInstall}
              >
                <Download className="mr-2 h-5 w-5" />
                Install Web App
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Available immediately
              </p>
            </CardContent>
          </Card>

          {/* iOS App */}
          <Card className="border-2 border-secondary/20">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-secondary/10 rounded-full w-fit mb-4">
                <Apple className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle>iOS App</CardTitle>
              <CardDescription>
                Native app for iPhone and iPad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Native iOS experience</p>
                <p>✓ Full device integration</p>
                <p>✓ App Store distribution</p>
                <p>✓ Optimized for iOS</p>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                variant="secondary"
                onClick={handleIOSDownload}
                disabled={installing}
              >
                <Apple className="mr-2 h-5 w-5" />
                {installing ? "Coming Soon..." : "Download for iOS"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                In development
              </p>
            </CardContent>
          </Card>

          {/* Android App */}
          <Card className="border-2 border-accent/20">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit mb-4">
                <PlayCircle className="h-8 w-8 text-accent" />
              </div>
              <CardTitle>Android App</CardTitle>
              <CardDescription>
                Native app for Android devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Native Android experience</p>
                <p>✓ Full device integration</p>
                <p>✓ Google Play distribution</p>
                <p>✓ Optimized for Android</p>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                variant="outline"
                onClick={handleAndroidDownload}
                disabled={installing}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                {installing ? "Coming Soon..." : "Download for Android"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                In development
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Installation Instructions */}
        <Card className="mt-16 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>How to Install the Web App</CardTitle>
            <CardDescription>
              Quick steps to add Alaska News Page to your home screen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Open Browser Menu</h4>
                  <p className="text-sm text-muted-foreground">
                    On iPhone: Tap the share icon (square with arrow)
                    <br />
                    On Android: Tap the menu (three dots)
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Select Install Option</h4>
                  <p className="text-sm text-muted-foreground">
                    Look for "Add to Home Screen" or "Install App"
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Launch from Home Screen</h4>
                  <p className="text-sm text-muted-foreground">
                    Find the Alaska News Page icon on your home screen and tap to open
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DownloadAppPage;
