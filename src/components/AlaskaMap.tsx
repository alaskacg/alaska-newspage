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

interface Business {
  id: string;
  name: string;
  city: string;
  address: string | null;
  region_id: string;
}

interface PublicResource {
  id: string;
  name: string;
  city: string;
  address: string | null;
  region_id: string;
}

interface AlaskaMapProps {
  regions: Region[];
  businesses?: Business[];
  publicResources?: PublicResource[];
}

const AlaskaMap = forwardRef<InteractiveMapRef, AlaskaMapProps>(({ regions, businesses = [], publicResources = [] }, ref) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border shadow-xl animate-scale-in">
      <Suspense fallback={<LoadingSpinner size="lg" text="Loading map..." />}>
        <InteractiveMap ref={ref} regions={regions} businesses={businesses} publicResources={publicResources} />
      </Suspense>
    </div>
  );
});

AlaskaMap.displayName = "AlaskaMap";

export default AlaskaMap;
