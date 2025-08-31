-- Adding sample data for categories and posts to populate the news site

-- Insert sample categories
INSERT INTO public.categories (name, slug, description) VALUES
('Deportes', 'deportes', 'Noticias deportivas locales y nacionales'),
('Política', 'politica', 'Actualidad política y gobierno'),
('Economía', 'economia', 'Noticias económicas y financieras'),
('Cultura', 'cultura', 'Eventos culturales y entretenimiento'),
('Sociedad', 'sociedad', 'Noticias de interés social y comunitario'),
('Tecnología', 'tecnologia', 'Innovación y avances tecnológicos');

-- Insert sample posts (using a dummy author_id - you'll need to replace with actual admin user ID)
INSERT INTO public.posts (title, description, content, category_id, published, youtube_url) VALUES
(
  'Victoria histórica del equipo local en el campeonato regional',
  'El Club Deportivo Nea logró una victoria contundente por 3-0 ante su rival histórico, asegurando su pase a la final del campeonato regional.',
  'En una noche memorable para el deporte local, el Club Deportivo Nea demostró su superioridad técnica y táctica al vencer por 3-0 a su rival de toda la vida. Los goles llegaron en el primer tiempo con una actuación brillante del delantero estrella, quien anotó un doblete en los primeros 30 minutos. El tercer gol llegó en el segundo tiempo tras una jugada colectiva que emocionó a los más de 5,000 espectadores presentes en el estadio municipal. Con esta victoria, el equipo se clasifica directamente a la final del campeonato regional que se disputará el próximo mes.',
  (SELECT id FROM public.categories WHERE slug = 'deportes'),
  true,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
),
(
  'Nuevas medidas económicas anunciadas por el gobierno provincial',
  'El gobernador presentó un paquete de medidas para impulsar la economía local, incluyendo incentivos fiscales para pequeñas empresas.',
  'Durante una conferencia de prensa realizada en Casa de Gobierno, el gobernador provincial anunció un ambicioso plan económico destinado a reactivar la economía regional. Las medidas incluyen una reducción del 30% en los impuestos provinciales para pequeñas y medianas empresas durante los próximos 12 meses, así como la creación de un fondo de créditos blandos por 50 millones de pesos. Además, se establecerán zonas francas en tres municipios estratégicos para atraer inversión extranjera. Los empresarios locales recibieron con beneplácito estas iniciativas, aunque algunos sectores solicitan mayor claridad en los mecanismos de implementación.',
  (SELECT id FROM public.categories WHERE slug = 'economia'),
  true,
  null
),
(
  'Festival de Arte Contemporáneo llega a la ciudad',
  'Más de 50 artistas locales y nacionales participarán en el primer Festival de Arte Contemporáneo que se realizará en el centro cultural.',
  'La ciudad se prepara para recibir el primer Festival de Arte Contemporáneo, un evento que promete transformar el panorama cultural local. Durante cinco días, el centro cultural municipal albergará exposiciones, talleres y performances de más de 50 artistas provenientes de diferentes provincias del país. La muestra incluye obras de pintura, escultura, fotografía y arte digital, con especial énfasis en temáticas sociales y ambientales. El evento es gratuito y se espera la participación de estudiantes de arte de universidades regionales. La inauguración será el viernes a las 19:00 horas con la presencia de reconocidos críticos de arte.',
  (SELECT id FROM public.categories WHERE slug = 'cultura'),
  true,
  null
),
(
  'Implementación de nueva tecnología en el hospital municipal',
  'El centro de salud incorpora equipamiento de última generación para mejorar la atención médica de la comunidad.',
  'El hospital municipal dio un paso importante hacia la modernización con la incorporación de nuevos equipos médicos de alta tecnología. La inversión de 2 millones de pesos permitió adquirir un tomógrafo computarizado de última generación, un equipo de resonancia magnética y sistemas de monitoreo digital para terapia intensiva. Estos avances tecnológicos reducirán significativamente los tiempos de diagnóstico y mejorarán la precisión de los tratamientos. El director del hospital destacó que esta modernización beneficiará a más de 80,000 habitantes de la región, eliminando la necesidad de derivar pacientes a centros de mayor complejidad.',
  (SELECT id FROM public.categories WHERE slug = 'tecnologia'),
  true,
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
),
(
  'Campaña de concientización ambiental en las escuelas',
  'Estudiantes de nivel primario y secundario participan en actividades educativas sobre el cuidado del medio ambiente.',
  'Una innovadora campaña de educación ambiental está siendo implementada en todas las escuelas públicas de la ciudad. La iniciativa, desarrollada en conjunto entre el Ministerio de Educación provincial y organizaciones ambientalistas locales, incluye talleres prácticos sobre reciclaje, huertos escolares y jornadas de limpieza en espacios públicos. Más de 3,000 estudiantes ya participaron en las primeras actividades, demostrando gran entusiasmo por aprender sobre sostenibilidad. Los docentes destacan el impacto positivo de estas actividades en la conciencia ecológica de los niños y adolescentes.',
  (SELECT id FROM public.categories WHERE slug = 'sociedad'),
  true,
  null
),
(
  'Debate sobre el presupuesto municipal para el próximo año',
  'El Concejo Deliberante analiza las prioridades de inversión pública para 2024, con especial atención a infraestructura y servicios.',
  'El Concejo Deliberante inició las sesiones extraordinarias para tratar el proyecto de presupuesto municipal 2024. Los concejales de diferentes bloques políticos presentaron sus observaciones sobre las partidas destinadas a obra pública, salud y educación. El presupuesto propuesto asciende a 800 millones de pesos, con un incremento del 15% respecto al año anterior. Las principales inversiones están dirigidas a la pavimentación de calles en barrios periféricos, ampliación de la red cloacal y construcción de dos nuevos jardines de infantes. La votación final está prevista para la próxima semana.',
  (SELECT id FROM public.categories WHERE slug = 'politica'),
  true,
  null
);

-- Insert some sample subscribers
INSERT INTO public.subscribers (email) VALUES
('juan.perez@email.com'),
('maria.gonzalez@email.com'),
('carlos.rodriguez@email.com'),
('ana.martinez@email.com'),
('luis.fernandez@email.com');
