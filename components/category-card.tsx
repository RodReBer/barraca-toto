import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  id: string
  name: string
  description: string
  image: string
  className?: string
}

export default function CategoryCard({ id, name, description, image, className }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl h-full",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/50 to-transparent z-10" />

      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

