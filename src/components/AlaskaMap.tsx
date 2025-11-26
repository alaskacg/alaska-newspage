import { lazy, Suspense, forwardRef } from "react";
import LoadingSpinner from "./LoadingSpinner";
import type { InteractiveMapRef } from "./InteractiveMap";

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

const AlaskaMap = forwardRef<InteractiveMapRef, AlaskaMapProps>(({ regions }, ref) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border shadow-xl animate-scale-in">
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading map..." />}>
        <InteractiveMap ref={ref} regions={regions} />
      </Suspense>
    </div>
  );
});

AlaskaMap.displayName = "AlaskaMap";

export default AlaskaMap;
