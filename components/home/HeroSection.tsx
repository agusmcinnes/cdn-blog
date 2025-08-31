import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Category } from "@/types"
import { ArrowRight, Newspaper, TrendingUp, Users } from "lucide-react"

interface HeroSectionProps {
  categories?: Category[] | null
}

export default function HeroSection({ categories }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIxLjUiIGZpbGw9InJnYmEoNTksIDEzMCwgMjQ2LCAwLjA1KSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPgo8L3N2Zz4=')] opacity-20"></div>
      
      {/* Floating shapes */}
    
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 bg-blue-600/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-4 py-2 mb-8">
            <Newspaper className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Periodismo de calidad</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Noticias que
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-green-400 to-blue-500 bg-clip-text text-transparent">
              realmente importan
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Análisis crítico, cobertura local y las historias que definen nuestra región. 
            <br className="hidden sm:block" />
            <span className="text-blue-300">Periodismo independiente y de calidad</span>
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span>Explorar Noticias</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800/50 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300"
            >
              <Users className="mr-2 w-5 h-5" />
              Suscribirse
            </Button>
          </div>

          {/* Categorías mejoradas */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm uppercase tracking-wide">
              <TrendingUp className="w-4 h-4" />
              <span>Categorías destacadas</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories?.slice(0, 6).map((category, index) => (
                <Link key={category.id} href={`/${category.slug}`}>
                  <Badge 
                    variant="outline" 
                    className={`
                      px-6 py-3 text-sm font-medium cursor-pointer
                      bg-slate-800/50 border-slate-600 text-slate-300
                      hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-green-600/20 
                      hover:border-blue-400/50 hover:text-white
                      backdrop-blur-sm transition-all duration-300 transform hover:scale-105
                      ${index % 2 === 0 ? 'hover:shadow-lg hover:shadow-blue-500/20' : 'hover:shadow-lg hover:shadow-green-500/20'}
                    `}
                  >
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Estadísticas mejoradas */}
          <div className="mt-20 pt-12 border-t border-slate-600/30 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {/* Lectores */}
              <div className="text-center group">
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 relative z-20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    1.2M+
                  </div>
                  <div className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Lectores mensuales
                  </div>
                  <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full w-[85%] transition-all duration-1000 ease-out"></div>
                  </div>
                </div>
              </div>
              
              {/* Artículos */}
              <div className="text-center group">
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 relative z-20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
                    150+
                  </div>
                  <div className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Artículos publicados
                  </div>
                  <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full w-[92%] transition-all duration-1000 ease-out delay-300"></div>
                  </div>
                </div>
              </div>
              
              {/* Satisfacción */}
              <div className="text-center group">
                <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 relative z-20">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
                    98%
                  </div>
                  <div className="text-slate-300 text-sm font-medium uppercase tracking-wide">
                    Satisfacción
                  </div>
                  <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full w-[98%] transition-all duration-1000 ease-out delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transición elegante hacia las noticias */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-0">
        {/* Gradiente principal */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-slate-50/60 to-transparent"></div>
        
        {/* Capa de ondas sutiles */}
        <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(148, 163, 184, 0.08)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.03)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
              </linearGradient>
            </defs>
            
            {/* Primera onda */}
            <path 
              d="M0,60 C300,90 900,30 1200,60 L1200,120 L0,120 Z" 
              fill="url(#waveGradient1)"
              className="animate-pulse"
            />
            
            {/* Segunda onda */}
            <path 
              d="M0,80 C400,50 800,110 1200,80 L1200,120 L0,120 Z" 
              fill="url(#waveGradient2)"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>

        {/* Gradiente de transición final */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-white/10"></div>
      </div>
    </section>
  )
}
