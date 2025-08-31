import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminLayout from "@/components/layout/AdminLayout"
import Link from "next/link"

export default async function AdminPanelPage() {
  return (
    <AdminLayout title="Panel Principal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📝 Artículos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Crear y gestionar artículos del blog</p>
              <Link href="/panel/posts">
                <Button className="w-full bg-green-600 hover:bg-green-700">Gestionar Artículos</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🏷️ Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Administrar categorías de noticias</p>
              <Link href="/panel/categories">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Gestionar Categorías</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📧 Suscriptores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Ver lista de suscriptores</p>
              <Link href="/panel/subscribers">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Ver Suscriptores</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
    </AdminLayout>
  )
}
