import { ExternalLink, Clock, Heart } from "lucide-react";
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
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-accent/50">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-accent transition-colors">
            {title}
          </h3>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className="shrink-0"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-accent text-accent" : ""
                }`}
              />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
          {source && (
            <span className="text-xs text-muted-foreground">{source}</span>
          )}
        </div>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </CardContent>
      )}
      <CardFooter className="flex items-center justify-between">
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
          <Button variant="ghost" size="sm" className="gap-1">
            Read More
            <ExternalLink className="h-3 w-3" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
