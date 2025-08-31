-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  youtube_url TEXT,
  video_file_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscribers table for email notifications
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read, admin write)
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_insert_admin" ON public.categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "categories_update_admin" ON public.categories FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "categories_delete_admin" ON public.categories FOR DELETE USING (auth.uid() IS NOT NULL);

-- Posts policies (public read published, admin full access)
CREATE POLICY "posts_select_published" ON public.posts FOR SELECT USING (published = true OR auth.uid() = author_id);
CREATE POLICY "posts_insert_admin" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_update_admin" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts_delete_admin" ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- Subscribers policies (public insert, admin read)
CREATE POLICY "subscribers_insert_all" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "subscribers_select_admin" ON public.subscribers FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "subscribers_update_admin" ON public.subscribers FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "subscribers_delete_admin" ON public.subscribers FOR DELETE USING (auth.uid() IS NOT NULL);
