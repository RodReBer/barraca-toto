"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCategoryCardProps {
  id: string
  name: string
  description: string
  image: string
  className?: string
  index?: number
}

export default function AnimatedCategoryCard({
  id,
  name,
  description,
  image,
  className,
  index = 0,
}: AnimatedCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={cn("group relative overflow-hidden rounded-xl shadow-lg h-full", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10" />

      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-2">{description}</p>
        <Link
          href={`/categorias/${id}`}
          className="inline-flex items-center text-sm font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          Ver productos
          <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <ArrowRight className="ml-1 h-4 w-4" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}

