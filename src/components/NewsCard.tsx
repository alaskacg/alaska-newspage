import { ExternalLink, Clock, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface NewsCardProps {
  title: string;
  description?: string;
  url: string;
  source?: string;
  category?: string;
  publishedAt?: string;
  imageUrl?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const NewsCard = ({
  title,
  description,
  url,
  source,
  category,
  publishedAt,
  imageUrl,
  isFavorite,
  onToggleFavorite,
}: NewsCardProps) => {
  return (
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-accent/50 relative bg-card/80 backdrop-blur-sm">
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      </div>
      
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Trending indicator */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className="shrink-0 hover:scale-110 transition-transform duration-200"
            >
              <Heart
                className={`h-4 w-4 transition-all duration-300 ${
                  isFavorite ? "fill-accent text-accent scale-110" : "group-hover:text-accent"
                }`}
              />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {category && (
            <Badge variant="secondary" className="text-xs transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
              {category}
            </Badge>
          )}
          {source && (
            <span className="text-xs text-muted-foreground">{source}</span>
          )}
        </div>
      </CardHeader>
      {description && (
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300">
            {description}
          </p>
        </CardContent>
      )}
      <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
        {publishedAt && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
          </div>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 group/btn hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Read More
            <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
