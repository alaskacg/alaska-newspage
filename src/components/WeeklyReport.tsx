import { FileText, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WeeklyReport = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="container">
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30">
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-display">Weekly Report from Kitchens</CardTitle>
            <CardDescription className="text-base mt-2">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Week of {currentDate}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-foreground mb-3">This Week's Alaska Mining & Development Highlights</h3>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Permitting Updates:</strong> The Alaska Department of Natural Resources 
                  announced progress on several key mining permits across the state. Projects in the Interior and Southwest 
                  regions are moving forward with environmental assessments.
                </p>
                
                <p>
                  <strong className="text-foreground">Market Analysis:</strong> Gold prices remain strong at $2,050 per ounce, 
                  supporting continued exploration and development activities throughout Alaska. Silver and copper markets 
                  show positive trends for Q1 projections.
                </p>
                
                <p>
                  <strong className="text-foreground">Infrastructure Development:</strong> State officials met with industry 
                  leaders to discuss road access improvements to remote mining districts. The Dalton Highway maintenance 
                  schedule has been updated for winter operations.
                </p>
                
                <p>
                  <strong className="text-foreground">Employment Outlook:</strong> Mining sector employment continues to grow, 
                  with over 200 new positions expected to open across various operations in the coming months. Training 
                  programs are expanding to meet workforce demands.
                </p>
                
                <p>
                  <strong className="text-foreground">Legislative Watch:</strong> The Alaska State Legislature is considering 
                  new measures to streamline permitting processes while maintaining environmental protections. Hearings are 
                  scheduled for next week.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button size="lg" className="gap-2">
                <FileText className="w-4 h-4" />
                Read Full Report
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground border-t border-border pt-4">
              <p>Analysis by Kitchens | Alaska Mining & Development News</p>
              <p className="mt-1">Subscribe for weekly updates delivered to your inbox</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeeklyReport;
