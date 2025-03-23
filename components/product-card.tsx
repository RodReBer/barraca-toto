"use client"

import Link from "next/link"
import Image from "next/image"
import { Zap, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/contexts/product-context"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPercentage !== undefined && product.originalPrice !== undefined

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden border-none shadow-lg h-[450px] flex flex-col group">
        {/* Contenedor de imagen con altura fija */}
        <div className="relative h-[200px] w-full bg-gray-100 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={288}
            height={192}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges para descuento o nuevo */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{product.discountPercentage}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                NUEVO
              </span>
            )}
          </div>
        </div>

        <CardContent className="p-5 flex flex-col flex-grow bg-white">
          <div className="text-xs font-medium text-yellow-600 uppercase tracking-wider mb-2">{product.category}</div>

          {/* Título con altura fija */}
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors h-[48px] line-clamp-2">
            {product.name}
          </h3>

          {/* Descripción con altura fija */}
          <p className="text-sm text-gray-600 mb-4 h-[40px] line-clamp-2">{product.shortDescription}</p>

          {/* Espacio flexible para empujar el precio y botón hacia abajo */}
          <div className="flex-grow"></div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-gray-500 line-through text-sm">${product.originalPrice?.toLocaleString()}</span>
                  <span className="font-bold text-red-600">${product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="font-bold text-gray-900">${product.price.toLocaleString()}</span>
              )}
            </div>
            <Link href={`/producto/${product.id}`}>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 group-hover:bg-yellow-50 transition-colors p-0"
              >
                Ver Producto
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </motion.span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

