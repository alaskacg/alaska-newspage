-- Create public resources table for infrastructure and government services
CREATE TABLE IF NOT EXISTS public.public_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region_id UUID REFERENCES public.regions(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'emergency', 'government', 'utilities', 'healthcare', 'transportation', 'education'
  description TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  website_url TEXT,
  address TEXT,
  hours TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.public_resources ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing
CREATE POLICY "Anyone can view public resources"
  ON public.public_resources
  FOR SELECT
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_public_resources_updated_at
  BEFORE UPDATE ON public.public_resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_public_resources_region_id ON public.public_resources(region_id);
CREATE INDEX idx_public_resources_category ON public.public_resources(category);