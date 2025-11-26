-- Create storage bucket for weekly report videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('weekly-reports', 'weekly-reports', true);

-- Create RLS policies for weekly report videos storage
CREATE POLICY "Anyone can view weekly report videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'weekly-reports');

CREATE POLICY "Authenticated users can upload weekly report videos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'weekly-reports' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update weekly report videos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'weekly-reports' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete weekly report videos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'weekly-reports' 
  AND auth.role() = 'authenticated'
);

-- Create weekly_reports table
CREATE TABLE public.weekly_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for weekly_reports
CREATE POLICY "Anyone can view weekly reports"
ON public.weekly_reports
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create weekly reports"
ON public.weekly_reports
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update weekly reports"
ON public.weekly_reports
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete weekly reports"
ON public.weekly_reports
FOR DELETE
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_weekly_reports_updated_at
BEFORE UPDATE ON public.weekly_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();