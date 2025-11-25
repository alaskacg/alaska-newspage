import { lazy, Suspense, useState, useEffect } from "react";

const InteractiveMap = lazy(() => import("./InteractiveMap"));

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any;
}

interface AlaskaMapProps {
  regions: Region[];
}

const AlaskaMap = ({ regions }: AlaskaMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Loading interactive map...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full bg-muted">
            <p className="text-muted-foreground">Loading interactive map...</p>
          </div>
        }
      >
        <InteractiveMap regions={regions} />
      </Suspense>
    </div>
  );
};

export default AlaskaMap;
