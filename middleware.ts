import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  console.log("[v0] Middleware triggered for:", request.nextUrl.pathname)
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Optimizado para solo ejecutar middleware en rutas que necesitan autenticación
     * o gestión de sesiones. Esto reduce la carga y las advertencias.
     */
    '/panel/:path*',  // Solo rutas protegidas del panel de admin
    '/auth/:path*',   // Solo rutas de autenticación
    '/admin',         // Página de admin
    '/setup-admin',   // Configuración de admin
  ],
}
