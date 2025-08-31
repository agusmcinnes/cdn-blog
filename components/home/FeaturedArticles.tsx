import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Post } from "@/types"

interface FeaturedArticlesProps {
  posts?: Post[] | null
  postsError?: any
}

export default function FeaturedArticles({ posts, postsError }: FeaturedArticlesProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900">Últimas Noticias</h3>
          <Link href="/todas">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent">
              Ver todas
            </Button>
          </Link>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className={`hover:shadow-lg transition-shadow ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
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
                    {post.categories && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {post.categories.name}
                      </Badge>
                    )}
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
            <p className="text-gray-500 text-lg">No hay artículos publicados aún.</p>
            <p className="text-gray-400 text-sm mt-2">
              {postsError
                ? `Error: ${postsError.message}`
                : "Verifica que los datos de ejemplo se hayan insertado correctamente."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
