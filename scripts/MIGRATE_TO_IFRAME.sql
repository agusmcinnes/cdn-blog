-- Instruction script for updating video iframe support
-- Execute this in your Supabase SQL editor or terminal

-- 1. Add the new video_iframe column
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS video_iframe TEXT;

-- 2. Migrate existing YouTube URLs to iframe format
UPDATE public.posts 
SET video_iframe = CASE 
  WHEN youtube_url IS NOT NULL AND youtube_url != '' THEN 
    '<iframe width="100%" height="400" src="https://www.youtube.com/embed/' || 
    CASE 
      WHEN youtube_url ~ 'youtube\.com/watch\?v=([^&\n?#]+)' THEN 
        (regexp_match(youtube_url, 'youtube\.com/watch\?v=([^&\n?#]+)'))[1]
      WHEN youtube_url ~ 'youtu\.be/([^&\n?#]+)' THEN 
        (regexp_match(youtube_url, 'youtu\.be/([^&\n?#]+)'))[1]
      ELSE NULL
    END || '" frameborder="0" allowfullscreen></iframe>'
  ELSE NULL
END
WHERE youtube_url IS NOT NULL AND youtube_url != '' AND video_iframe IS NULL;

-- 3. Add column comment
COMMENT ON COLUMN public.posts.video_iframe IS 'HTML iframe code for embedding videos (replaces youtube_url)';

-- Optional: Remove old youtube_url column after confirming everything works
-- ALTER TABLE public.posts DROP COLUMN youtube_url;
