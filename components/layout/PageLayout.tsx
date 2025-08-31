import { ReactNode } from "react"
import { Header, Footer } from "@/components/home"
import type { Category } from "@/types"
import Link from "next/link"

interface PageLayoutProps {
  children: ReactNode
  categories?: Category[] | null
  showHeader?: boolean
  showFooter?: boolean
  headerStyle?: "default" | "minimal"
}

export default function PageLayout({ 
  children, 
  categories = null,
  showHeader = true, 
  showFooter = true,
  headerStyle = "default"
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {showHeader && headerStyle === "default" && <Header categories={categories} />}
      {showHeader && headerStyle === "minimal" && <MinimalHeader />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer categories={categories} />}
    </div>
  )
}

// Componente Header minimalista para páginas que no necesitan navegación completa
function MinimalHeader() {
  return (
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
        </div>
      </div>
    </header>
  )
}
