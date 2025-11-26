-- Drop existing permissive storage policies
DROP POLICY IF EXISTS "Authenticated users can upload weekly report videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update weekly report videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete weekly report videos" ON storage.objects;

-- Create admin-only storage policies
CREATE POLICY "Only admins can upload weekly report videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'weekly-reports' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Only admins can update weekly report videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'weekly-reports' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Only admins can delete weekly report videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'weekly-reports' AND
  public.has_role(auth.uid(), 'admin'::app_role)
);