import { ReactNode } from "react"
import Link from "next/link"

interface SimpleLayoutProps {
  children: ReactNode
  showMinimalHeader?: boolean
}

export default function SimpleLayout({ children, showMinimalHeader = false }: SimpleLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {showMinimalHeader && (
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
      )}
      {children}
    </div>
  )
}
