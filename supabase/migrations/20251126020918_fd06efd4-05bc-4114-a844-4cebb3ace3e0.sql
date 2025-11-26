-- Add city column to public_resources table
ALTER TABLE public.public_resources 
ADD COLUMN city TEXT;

-- Create index for better performance when filtering by city
CREATE INDEX idx_public_resources_city ON public.public_resources(city);

-- Also add city column to local_businesses for consistency
ALTER TABLE public.local_businesses 
ADD COLUMN city TEXT;

-- Create index for local_businesses city
CREATE INDEX idx_local_businesses_city ON public.local_businesses(city);