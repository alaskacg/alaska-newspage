import { Building2, Phone, Mail, Globe, Facebook, Instagram, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Business {
  id: string;
  name: string;
  description: string | null;
  category: string;
  tags: string[] | null;
  contact_phone: string | null;
  contact_email: string | null;
  address: string | null;
  website_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  logo_url: string | null;
  is_featured: boolean;
}

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          {business.logo_url ? (
            <img
              src={business.logo_url}
              alt={`${business.name} logo`}
              className="w-16 h-16 object-contain rounded-md border border-border"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-muted rounded-md border border-border">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg">{business.name}</CardTitle>
              {business.is_featured && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>
            <CardDescription className="mt-1">
              <Badge variant="outline">{business.category}</Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {business.description && (
          <p className="text-sm text-muted-foreground">{business.description}</p>
        )}

        {business.tags && business.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {business.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2 pt-2 border-t">
          {business.address && (
            <p className="text-xs text-muted-foreground">{business.address}</p>
          )}
          
          {business.contact_phone && (
            <a
              href={`tel:${business.contact_phone}`}
              className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              {business.contact_phone}
            </a>
          )}

          {business.contact_email && (
            <a
              href={`mailto:${business.contact_email}`}
              className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              {business.contact_email}
            </a>
          )}

          <div className="flex items-center gap-3 pt-2">
            {business.website_url && (
              <a
                href={business.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
            {business.facebook_url && (
              <a
                href={business.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {business.instagram_url && (
              <a
                href={business.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
