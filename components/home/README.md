# Componentes de la Página Principal

Esta carpeta contiene todos los componentes que conforman la página principal (`app/page.tsx`) del blog Crítica del Nea.

## Estructura de Componentes

### `Header.tsx`

Componente de navegación principal que incluye:

- Logo y nombre del sitio
- Navegación principal con categorías
- Link de contacto
- Diseño responsive

**Props:**

- `categories?: Category[] | null` - Array de categorías para la navegación

### `HeroSection.tsx`

Sección hero de la página principal que incluye:

- Título principal con gradiente
- Descripción del sitio
- Badges de categorías destacadas
- Fondo con gradiente

**Props:**

- `categories?: Category[] | null` - Array de categorías para mostrar como badges

### `FeaturedArticles.tsx`

Sección de artículos destacados que incluye:

- Grid de artículos en cards
- Soporte para videos de YouTube
- Imágenes de placeholder
- Badges de categorías
- Fecha de publicación
- Botón "Leer más"

**Props:**

- `posts?: Post[] | null` - Array de posts para mostrar
- `postsError?: any` - Error de la query para mostrar mensaje apropiado

### `NewsletterSection.tsx`

Sección de suscripción al newsletter que incluye:

- Formulario de suscripción
- Campo de email con validación
- Información de contacto
- Diseño centrado

**Props:** Ninguna (componente estático)

### `Footer.tsx`

Pie de página que incluye:

- Información de la empresa
- Links a categorías
- Información de contacto
- Copyright

**Props:**

- `categories?: Category[] | null` - Array de categorías para mostrar en el footer

### `LoadingError.tsx`

Componente de error para mostrar cuando hay problemas de conexión:

- Mensaje de error
- Instrucciones para el usuario

**Props:** Ninguna (componente estático)

## Tipos

Los tipos están definidos en `types/index.ts`:

```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  youtube_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category;
}
```

## Uso

Los componentes se importan desde el archivo `index.ts` para facilidad de uso:

```typescript
import {
  Header,
  HeroSection,
  FeaturedArticles,
  NewsletterSection,
  Footer,
  LoadingError,
} from "@/components/home";
```

## Beneficios de esta Estructura

1. **Mantenibilidad**: Cada componente tiene una responsabilidad específica
2. **Reutilización**: Los componentes pueden ser reutilizados en otras páginas
3. **Testing**: Cada componente puede ser testado independientemente
4. **Desarrollo**: Múltiples desarrolladores pueden trabajar en diferentes componentes
5. **Performance**: Mejor tree-shaking y lazy loading potencial
6. **Tipos**: TypeScript ofrece mejor intellisense y detección de errores
