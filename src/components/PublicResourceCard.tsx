import { Phone, Mail, Globe, MapPin, Clock, Shield, Building2, Zap, Heart, GraduationCap, Bus, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PublicResource {
  id: string;
  name: string;
  category: string;
  description: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  website_url: string | null;
  address: string | null;
  hours: string | null;
  is_featured: boolean;
}

interface PublicResourceCardProps {
  resource: PublicResource;
}

const categoryIcons: { [key: string]: any } = {
  emergency: Shield,
  government: Building2,
  utilities: Zap,
  healthcare: Heart,
  education: GraduationCap,
  transportation: Bus,
};

const categoryColors: { [key: string]: string } = {
  emergency: "text-red-500 bg-red-500/10 border-red-500/30",
  government: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  utilities: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
  healthcare: "text-pink-500 bg-pink-500/10 border-pink-500/30",
  education: "text-purple-500 bg-purple-500/10 border-purple-500/30",
  transportation: "text-green-500 bg-green-500/10 border-green-500/30",
};

const PublicResourceCard = ({ resource }: PublicResourceCardProps) => {
  const Icon = categoryIcons[resource.category] || Building2;
  const colorClass = categoryColors[resource.category] || "text-gray-500 bg-gray-500/10 border-gray-500/30";

  return (
    <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-accent/50 relative backdrop-blur-sm bg-card/95">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative">
        <div className="flex items-start gap-4">
          <div 
            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border-2 ${colorClass}`}
          >
            <Icon className="h-7 w-7" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg font-display group-hover:text-accent transition-colors duration-300">
                {resource.name}
              </CardTitle>
              {resource.is_featured && (
                <Badge className="bg-gradient-to-r from-nature-gold to-yellow-400 text-black border-0 shadow-lg animate-pulse">
                  Featured
                </Badge>
              )}
            </div>
            <Badge variant="outline" className={`mt-2 capitalize ${colorClass.split('bg-')[0]}`}>
              {resource.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        {resource.description && (
          <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>
        )}

        <Separator className="my-4" />

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent" />
            Contact Information
          </h4>
          
          {resource.address && (
            <div className="flex items-start gap-3 text-sm group/item bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground group-hover/item:text-accent transition-colors flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Address</div>
                <span className="text-foreground font-medium">{resource.address}</span>
              </div>
            </div>
          )}
          
          {resource.hours && (
            <div className="flex items-start gap-3 text-sm group/item bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Clock className="h-4 w-4 mt-0.5 text-muted-foreground group-hover/item:text-accent transition-colors flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Hours</div>
                <span className="text-foreground font-medium">{resource.hours}</span>
              </div>
            </div>
          )}

          {resource.contact_phone && (
            <a
              href={`tel:${resource.contact_phone}`}
              className="flex items-start gap-3 text-sm bg-muted/30 p-3 rounded-lg hover:bg-accent/10 hover:border-accent/30 border border-transparent transition-all duration-300 group/link"
            >
              <Phone className="h-4 w-4 mt-0.5 text-accent group-hover/link:scale-110 transition-transform flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Phone</div>
                <span className="font-semibold text-foreground group-hover/link:text-accent">{resource.contact_phone}</span>
              </div>
            </a>
          )}

          {resource.contact_email && (
            <a
              href={`mailto:${resource.contact_email}`}
              className="flex items-start gap-3 text-sm bg-muted/30 p-3 rounded-lg hover:bg-accent/10 hover:border-accent/30 border border-transparent transition-all duration-300 group/link"
            >
              <Mail className="h-4 w-4 mt-0.5 text-accent group-hover/link:scale-110 transition-transform flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Email</div>
                <span className="font-semibold text-foreground group-hover/link:text-accent break-all">{resource.contact_email}</span>
              </div>
            </a>
          )}

          {resource.website_url && (
            <a
              href={resource.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm bg-accent/10 p-3 rounded-lg hover:bg-accent/20 border border-accent/30 hover:border-accent/50 transition-all duration-300 group/link"
            >
              <Globe className="h-4 w-4 mt-0.5 text-accent group-hover/link:scale-110 transition-transform flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Website</div>
                <span className="font-semibold text-accent underline decoration-dotted underline-offset-4">Visit Website →</span>
              </div>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicResourceCard;
