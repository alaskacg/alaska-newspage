import { Phone, Mail, Globe, MapPin, Clock, Shield, Building2, Zap, Heart, GraduationCap, Bus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          <p className="text-sm text-muted-foreground leading-relaxed">
            {resource.description}
          </p>
        )}

        <div className="space-y-3 pt-2 border-t border-border/50">
          {resource.address && (
            <div className="flex items-start gap-3 text-sm group/item">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground group-hover/item:text-accent transition-colors flex-shrink-0" />
              <span className="text-foreground/80">{resource.address}</span>
            </div>
          )}
          
          {resource.hours && (
            <div className="flex items-center gap-3 text-sm group/item">
              <Clock className="h-4 w-4 text-muted-foreground group-hover/item:text-accent transition-colors flex-shrink-0" />
              <span className="text-foreground/80">{resource.hours}</span>
            </div>
          )}

          {resource.contact_phone && (
            <a
              href={`tel:${resource.contact_phone}`}
              className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 group/link"
            >
              <Phone className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
              <span className="font-medium">{resource.contact_phone}</span>
            </a>
          )}

          {resource.contact_email && (
            <a
              href={`mailto:${resource.contact_email}`}
              className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 group/link"
            >
              <Mail className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
              <span className="font-medium break-all">{resource.contact_email}</span>
            </a>
          )}

          {resource.website_url && (
            <a
              href={resource.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-accent hover:text-accent/80 transition-all duration-300 hover:translate-x-1 group/link font-medium"
            >
              <Globe className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
              <span className="underline decoration-dotted underline-offset-4">Visit Website</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicResourceCard;
