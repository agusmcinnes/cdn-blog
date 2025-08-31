"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SetupAdminPage() {
  const [email, setEmail] = useState("admin@criticadelnea.com")
  const [password, setPassword] = useState("admin123456")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const createAdminUser = async () => {
    setLoading(true)
    setMessage("")
    setError("")

    try {
      console.log("[v0] Attempting to create admin user:", email)

      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/panel`,
        },
      })

      console.log("[v0] Auth signup result:", { authData, authError })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        console.log("[v0] User created successfully, assigning admin role")

        // Asignar rol de admin
        const { error: roleError } = await supabase.from("user_roles").insert({
          user_id: authData.user.id,
          role: "admin",
        })

        console.log("[v0] Role assignment result:", { roleError })

        if (roleError) {
          console.error("Error assigning admin role:", roleError)
          // No lanzamos error aquí porque el usuario se creó exitosamente
        }

        setMessage(`Usuario administrador creado exitosamente! 
        Email: ${email}
        Contraseña: ${password}
        
        Nota: Es posible que necesites confirmar el email antes de poder iniciar sesión.`)
      }
    } catch (err: any) {
      console.error("[v0] Error creating admin user:", err)
      setError(err.message || "Error al crear usuario administrador")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-700">Configurar Administrador</CardTitle>
          <CardDescription className="text-center">Crea el usuario administrador para Crítica del Nea</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email del Administrador
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@criticadelnea.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <Button onClick={createAdminUser} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
            {loading ? "Creando..." : "Crear Usuario Administrador"}
          </Button>

          {message && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800 whitespace-pre-line">{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-gray-600 text-center">
            <p>Después de crear el usuario, ve a:</p>
            <a href="/auth/login" className="text-blue-600 hover:underline">
              /auth/login
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
