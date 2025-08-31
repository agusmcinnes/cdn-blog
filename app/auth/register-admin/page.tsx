"use client"

import type React from "react"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterAdminPage() {
  const [email, setEmail] = useState("admin@gmail.com")
  const [password, setPassword] = useState("admin123456")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    console.log("[v0] Attempting to register admin:", email)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/panel`,
          data: {
            role: "admin",
          },
        },
      })

      if (error) {
        console.log("[v0] Registration error:", error.message)
        if (error.message.includes("invalid") || error.message.includes("not authorized")) {
          setError(
            `Error de configuración de Supabase: ${error.message}. Esto puede requerir configuración SMTP personalizada en el dashboard de Supabase.`,
          )
        } else {
          setError(error.message)
        }
      } else {
        console.log("[v0] Registration successful:", data)
        if (data.user && !data.user.email_confirmed_at) {
          setMessage(
            "Usuario creado pero requiere confirmación de email. Si no recibes el email, verifica la configuración SMTP en Supabase.",
          )
        } else {
          setMessage("¡Usuario administrador creado exitosamente! Ahora puedes hacer login con estas credenciales.")
        }
      }
    } catch (err) {
      console.log("[v0] Registration exception:", err)
      setError("Error inesperado durante el registro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-700">Registro de Administrador</CardTitle>
          <CardDescription>Crea el primer usuario administrador para Crítica del Nea</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Nota:</strong> Usa un email con dominio conocido (gmail.com, yahoo.com, etc.) ya que Supabase
                puede bloquear dominios personalizados.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {message && (
              <Alert>
                <AlertDescription className="text-green-700">{message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Creando..." : "Crear Usuario Administrador"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <p>
                Después del registro, ve a{" "}
                <a href="/auth/login" className="text-green-600 hover:underline">
                  /auth/login
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
