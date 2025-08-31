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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article>
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{post.description}</p>
          </header>

          {/* Featured Media */}
          {(post.video_iframe || post.youtube_url) ? (
            <div className="mb-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                {post.video_iframe ? (
                  <div 
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: post.video_iframe }}
                  />
                ) : (
                  // Legacy support for youtube_url - convert to iframe
                  <iframe
                    src={post.youtube_url ? (() => {
                      const videoId = post.youtube_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
                      return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : ""
                    })() : ""}
                    title={post.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
                <Image
                  src={`/generic-news-article.png?height=400&width=800&query=news article about ${post.title}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {post.content ? (
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{post.content}</div>
            ) : (
              <p className="text-gray-600 italic">El contenido completo del artículo estará disponible próximamente.</p>
            )}
          </div>

          {/* Share Section */}
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compartir artículo</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                WhatsApp
              </Button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Artículos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg relative overflow-hidden">
                    <Image
                      src={`/news-about-.png?height=200&width=300&query=news about ${relatedPost.title}`}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">
                      <Link href={`/articulo/${relatedPost.id}`} className="hover:text-green-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
