import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function SobreNosotrosPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Sobre Nosotros</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Historia</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Barraca y Ferretería "El Toto" es una empresa familiar con más de 20 años de experiencia en Toledo,
              Uruguay. Fundada en 2003 por la familia Rodríguez, hemos crecido hasta convertirnos en un referente en la
              zona para todo lo relacionado con construcción, diseño y hogar.
            </p>
            <p>
              Comenzamos como una pequeña ferretería de barrio y, gracias a la confianza de nuestros clientes y nuestro
              compromiso con la calidad, hemos expandido nuestro negocio para ofrecer una amplia gama de productos y
              servicios.
            </p>
            <p>
              Hoy en día, contamos con un equipo de profesionales capacitados para brindar el mejor asesoramiento y
              atención personalizada a cada uno de nuestros clientes.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/placeholder.svg?height=400&width=600&text=Nuestra+Historia"
            alt="Historia de El Toto"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1 flex justify-center">
          <Image
            src="/placeholder.svg?height=400&width=600&text=Nuestros+Valores"
            alt="Valores de El Toto"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestros Valores</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              En Barraca y Ferretería "El Toto", nos guiamos por valores fundamentales que definen nuestra forma de
              trabajar:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Calidad:</strong> Ofrecemos productos de las mejores marcas y materiales duraderos.
              </li>
              <li>
                <strong>Honestidad:</strong> Somos transparentes en nuestros precios y recomendaciones.
              </li>
              <li>
                <strong>Servicio al cliente:</strong> Brindamos atención personalizada y asesoramiento profesional.
              </li>
              <li>
                <strong>Compromiso:</strong> Nos esforzamos por superar las expectativas de nuestros clientes.
              </li>
              <li>
                <strong>Comunidad:</strong> Apoyamos el desarrollo local y contribuimos al crecimiento de Toledo.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            { name: "Juan Rodríguez", role: "Fundador y Director" },
            { name: "María Gómez", role: "Gerente de Ventas" },
            { name: "Carlos Fernández", role: "Especialista en Construcción" },
            { name: "Laura Martínez", role: "Atención al Cliente" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 mx-auto rounded-full overflow-hidden w-40 h-40 bg-gray-200">
                <Image
                  src={`/placeholder.svg?height=160&width=160&text=${member.name.split(" ")[0]}`}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">¿Por qué elegirnos?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Experiencia y Conocimiento</h3>
            <p className="text-gray-600">
              Más de 20 años en el rubro nos respaldan. Nuestro equipo cuenta con el conocimiento necesario para
              asesorarte en cualquier proyecto.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Variedad de Productos</h3>
            <p className="text-gray-600">
              Ofrecemos una amplia gama de productos para construcción, diseño, jardín y hogar. Todo lo que necesitas en
              un solo lugar.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Atención Personalizada</h3>
            <p className="text-gray-600">
              Nos preocupamos por entender tus necesidades y brindarte soluciones a medida. Tu satisfacción es nuestra
              prioridad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

