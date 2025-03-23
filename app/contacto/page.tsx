import Link from "next/link"
import { ChevronLeft, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ContactoPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Contacto</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-yellow-400 p-6">
            <h2 className="text-2xl font-bold text-gray-800">Información de Contacto</h2>
            <p className="text-gray-700 mt-2">Estamos disponibles para atenderte y responder todas tus consultas.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Dirección</h3>
                <p className="text-gray-600">Av. Principal 1234, Toledo, Canelones, Uruguay</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Teléfono</h3>
                <p className="text-gray-600">+598 2222 3333</p>
                <p className="text-gray-600">+598 9999 8888 (WhatsApp)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@eltoto.com.uy</p>
                <p className="text-gray-600">ventas@eltoto.com.uy</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Horarios de Atención</h3>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div>Lunes a Viernes</div>
                <div>8:00 - 19:00</div>
                <div>Sábados</div>
                <div>8:00 - 13:00</div>
                <div>Domingos</div>
                <div>Cerrado</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-yellow-400 p-6">
            <h2 className="text-2xl font-bold text-gray-800">Envíanos un Mensaje</h2>
            <p className="text-gray-700 mt-2">Completa el formulario y te responderemos a la brevedad.</p>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    placeholder="Tu teléfono"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    placeholder="Asunto de tu mensaje"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              <Button className="w-full bg-yellow-400 text-gray-800 hover:bg-yellow-500">Enviar Mensaje</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Ubicación</h2>
        <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Mapa de ubicación</p>
          {/* Aquí iría un mapa real en una implementación completa */}
        </div>
      </div>
    </div>
  )
}

