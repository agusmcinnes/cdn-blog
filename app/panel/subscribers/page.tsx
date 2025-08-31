import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function SubscribersPage() {
  const supabase = await createClient()

  const { data: user } = await supabase.auth.getUser()
  if (!user.user) {
    redirect("/auth/login")
  }

  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false })

  const activeSubscribers = subscribers?.filter((sub) => sub.active) || []
  const inactiveSubscribers = subscribers?.filter((sub) => !sub.active) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <Link href="/panel" className="text-green-600 hover:text-green-700">
              ← Panel
            </Link>
            <h1 className="text-2xl font-bold text-green-700">Suscriptores</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Suscriptores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{subscribers?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{activeSubscribers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inactivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-600">{inactiveSubscribers.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Suscriptores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscribers?.map((subscriber) => (
                <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{subscriber.email}</div>
                    <div className="text-sm text-muted-foreground">
                      Suscrito: {new Date(subscriber.subscribed_at).toLocaleDateString("es-ES")}
                    </div>
                  </div>
                  <Badge variant={subscriber.active ? "default" : "secondary"}>
                    {subscriber.active ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              ))}

              {!subscribers?.length && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hay suscriptores aún.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
