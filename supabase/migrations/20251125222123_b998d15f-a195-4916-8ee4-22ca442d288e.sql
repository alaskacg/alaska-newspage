-- Create regions table for Alaska regions
CREATE TABLE public.regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create news_items table
CREATE TABLE public.news_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  source TEXT,
  category TEXT,
  published_at TIMESTAMPTZ,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  news_item_id UUID REFERENCES public.news_items(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, news_item_id)
);

-- Enable RLS
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Regions are public
CREATE POLICY "Anyone can view regions"
ON public.regions FOR SELECT
TO public
USING (true);

-- News items are public
CREATE POLICY "Anyone can view news items"
ON public.news_items FOR SELECT
TO public
USING (true);

-- Only authenticated users can manage favorites
CREATE POLICY "Users can view their own favorites"
ON public.user_favorites FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites"
ON public.user_favorites FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
ON public.user_favorites FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Insert Alaska regions with approximate center coordinates
INSERT INTO public.regions (name, slug, description, coordinates) VALUES
('Southeast Alaska', 'southeast', 'Panhandle region including Juneau, Sitka, and Ketchikan', '{"lat": 57.0, "lng": -135.0}'),
('Southcentral Alaska', 'southcentral', 'Anchorage, Mat-Su Valley, and Kenai Peninsula', '{"lat": 61.2, "lng": -149.9}'),
('Interior Alaska', 'interior', 'Fairbanks and the vast interior region', '{"lat": 64.8, "lng": -147.7}'),
('Southwest Alaska', 'southwest', 'Alaska Peninsula, Kodiak Island, and Aleutian Islands', '{"lat": 57.8, "lng": -155.5}'),
('Northern Alaska', 'northern', 'Arctic region including Utqiaġvik (Barrow) and the North Slope', '{"lat": 69.0, "lng": -153.0}'),
('Statewide', 'statewide', 'News and information affecting all of Alaska', '{"lat": 64.0, "lng": -152.0}');

-- Add sample news items
INSERT INTO public.news_items (region_id, title, description, url, source, category, published_at) VALUES
((SELECT id FROM public.regions WHERE slug = 'statewide'), 'Alaska Economy Shows Growth', 'State economic indicators point to positive trends', 'https://example.com/economy', 'Alaska Economic Report', 'Economy', now()),
((SELECT id FROM public.regions WHERE slug = 'southcentral'), 'Anchorage Winter Festival Announced', 'Annual winter celebration dates set for February', 'https://example.com/festival', 'Anchorage Daily News', 'Events', now()),
((SELECT id FROM public.regions WHERE slug = 'southeast'), 'Juneau Tourism Season Preview', 'Cruise season expected to bring record visitors', 'https://example.com/tourism', 'Juneau Empire', 'Tourism', now());