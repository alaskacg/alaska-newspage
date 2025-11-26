import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { requestNotificationPermission, sendTestNotification } from "@/lib/pushNotifications";

const NotificationPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleEnableNotifications = async () => {
    try {
      const granted = await requestNotificationPermission();
      
      if (granted) {
        setPermission("granted");
        toast({
          title: "Notifications Enabled!",
          description: "You'll receive alerts when new weekly reports are published.",
        });
        
        // Send a test notification
        await sendTestNotification(
          "Welcome to Alaska News Page!",
          "You'll now receive notifications for new weekly reports."
        );
      } else {
        toast({
          title: "Permission Denied",
          description: "You can enable notifications later in your browser settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast({
        title: "Error",
        description: "Failed to enable notifications. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!('Notification' in window)) {
    return null;
  }

  if (permission === "granted") {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <Bell className="h-5 w-5" />
            Notifications Enabled
          </CardTitle>
          <CardDescription>
            You'll receive alerts for new weekly reports
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (permission === "denied") {
    return (
      <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <BellOff className="h-5 w-5" />
            Notifications Blocked
          </CardTitle>
          <CardDescription>
            Please enable notifications in your browser settings to receive alerts
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Get Notified
        </CardTitle>
        <CardDescription>
          Receive push notifications when new weekly reports are published
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleEnableNotifications} className="w-full">
          <Bell className="mr-2 h-4 w-4" />
          Enable Notifications
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationPermission;
