import { Button } from "@/components/ui/button"

export default function NewsletterSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Mantente Informado</h3>
        <p className="text-xl text-gray-600 mb-8">Recibe las noticias más importantes directamente en tu email</p>
        <div className="max-w-md mx-auto">
          <form className="flex gap-4">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <Button type="submit" className="bg-green-600 hover:bg-green-700 px-6">
              Suscribirse
            </Button>
          </form>
          <p className="text-sm text-gray-500 mt-3">
            Contacto:{" "}
            <a href="mailto:criticadelnea@gmail.com" className="text-green-600 hover:underline">
              criticadelnea@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
