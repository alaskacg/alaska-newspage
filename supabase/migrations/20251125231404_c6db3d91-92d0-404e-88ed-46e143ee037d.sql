-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create table for local businesses and services
CREATE TABLE public.local_businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  contact_phone TEXT,
  contact_email TEXT,
  address TEXT,
  website_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  logo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.local_businesses ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing
CREATE POLICY "Anyone can view businesses" 
ON public.local_businesses 
FOR SELECT 
USING (true);

-- Create indexes for faster queries
CREATE INDEX idx_businesses_region ON public.local_businesses(region_id);
CREATE INDEX idx_businesses_category ON public.local_businesses(category);
CREATE INDEX idx_businesses_featured ON public.local_businesses(is_featured);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_businesses_updated_at
BEFORE UPDATE ON public.local_businesses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();