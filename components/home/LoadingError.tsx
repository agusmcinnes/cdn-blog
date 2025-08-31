export default function LoadingError() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error de Conexión</h1>
        <p className="text-gray-600">No se pudo conectar con la base de datos.</p>
        <p className="text-sm text-gray-400 mt-2">Verifica la configuración de Supabase.</p>
      </div>
    </div>
  )
}
