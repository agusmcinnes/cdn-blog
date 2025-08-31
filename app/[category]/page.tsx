import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  const reservedRoutes = ["contacto", "panel", "auth", "api", "_next", "favicon.ico"]

  if (reservedRoutes.includes(category)) {
    console.log("[v0] CategoryPage: Reserved route detected, redirecting:", category)
    redirect(`/${category}`)
  }

  const supabase = await createClient()

  console.log("[v0] CategoryPage: Looking for category:", category)

  if (category === "todas") {
    const { data: posts } = await supabase
      .from("posts")
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq("published", true)
      .order("created_at", { ascending: false })

    const { data: allCategories } = await supabase.from("categories").select("*").order("name")

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CDN</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Crítica del Nea</h1>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                {allCategories?.slice(0, 5).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="font-medium text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* All Posts Header */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4">
                Todas las Categorías
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Todas las Noticias</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explora todas nuestras noticias y artículos de todas las categorías
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {posts?.length || 0} artículo{posts?.length !== 1 ? "s" : ""}
              </h3>
              <Link href="/">
                <Button variant="outline">← Inicio</Button>
              </Link>
            </div>

            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg relative overflow-hidden">
                      {post.youtube_url ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={`/generic-news-article.png?height=200&width=400&query=news article about ${post.title}`}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.categories?.name}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                      <CardTitle className="text-xl leading-tight hover:text-green-600 transition-colors">
                        <Link href={`/articulo/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3">{post.description}</p>
                      <Link href={`/articulo/${post.id}`} className="inline-block mt-4">
                        <Button variant="ghost" className="text-green-600 hover:text-green-700 p-0">
                          Leer más →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No hay artículos disponibles aún.</p>
                <Link href="/" className="inline-block mt-4">
                  <Button variant="outline">Volver al inicio</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    )
  }

  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", category)
    .maybeSingle()

  console.log("[v0] CategoryPage: Category data:", categoryData, "Error:", categoryError)

  if (categoryError) {
    console.log("[v0] CategoryPage: Database error:", categoryError)
    notFound()
  }

  if (!categoryData) {
    console.log("[v0] CategoryPage: Category not found, redirecting to 404")
    notFound()
  }

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("published", true)
    .eq("category_id", categoryData.id)
    .order("created_at", { ascending: false })

  const { data: allCategories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CDN</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Crítica del Nea</h1>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {allCategories?.slice(0, 5).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className={`font-medium transition-colors ${
                    cat.slug === category ? "text-green-600" : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Category Header */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="bg-green-100 text-green-700 mb-4">
              {categoryData.name}
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Noticias de {categoryData.name}</h2>
            {categoryData.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{categoryData.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {posts?.length || 0} artículo{posts?.length !== 1 ? "s" : ""}
            </h3>
            <Link href="/">
              <Button variant="outline">← Todas las categorías</Button>
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg relative overflow-hidden">
                    {post.youtube_url ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={`/generic-news-article.png?height=200&width=400&query=news article about ${post.title}`}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {post.categories?.name}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight hover:text-green-600 transition-colors">
                      <Link href={`/articulo/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{post.description}</p>
                    <Link href={`/articulo/${post.id}`} className="inline-block mt-4">
                      <Button variant="ghost" className="text-green-600 hover:text-green-700 p-0">
                        Leer más →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No hay artículos en esta categoría aún.</p>
              <Link href="/" className="inline-block mt-4">
                <Button variant="outline">Ver todas las noticias</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
