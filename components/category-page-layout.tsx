"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"

import { useProducts } from "@/contexts/product-context"
import ProductCard from "@/components/product-card"

interface CategoryPageLayoutProps {
  categoryId: string
}

export default function CategoryPageLayout({ categoryId }: CategoryPageLayoutProps) {
  const { categories, getProductsByCategory } = useProducts()
  const category = categories.find((cat) => cat.id === categoryId)
  const products = getProductsByCategory(categoryId)

  if (!category) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categoría no encontrada</h2>
          <Link href="/catalogo" className="text-yellow-500 hover:text-yellow-600">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">{category.name}</h1>
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl">{category.description}</p>
      </div>

      {/* Navegación entre categorías */}
      <div className="mb-8 overflow-hidden">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Otras categorías</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((cat) => cat.id !== categoryId)
            .map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.id}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="h-full"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No hay productos en esta categoría</h2>
          <p className="text-gray-600 mb-6">Estamos trabajando para agregar nuevos productos pronto.</p>
          <Link href="/catalogo">
            <Button className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">Ver otras categorías</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

