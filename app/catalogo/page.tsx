"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useProducts } from "@/contexts/product-context"
import ProductCard from "@/components/product-card"

export default function CatalogoPage() {
  const { categories, getProductsByCategory } = useProducts()
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "")

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Catálogo de Productos</h1>
      </div>

      {/* Tabs verticales en móvil, horizontales en desktop */}
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar de categorías (vertical en móvil, horizontal en desktop) */}
        <div className="md:w-64 flex-shrink-0">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 md:hidden">Categorías</h2>
          <div className="flex flex-wrap md:flex-col gap-2 pb-4 md:pb-0 border-b md:border-b-0 md:border-r border-gray-200 md:pr-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-left transition-colors ${
                  activeCategory === category.id
                    ? "bg-yellow-400 text-gray-900 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de la categoría seleccionada */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {categories.map(
              (category) =>
                activeCategory === category.id && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {getProductsByCategory(category.id).map((product) => (
                        <div key={product.id} className="h-full">
                          <ProductCard key={product.id} product={product} />
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                      <Link href={`/categorias/${category.id}`}>
                        <Button className="bg-gray-800 hover:bg-gray-700">
                          Ver todos los productos de {category.name}
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

