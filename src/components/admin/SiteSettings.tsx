import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, Bell, Palette, Database } from "lucide-react";
import APIIntegrations from "./APIIntegrations";
import AIContentAssistant from "./AIContentAssistant";

const SiteSettings = () => {
  return (
    <div className="space-y-6">
      {/* AI Integrations */}
      <APIIntegrations />
      
      {/* AI Content Assistant */}
      <AIContentAssistant />

      <Card className="bg-slate-800/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-400" />
            Site Settings
          </CardTitle>
          <CardDescription className="text-white/60">Configure your site preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Settings sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Security */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-green-400" />
                <h3 className="font-medium text-white">Security</h3>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Your site is protected with Row-Level Security policies. Only admins can modify content.
              </p>
              <div className="text-xs text-green-400">✓ RLS Enabled</div>
            </div>

            {/* Notifications */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="h-5 w-5 text-amber-400" />
                <h3 className="font-medium text-white">Push Notifications</h3>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Push notifications are sent automatically when new weekly reports are published.
              </p>
              <div className="text-xs text-amber-400">✓ Auto-notify on publish</div>
            </div>

            {/* Theme */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Palette className="h-5 w-5 text-purple-400" />
                <h3 className="font-medium text-white">Theme</h3>
              </div>
              <p className="text-sm text-white/60 mb-3">
                The site supports both light and dark modes for visitors.
              </p>
              <div className="text-xs text-purple-400">✓ Light/Dark mode enabled</div>
            </div>

            {/* Database */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Database className="h-5 w-5 text-cyan-400" />
                <h3 className="font-medium text-white">Database</h3>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Connected to Lovable Cloud with automatic backups and scaling.
              </p>
              <div className="text-xs text-cyan-400">✓ Cloud connected</div>
            </div>
          </div>

          {/* Admin Info */}
          <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg">
            <h3 className="font-medium text-white mb-2">Admin Access</h3>
            <p className="text-sm text-white/70">
              Admin roles are managed in the database. To add new admins, contact the database administrator
              or add entries to the <code className="px-1 py-0.5 bg-slate-700 rounded text-amber-300">user_roles</code> table.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
