-- Update posts table to change youtube_url to video_iframe for HTML iframe support
-- This migration changes from YouTube URL processing to direct HTML iframe insertion

-- Add new column for video iframe HTML
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS video_iframe TEXT;

-- Update existing records: convert youtube_url to iframe HTML if they exist
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
WHERE youtube_url IS NOT NULL AND youtube_url != '';

-- Remove old youtube_url column (optional - you can keep it for backup if needed)
-- ALTER TABLE public.posts DROP COLUMN IF EXISTS youtube_url;

-- Add comment to document the change
COMMENT ON COLUMN public.posts.video_iframe IS 'HTML iframe code for embedding videos (replaces youtube_url)';
