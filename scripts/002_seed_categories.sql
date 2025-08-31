-- Insert default categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Deportes', 'deportes', 'Noticias deportivas locales y nacionales'),
  ('Política', 'politica', 'Análisis político y noticias gubernamentales'),
  ('Economía', 'economia', 'Noticias económicas y financieras'),
  ('Sociedad', 'sociedad', 'Noticias sociales y comunitarias'),
  ('Cultura', 'cultura', 'Eventos culturales y artísticos')
ON CONFLICT (slug) DO NOTHING;
