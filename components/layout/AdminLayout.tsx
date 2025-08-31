import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdminLayoutProps {
  children: ReactNode
  title?: string
  showBackButton?: boolean
  backUrl?: string
}

export default async function AdminLayout({ 
  children, 
  title = "Panel de Administración",
  showBackButton = false,
  backUrl = "/panel" 
}: AdminLayoutProps) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Link href={backUrl}>
                  <Button variant="outline" size="sm">← Volver</Button>
                </Link>
              )}
              <div className="flex items-center gap-4">
                <Link href="/panel" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CDN</span>
                  </div>
                  <h1 className="text-2xl font-bold text-green-700">Admin</h1>
                </Link>
                <span className="text-sm text-muted-foreground">{title}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{data.user.email}</span>
              <Link href="/">
                <Button variant="outline" size="sm">Ver sitio</Button>
              </Link>
              <form action="/auth/signout" method="post">
                <Button variant="outline" size="sm">
                  Cerrar Sesión
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
