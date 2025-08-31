# Migración a Videos con iFrame HTML

## Cambios Implementados

### 1. Base de Datos

- Se agregó la columna `video_iframe` a la tabla `posts` para almacenar código HTML de iframe
- Se mantuvo la columna `youtube_url` para compatibilidad hacia atrás (opcional eliminarla después)

### 2. Formularios de Admin

- **Crear Post** (`/panel/posts/new`): Ahora tiene un campo de texto largo para insertar código iframe HTML
- **Editar Post** (`/panel/posts/[id]/edit`): Nueva página creada con funcionalidad completa de edición

### 3. Visualización de Artículos

- Los artículos ahora muestran videos usando el código iframe HTML directamente
- Mantiene compatibilidad con URLs de YouTube existentes
- Soporte para cualquier plataforma de video (YouTube, Vimeo, etc.)

## Pasos para Completar la Migración

### 1. Ejecutar Script SQL

Ejecuta el siguiente script en tu consola de Supabase:

```sql
-- Add new column for video iframe HTML
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS video_iframe TEXT;

-- Update existing records: convert youtube_url to iframe HTML
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

-- Add column comment
COMMENT ON COLUMN public.posts.video_iframe IS 'HTML iframe code for embedding videos (replaces youtube_url)';
```

### 2. Verificar la Aplicación

1. Ve a `/panel/posts/new` para crear un nuevo post con iframe
2. Ve a `/panel/posts` y edita un post existente
3. Verifica que los videos se muestren correctamente en los artículos

### 3. Opcional: Limpiar Datos Antiguos

Después de verificar que todo funciona correctamente, puedes eliminar la columna antigua:

```sql
ALTER TABLE public.posts DROP COLUMN youtube_url;
```

## Uso del Nuevo Sistema

### Para Administradores

1. **YouTube**: Copia el código embed desde "Compartir > Insertar" de YouTube
2. **Vimeo**: Copia el código embed desde el botón "Compartir > Insertar" de Vimeo
3. **Otros**: Cualquier código iframe válido funcionará

### Ejemplo de Código iframe

```html
<iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allowfullscreen
></iframe>
```

### Ventajas

- **Flexibilidad**: Soporte para cualquier plataforma de video
- **Control**: Control total sobre atributos del iframe (tamaño, opciones, etc.)
- **Funcionalidad**: Inserción directa sin procesamiento adicional
- **Compatibilidad**: Mantiene soporte para URLs existentes de YouTube
