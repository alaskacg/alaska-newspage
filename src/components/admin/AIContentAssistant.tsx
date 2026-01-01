import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Loader2, Copy, RefreshCw, Wand2 } from "lucide-react";

type ContentType = "news_article" | "event_description" | "business_description" | "region_description" | "summary";

const AIContentAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState<ContentType>("news_article");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const contentTypeLabels: Record<ContentType, string> = {
    news_article: "News Article",
    event_description: "Event Description",
    business_description: "Business Description",
    region_description: "Region Description",
    summary: "Content Summary"
  };

  const contentTypePrompts: Record<ContentType, string> = {
    news_article: "Write a professional news article for an Alaska news publication about:",
    event_description: "Write an engaging event description for an Alaska community event about:",
    business_description: "Write a compelling business description for an Alaska local business about:",
    region_description: "Write an informative description of an Alaska region about:",
    summary: "Provide a concise summary of the following content:"
  };

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem("anp_XAI_API_KEY");
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please configure your xAI API key in the API Integrations section first.",
        variant: "destructive"
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt or topic to generate content about.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: {
          action: 'generate',
          apiKey,
          provider: 'xai',
          contentType,
          prompt: `${contentTypePrompts[contentType]} ${prompt}`,
          context: "Alaska News Page - A trusted source for Alaska news, events, and community information."
        }
      });

      if (error) throw error;

      if (data?.content) {
        setGeneratedContent(data.content);
        toast({
          title: "Content Generated",
          description: "AI has generated your content. Review and edit as needed."
        });
      } else {
        throw new Error(data?.error || "Failed to generate content");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied",
      description: "Content copied to clipboard"
    });
  };

  const handleClear = () => {
    setPrompt("");
    setGeneratedContent("");
  };

  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" />
          AI Content Assistant
        </CardTitle>
        <CardDescription className="text-white/60">
          Generate content for news articles, events, businesses, and more using AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-white/80">Content Type</label>
            <Select value={contentType} onValueChange={(v) => setContentType(v as ContentType)}>
              <SelectTrigger className="bg-slate-600/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(contentTypeLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Topic or Prompt</label>
          <Textarea
            placeholder="Enter the topic or details you want to generate content about..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-slate-600/50 border-white/20 text-white placeholder:text-white/40"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Generate Content
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        {generatedContent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-white/80">Generated Content</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-white/60 hover:text-white"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg border border-white/10">
              <p className="text-white/90 whitespace-pre-wrap">{generatedContent}</p>
            </div>
          </div>
        )}

        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-sm text-amber-200/80">
            <strong>Tip:</strong> Review and edit AI-generated content before publishing. Always verify facts and ensure the content aligns with your editorial standards.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIContentAssistant;
