import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Early return para rutas que no necesitan procesamiento completo
  const isPublicRoute = 
    pathname === "/" ||
    pathname.startsWith("/contacto") ||
    pathname.startsWith("/articulo") ||
    pathname.match(/^\/[^/]+$/) // category pages like /deportes

  // Para rutas públicas, solo retornar la respuesta sin crear cliente de Supabase
  if (isPublicRoute) {
    console.log("[v0] Public route - skipping auth check:", pathname)
    return NextResponse.next()
  }

  // Solo para rutas protegidas, cargar Supabase dinámicamente
  const { createServerClient } = await import("@supabase/ssr")

  let supabaseResponse = NextResponse.next({
    request,
  })

  console.log("[v0] Middleware processing protected path:", pathname)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables!")
    return supabaseResponse
  }

  try {
    // Crear cliente de Supabase solo para rutas protegidas o de auth
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    console.log("[v0] Supabase client created for protected route")

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const isAuthRoute = pathname.startsWith("/auth")
    const isProtectedRoute = pathname.startsWith("/panel") || pathname === "/admin" || pathname === "/setup-admin"

    console.log("[v0] User authenticated:", !!user)
    console.log("[v0] Is auth route:", isAuthRoute)
    console.log("[v0] Is protected route:", isProtectedRoute)

    // Redirigir a login si accede a rutas protegidas sin autenticación
    if (isProtectedRoute && !user) {
      console.log("[v0] Redirecting to login - protected route without auth")
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }

    // Redirigir usuarios autenticados lejos de la página de login
    if (isAuthRoute && user && pathname === "/auth/login") {
      console.log("[v0] Redirecting authenticated user to panel")
      const url = request.nextUrl.clone()
      url.pathname = "/panel"
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error("[v0] Error in middleware:", error)
    console.error("[v0] Error message:", error instanceof Error ? error.message : "Unknown error")
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}
