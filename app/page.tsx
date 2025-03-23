"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useProducts } from "@/contexts/product-context"
import ProductCard from "@/components/product-card"
import ParallaxHero from "@/components/parallax-hero"
import ParallaxSection from "@/components/parallax-section"
import AnimatedCategoryCard from "@/components/animated-category-card"
import ScrollAnimation from "@/components/scroll-animation"

export default function Home() {
  const { categories, getFeaturedProducts, getDiscountedProducts } = useProducts()
  const featuredProducts = getFeaturedProducts(6)
  const discountedProducts = getDiscountedProducts(4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax */}
      <ParallaxHero bgImage="/hero.jpg" overlayOpacity={0.7}>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 mb-6 rounded-full bg-yellow-400/20 backdrop-blur-sm"
            >
              <span className="text-yellow-400 font-medium">Desde 2000 en Toledo, Uruguay</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Barraca y Ferretería <span className="text-yellow-400">"El Toto"</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl"
            >
              Todo lo que necesitas para construcción, diseño y hogar en un solo lugar. Calidad y variedad para tus
              proyectos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/catalogo">
                <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 px-6 py-6 text-lg">
                  Explorar Catálogo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 text-lg">
                  Contacto
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </ParallaxHero>

      {/* Categories Section */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <ScrollAnimation>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-medium mb-2">
                NUESTRAS CATEGORÍAS
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Explora Nuestros Productos
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed">
                Encuentra todo lo que necesitas para tus proyectos en un solo lugar
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <AnimatedCategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                image={category.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Viernes de Descuentos - Parallax */}
      <ParallaxSection bgImage="/guantes.jpg" speed={-15}>
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <ScrollAnimation direction="left">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-red-400/20 backdrop-blur-sm text-red-400 text-sm font-medium mb-2 w-fit">
                  OFERTAS EXCLUSIVAS
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Viernes de Descuentos</h2>
                <p className="text-gray-200 text-lg">
                  Cada viernes, ofertas exclusivas en productos seleccionados. ¡No te los pierdas!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {discountedProducts.slice(0, 2).map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-colors"
                    >
                      <h3 className="font-semibold text-white">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <span className="text-gray-400 line-through">${product.originalPrice?.toLocaleString()}</span>
                          <span className="text-yellow-400 font-bold ml-2">${product.price.toLocaleString()}</span>
                        </div>
                        <Link href={`/producto/${product.id}`}>
                          <Button size="sm" className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">
                            Ver
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4">
                  <Link href="/catalogo">
                    <Button className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">
                      Ver Todas las Ofertas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-400/20 rounded-xl blur-xl"></div>
                <motion.div
                  className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 p-1 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Ofertas+Especiales"
                      alt="Viernes de Descuentos"
                      width={600}
                      height={600}
                      className="w-full h-auto rounded-lg transform transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                </motion.div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </ParallaxSection>

      {/* Productos Destacados */}
      <section className="w-full py-20 bg-white">
        <div className="container px-4 md:px-6">
          <ScrollAnimation>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-medium mb-2">
                LO MÁS BUSCADO
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Productos Destacados
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed">
                Explora nuestros productos más populares de diversas categorías
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <ScrollAnimation delay={0.3}>
            <div className="flex justify-center mt-12">
              <Link href="/catalogo">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-6 text-lg">
                  Ver Catálogo Completo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Marcas */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <ScrollAnimation>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-2">
                CONFÍAN EN NOSOTROS
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Nuestras Marcas</h2>
            </div>
          </ScrollAnimation>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["Stanley", "Bosch", "Tramontina", "3M", "Philips", "Black & Decker"].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={`/placeholder.svg?height=80&width=120&text=${brand}`}
                    alt={`Marca ${brand}`}
                    width={120}
                    height={80}
                    className="object-contain h-16 md:h-20 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nosotros - Parallax */}
      <ParallaxSection bgImage="/nosotros.jpg" speed={-10}>
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <ScrollAnimation direction="left">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-yellow-400/20 backdrop-blur-sm text-yellow-400 text-sm font-medium mb-2 w-fit">
                  NUESTRA HISTORIA
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Sobre Nosotros</h2>
                <p className="text-gray-200">
                  Barraca y Ferretería "El Toto" es una empresa familiar con más de 20 años de experiencia en Toledo,
                  Uruguay. Nos especializamos en brindar productos de calidad para construcción, diseño y hogar.
                </p>
                <p className="text-gray-200">
                  Nuestro compromiso es ofrecer la mejor atención y asesoramiento a nuestros clientes, con precios
                  competitivos y una amplia variedad de productos.
                </p>
                <div className="mt-4">
                  <Link href="/sobre-nosotros">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      Conoce más sobre nosotros
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-400/20 rounded-xl blur-xl"></div>
                <motion.div
                  className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 p-1 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=800&text=Sobre+Nosotros"
                      alt="Sobre Nosotros"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg transform transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                </motion.div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </ParallaxSection>

      {/* Contacto */}
      <section className="w-full py-20 bg-white">
        <div className="container px-4 md:px-6">
          <ScrollAnimation>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-medium mb-2">
                ESTAMOS PARA AYUDARTE
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">Contacto</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed">
                Estamos aquí para ayudarte. Contáctanos para más información.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            <ScrollAnimation direction="left">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
                  <h3 className="text-2xl font-bold text-gray-900">Información de Contacto</h3>
                  <p className="text-gray-800 mt-2">
                    Estamos disponibles para atenderte y responder todas tus consultas.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <MapPin className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Dirección</h4>
                      <p className="text-gray-600">Av. Principal 1234, Toledo, Canelones, Uruguay</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Phone className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Teléfono</h4>
                      <p className="text-gray-600">+598 2222 3333</p>
                      <p className="text-gray-600">+598 9999 8888 (WhatsApp)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Mail className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@eltoto.com.uy</p>
                      <p className="text-gray-600">ventas@eltoto.com.uy</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Horarios de Atención</h4>
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
              </motion.div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all"
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
                  <h3 className="text-2xl font-bold text-white">Envíanos un Mensaje</h3>
                  <p className="text-gray-300 mt-2">Completa el formulario y te responderemos a la brevedad.</p>
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
              </motion.div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={0.3}>
            <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ubicación</h3>
              <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Mapa de ubicación</p>
                {/* Aquí iría un mapa real en una implementación completa */}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}

