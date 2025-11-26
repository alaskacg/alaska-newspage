-- Create admin role system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing roles (only users can see their own roles)
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Create secure role-checking function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Drop existing permissive policies on weekly_reports
DROP POLICY IF EXISTS "Authenticated users can create weekly reports" ON public.weekly_reports;
DROP POLICY IF EXISTS "Authenticated users can update weekly reports" ON public.weekly_reports;
DROP POLICY IF EXISTS "Authenticated users can delete weekly reports" ON public.weekly_reports;

-- Create admin-only policies for weekly_reports
CREATE POLICY "Only admins can create weekly reports"
ON public.weekly_reports FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update weekly reports"
ON public.weekly_reports FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete weekly reports"
ON public.weekly_reports FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));