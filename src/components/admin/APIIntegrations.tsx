import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bot, Key, Eye, EyeOff, CheckCircle, XCircle, Loader2, Sparkles } from "lucide-react";

interface APIConfig {
  id: string;
  name: string;
  key_name: string;
  is_configured: boolean;
  description: string;
}

const APIIntegrations = () => {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [testResults, setTestResults] = useState<Record<string, boolean | null>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const integrations: APIConfig[] = [
    {
      id: "xai",
      name: "xAI (Grok)",
      key_name: "XAI_API_KEY",
      is_configured: false,
      description: "Use xAI's Grok model for AI-assisted content generation, summaries, and suggestions."
    }
  ];

  const handleSaveKey = async (integration: APIConfig) => {
    const key = apiKeys[integration.id];
    if (!key || key.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      // Store in localStorage for now (in production, this should be stored securely)
      localStorage.setItem(`anp_${integration.key_name}`, key);
      
      toast({
        title: "API Key Saved",
        description: `${integration.name} API key has been configured successfully.`
      });
      
      setTestResults({ ...testResults, [integration.id]: null });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async (integration: APIConfig) => {
    const key = localStorage.getItem(`anp_${integration.key_name}`) || apiKeys[integration.id];
    
    if (!key) {
      toast({
        title: "No API Key",
        description: "Please save an API key first",
        variant: "destructive"
      });
      return;
    }

    setTesting({ ...testing, [integration.id]: true });
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: { 
          action: 'test',
          apiKey: key,
          provider: integration.id
        }
      });

      if (error) throw error;

      setTestResults({ ...testResults, [integration.id]: data?.success || false });
      
      toast({
        title: data?.success ? "Connection Successful" : "Connection Failed",
        description: data?.message || (data?.success ? "API is working correctly" : "Failed to connect to API"),
        variant: data?.success ? "default" : "destructive"
      });
    } catch (error) {
      setTestResults({ ...testResults, [integration.id]: false });
      toast({
        title: "Test Failed",
        description: "Could not connect to the API. Please check your key.",
        variant: "destructive"
      });
    } finally {
      setTesting({ ...testing, [integration.id]: false });
    }
  };

  const toggleShowKey = (id: string) => {
    setShowKeys({ ...showKeys, [id]: !showKeys[id] });
  };

  // Load saved keys on mount
  useEffect(() => {
    const loadedKeys: Record<string, string> = {};
    integrations.forEach(integration => {
      const savedKey = localStorage.getItem(`anp_${integration.key_name}`);
      if (savedKey) {
        loadedKeys[integration.id] = savedKey;
      }
    });
    setApiKeys(loadedKeys);
  }, []);

  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-400" />
          AI Integrations
        </CardTitle>
        <CardDescription className="text-white/60">
          Configure AI providers for content generation and assistance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {integrations.map((integration) => (
          <div 
            key={integration.id} 
            className="p-4 bg-slate-700/50 rounded-lg border border-white/10"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{integration.name}</h3>
                  <p className="text-sm text-white/60">{integration.description}</p>
                </div>
              </div>
              {testResults[integration.id] !== undefined && testResults[integration.id] !== null && (
                <div className={`flex items-center gap-1 text-sm ${testResults[integration.id] ? 'text-green-400' : 'text-red-400'}`}>
                  {testResults[integration.id] ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Connected
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      Failed
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-white/80">API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      type={showKeys[integration.id] ? "text" : "password"}
                      placeholder="Enter your API key..."
                      value={apiKeys[integration.id] || ""}
                      onChange={(e) => setApiKeys({ ...apiKeys, [integration.id]: e.target.value })}
                      className="pl-10 pr-10 bg-slate-600/50 border-white/20 text-white placeholder:text-white/40"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey(integration.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showKeys[integration.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSaveKey(integration)}
                  disabled={saving || !apiKeys[integration.id]}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Save Key
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleTestConnection(integration)}
                  disabled={testing[integration.id]}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {testing[integration.id] ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Test Connection
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
          <h3 className="font-medium text-white mb-2 flex items-center gap-2">
            <Bot className="h-4 w-4 text-purple-400" />
            How to Get an xAI API Key
          </h3>
          <ol className="text-sm text-white/70 space-y-1 list-decimal list-inside">
            <li>Visit <a href="https://x.ai" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">x.ai</a> and sign up for an account</li>
            <li>Navigate to the API section in your dashboard</li>
            <li>Generate a new API key</li>
            <li>Copy and paste the key above</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIIntegrations;
