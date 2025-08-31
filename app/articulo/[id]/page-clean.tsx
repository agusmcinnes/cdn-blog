import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("posts")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("id", id)
    .eq("published", true)
    .single()

  if (!post) {
    notFound()
  }

  const { data: relatedPosts } = await supabase
    .from("posts")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("published", true)
    .eq("category_id", post.category_id)
    .neq("id", post.id)
    .limit(3)

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
            <Link href="/">
              <Button variant="outline">← Inicio</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-4">
          <Link href="/">
            <Button variant="outline" size="sm">← Volver al inicio</Button>
          </Link>
        </div>

        <article className="w-full">
          {/* Article Header */}
          <header className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.categories && (
                <Link href={`/${post.categories.slug}`}>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                    {post.categories.name}
                  </Badge>
                </Link>
              )}
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">{post.description}</p>
          </header>

          {/* Featured Media */}
          {post.image_url && (
            <div className="mb-6 sm:mb-8 -mx-4 sm:mx-0">
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          {post.content && (
            <div 
              className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-green-600 hover:prose-a:text-green-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                    {relatedPost.image_url && (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={relatedPost.image_url}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardHeader className="p-3 sm:p-6">
                      <CardTitle className="text-base sm:text-lg leading-tight">
                        <Link href={`/articulo/${relatedPost.id}`} className="hover:text-green-600 transition-colors">
                          {relatedPost.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </div>
  )
}
