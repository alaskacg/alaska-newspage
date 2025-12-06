import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, apiKey, provider, contentType, prompt, context } = await req.json();

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "API key is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "test") {
      // Test the API connection
      try {
        const response = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "grok-beta",
            messages: [
              { role: "user", content: "Hello, respond with 'Connection successful'" }
            ],
            max_tokens: 20
          }),
        });

        if (response.ok) {
          return new Response(
            JSON.stringify({ success: true, message: "API connection successful" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } else {
          const errorData = await response.text();
          console.error("xAI API error:", errorData);
          return new Response(
            JSON.stringify({ success: false, message: "API connection failed", error: errorData }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } catch (error) {
        console.error("Test connection error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return new Response(
          JSON.stringify({ success: false, message: errorMessage }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (action === "generate") {
      if (!prompt) {
        return new Response(
          JSON.stringify({ error: "Prompt is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const systemPrompt = `You are a professional content writer for the Alaska News Page, a trusted source for Alaska news, events, and community information. 
Your writing should be:
- Professional and journalistic in tone
- Accurate and factual
- Engaging and informative
- Appropriate for an Alaskan audience
- SEO-friendly when applicable

Context: ${context || "Alaska News Page"}`;

      try {
        const response = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "grok-beta",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: prompt }
            ],
            max_tokens: 1000,
            temperature: 0.7
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("xAI generation error:", errorData);
          return new Response(
            JSON.stringify({ error: "Failed to generate content", details: errorData }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
          return new Response(
            JSON.stringify({ error: "No content generated" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ content, success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("Generation error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return new Response(
          JSON.stringify({ error: errorMessage }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Function error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
