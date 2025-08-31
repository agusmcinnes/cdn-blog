"use client"

import Link from "next/link"
import { useState } from "react"
import { Category } from "@/types"
import { Menu, X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  categories?: Category[] | null
}

export default function Header({ categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center px-4 shadow-lg">
                <span className="text-white font-bold text-lg">CDN</span>
              </div>
              <div>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <h1 className="text-2xl font-bold text-gray-900">Crítica del Nea</h1>
                </Link>
                <p className="text-sm text-gray-600">Noticias y análisis crítico</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {categories?.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
                >
                  {category.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            
            {/* Contact Button - Separated */}
            <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/contacto" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contacto
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-4">
              {categories?.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-green-50"
                >
                  {category.name}
                </Link>
              ))}
              
              {/* Mobile Contact Button */}
              <div className="pt-4 border-t border-gray-100">
                <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg">
                  <Link 
                    href="/contacto" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Contacto
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
