import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  showImage?: boolean;
}

const SkeletonCard = ({ showImage = true }: SkeletonCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      {showImage && (
        <Skeleton className="h-48 w-full rounded-none" />
      )}
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="mt-auto">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24 ml-auto" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
