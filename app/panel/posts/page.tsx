import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function PostsPage() {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.getUser()
  if (!user.user) {
    redirect("/auth/login")
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
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link href="/panel" className="text-green-600 hover:text-green-700">
                ← Panel
              </Link>
              <h1 className="text-2xl font-bold text-green-700">Gestión de Artículos</h1>
            </div>
            <Link href="/panel/posts/new">
              <Button className="bg-green-600 hover:bg-green-700">Nuevo Artículo</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {posts?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Publicado" : "Borrador"}
                    </Badge>
                    {post.categories && <Badge variant="outline">{post.categories.name}</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Creado: {new Date(post.created_at).toLocaleDateString("es-ES")}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/panel/posts/${post.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {!posts?.length && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No hay artículos creados aún.</p>
                <Link href="/panel/posts/new" className="mt-4 inline-block">
                  <Button className="bg-green-600 hover:bg-green-700">Crear primer artículo</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
