/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Paquetes externos del servidor para optimizar el bundling
  serverExternalPackages: ['@supabase/supabase-js'],
  // Configuración para suprimir advertencias específicas de Supabase
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
      })
    }
    
    // Suprimir advertencias específicas de Supabase
    config.infrastructureLogging = {
      level: 'error',
    }
    
    return config
  },
  // Configuración para logging
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
}

export default nextConfig
