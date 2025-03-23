import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Facebook, Instagram, PhoneIcon as WhatsApp, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">El Toto</h3>
            <p className="text-gray-300 mb-4">
              Barraca y Ferretería con más de 20 años de experiencia brindando productos de calidad para construcción,
              diseño y hogar en Toledo, Uruguay.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://wa.me/59899998888"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400"
              >
                <WhatsApp className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Enlaces Rápidos</h3>
            <nav className="grid grid-cols-2 gap-2">
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-white">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalogo" className="text-gray-300 hover:text-white">
                      Catálogo
                    </Link>
                  </li>
                  <li>
                    <Link href="/categorias/construccion" className="text-gray-300 hover:text-white">
                      Construcción
                    </Link>
                  </li>
                  <li>
                    <Link href="/categorias/herramientas" className="text-gray-300 hover:text-white">
                      Herramientas
                    </Link>
                  </li>
                  <li>
                    <Link href="/categorias/ferreteria" className="text-gray-300 hover:text-white">
                      Ferretería
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/categorias/jardin" className="text-gray-300 hover:text-white">
                      Jardín
                    </Link>
                  </li>
                  <li>
                    <Link href="/categorias/diseno" className="text-gray-300 hover:text-white">
                      Diseño
                    </Link>
                  </li>
                  <li>
                    <Link href="/categorias/electrodomesticos" className="text-gray-300 hover:text-white">
                      Electrodomésticos
                    </Link>
                  </li>
                  <li>
                    <Link href="/sobre-nosotros" className="text-gray-300 hover:text-white">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="text-gray-300 hover:text-white">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Av. Principal 1234, Toledo, Canelones, Uruguay</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+598 2222 3333</span>
              </li>
              <li className="flex items-center">
                <WhatsApp className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+598 9999 8888</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@eltoto.com.uy</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Horarios</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300 font-semibold">Horario de Atención</span>
              </li>
              <li className="flex justify-between ml-7">
                <span className="text-gray-400">Lunes a Viernes:</span>
                <span className="text-gray-300">8:00 - 19:00</span>
              </li>
              <li className="flex justify-between ml-7">
                <span className="text-gray-400">Sábados:</span>
                <span className="text-gray-300">8:00 - 13:00</span>
              </li>
              <li className="flex justify-between ml-7">
                <span className="text-gray-400">Domingos:</span>
                <span className="text-gray-300">Cerrado</span>
              </li>
            </ul>
            <div className="mt-4 ml-7 bg-yellow-400 rounded-md p-3">
              <p className="text-gray-800 font-semibold text-sm">
                ¡Envíos a todo el país! Consulta por opciones de entrega en tu zona.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Barraca y Ferretería "El Toto". Todos los derechos reservados.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/terminos" className="text-gray-400 hover:text-white text-xs">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="text-gray-400 hover:text-white text-xs">
              Política de Privacidad
            </Link>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <Image
                src="/placeholder.svg?height=30&width=40&text=Visa"
                alt="Visa"
                width={40}
                height={30}
                className="object-contain"
              />
              <Image
                src="/placeholder.svg?height=30&width=40&text=MC"
                alt="MasterCard"
                width={40}
                height={30}
                className="object-contain"
              />
              <Image
                src="/placeholder.svg?height=30&width=40&text=MP"
                alt="MercadoPago"
                width={40}
                height={30}
                className="object-contain"
              />
              <Image
                src="/placeholder.svg?height=30&width=40&text=OCA"
                alt="OCA"
                width={40}
                height={30}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

