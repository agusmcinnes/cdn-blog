import Link from "next/link"
import { Category } from "@/types"

interface HeaderProps {
  categories?: Category[] | null
}

export default function Header({ categories }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className=" h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center px-4">
                <span className="text-white font-bold text-lg">CDN</span>
              </div>
              <div>
                <Link href="/">
                  <h1 className="text-2xl font-bold text-gray-900">Crítica del Nea</h1>
                </Link>
                <p className="text-sm text-gray-600">Noticias y análisis crítico</p>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {categories?.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link href="/contacto" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Contacto
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
