import Link from "next/link"
import { Category } from "@/types"

interface FooterProps {
  categories?: Category[] | null
}

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CDN</span>
              </div>
              <span className="text-xl font-bold">Crítica del Nea</span>
            </div>
            <p className="text-gray-400">
              Portal de noticias con análisis crítico y cobertura local de los acontecimientos más relevantes.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorías</h4>
            <ul className="space-y-2">
              {categories?.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link href={`/${category.slug}`} className="text-gray-400 hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400 mb-2">
              Email:{" "}
              <a href="mailto:criticadelnea@gmail.com" className="text-green-400 hover:underline">
                criticadelnea@gmail.com
              </a>
            </p>
            <Link href="/contacto" className="text-green-400 hover:underline">
              Formulario de contacto
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Crítica del Nea. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
