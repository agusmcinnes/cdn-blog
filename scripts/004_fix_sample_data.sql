-- Fixed sample data insertion with proper foreign key relationships
-- First, let's make sure we have the categories
INSERT INTO categories (name, slug, description) VALUES
('Deportes', 'deportes', 'Noticias deportivas locales y regionales'),
('Política', 'politica', 'Análisis político y noticias gubernamentales'),
('Economía', 'economia', 'Noticias económicas y de negocios'),
('Cultura', 'cultura', 'Eventos culturales y artísticos'),
('Sociedad', 'sociedad', 'Noticias sociales y comunitarias'),
('Tecnología', 'tecnologia', 'Avances tecnológicos y digitales')
ON CONFLICT (slug) DO NOTHING;

-- Now insert posts with proper category references
INSERT INTO posts (title, description, content, category_id, published, youtube_url, created_at) VALUES
(
  'Club Atlético Newell''s Old Boys gana el clásico rosarino',
  'Una victoria histórica en el estadio Marcelo Bielsa que emociona a toda la hinchada leprosa.',
  'El equipo dirigido por Mauricio Pellegrino logró una victoria contundente por 2-0 ante su clásico rival. Los goles llegaron en el segundo tiempo con una gran actuación del mediocampo. La hinchada celebró en las calles de Rosario hasta altas horas de la madrugada.',
  (SELECT id FROM categories WHERE slug = 'deportes'),
  true,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  NOW() - INTERVAL '2 hours'
),
(
  'Nueva ordenanza municipal sobre espacios verdes',
  'El Concejo Municipal aprobó una nueva normativa para la preservación de parques y plazas.',
  'La ordenanza establece nuevos criterios para el mantenimiento de espacios verdes públicos y la creación de nuevas áreas recreativas. Se destinará un presupuesto especial para la renovación del Parque Independencia y la creación de tres nuevas plazas en barrios periféricos.',
  (SELECT id FROM categories WHERE slug = 'politica'),
  true,
  null,
  NOW() - INTERVAL '4 hours'
),
(
  'Crecimiento del sector gastronómico local',
  'Los restaurantes de la zona registran un aumento del 15% en sus ventas durante el último trimestre.',
  'El sector gastronómico local muestra signos de recuperación post-pandemia. Los establecimientos han implementado nuevas estrategias de marketing digital y delivery que han resultado exitosas. Se espera que esta tendencia continúe durante los próximos meses.',
  (SELECT id FROM categories WHERE slug = 'economia'),
  true,
  null,
  NOW() - INTERVAL '6 hours'
),
(
  'Festival de Arte Contemporáneo en el Centro Cultural',
  'Una muestra que reúne a más de 50 artistas locales y regionales.',
  'El festival se desarrollará durante todo el mes con exposiciones, talleres y conferencias. Participan artistas de diferentes disciplinas: pintura, escultura, fotografía y arte digital. La entrada es libre y gratuita para toda la familia.',
  (SELECT id FROM categories WHERE slug = 'cultura'),
  true,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  NOW() - INTERVAL '8 hours'
),
(
  'Campaña de vacunación en barrios vulnerables',
  'El Ministerio de Salud intensifica la campaña de inmunización en sectores de mayor riesgo.',
  'Se instalaron puestos móviles de vacunación en cinco barrios de la periferia. El objetivo es alcanzar una cobertura del 95% en estas zonas. También se realizan controles de salud gratuitos y se distribuye material educativo sobre prevención.',
  (SELECT id FROM categories WHERE slug = 'sociedad'),
  true,
  null,
  NOW() - INTERVAL '10 hours'
),
(
  'Fibra óptica llega a nuevos barrios de la ciudad',
  'La empresa de telecomunicaciones anuncia la expansión de su red de alta velocidad.',
  'La inversión de 2 millones de pesos permitirá que 15 barrios más accedan a internet de alta velocidad. Se espera que la instalación esté completa en los próximos 6 meses. Esto beneficiará a más de 5000 familias y pequeños comercios de la zona.',
  (SELECT id FROM categories WHERE slug = 'tecnologia'),
  true,
  null,
  NOW() - INTERVAL '12 hours'
)
ON CONFLICT (title) DO NOTHING;
