// Tipos de datos para productos
export interface Product {
  id: string
  name: string
  category: string
  categoryId: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number // Para productos con descuento
  discountPercentage?: number // Porcentaje de descuento
  image: string
  specifications: { name: string; value: string }[]
  features: string[]
  stock: boolean
  isNew?: boolean
  isFeatured?: boolean
}

// Función de utilidad para generar productos por categoría
const generateProductsByCategory = (
  categoryId: string,
  categoryName: string,
  basePrice: number,
  count = 12,
): Product[] => {
  return Array.from({ length: count }).map((_, index) => {
    const id = `${categoryId}-${index + 1}`
    const price = basePrice + index * (basePrice * 0.1)

    // Determinar si el producto tiene descuento (cada 3er producto)
    const hasDiscount = index % 3 === 0
    const discountPercentage = hasDiscount ? 15 : undefined
    const originalPrice = hasDiscount ? Math.round(price * (1 + discountPercentage! / 100)) : undefined

    // Determinar si es nuevo (cada 4to producto)
    const isNew = index % 4 === 0

    // Determinar si es destacado (cada 5to producto)
    const isFeatured = index % 5 === 0

    return {
      id,
      name: `${categoryName} Premium ${index + 1}`,
      category: categoryName,
      categoryId,
      description: `Producto de ${categoryName} de alta calidad. Diseñado para profesionales y aficionados que buscan lo mejor para sus proyectos. Este producto cuenta con garantía de 1 año y soporte técnico incluido.`,
      shortDescription: `Producto de ${categoryName} de alta calidad para profesionales y aficionados.`,
      price,
      originalPrice,
      discountPercentage,
      image: `/placeholder.svg?height=500&width=500&text=${encodeURIComponent(categoryName)}+${index + 1}`,
      specifications: [
        { name: "Marca", value: ["Stanley", "Bosch", "Tramontina", "3M", "Black & Decker"][index % 5] },
        { name: "Material", value: ["Acero", "Plástico reforzado", "Aluminio", "Madera", "Cerámica"][index % 5] },
        { name: "Dimensiones", value: `${30 + index * 5}cm x ${20 + index * 3}cm x ${10 + index}cm` },
        { name: "Peso", value: `${1 + index * 0.5}kg` },
        { name: "Garantía", value: "1 año" },
      ],
      features: [
        `Característica principal del producto de ${categoryName}`,
        `Resistente a ${["agua", "golpes", "corrosión", "temperaturas extremas", "rayones"][index % 5]}`,
        `Incluye ${["manual de instrucciones", "kit de instalación", "accesorios", "estuche", "soporte técnico"][index % 5]}`,
        `Ideal para ${["uso profesional", "proyectos DIY", "uso doméstico", "principiantes", "expertos"][index % 5]}`,
        `Tecnología ${["avanzada", "patentada", "innovadora", "sustentable", "ergonómica"][index % 5]}`,
      ],
      stock: Math.random() > 0.2, // 80% de probabilidad de estar en stock
      isNew,
      isFeatured,
    }
  })
}

// Datos de productos por categoría
export const PRODUCTS: Record<string, Product[]> = {
  construccion: generateProductsByCategory("construccion", "Construcción", 1500, 12),
  herramientas: generateProductsByCategory("herramientas", "Herramientas", 2000, 12),
  jardin: generateProductsByCategory("jardin", "Jardín", 800, 12),
  diseno: generateProductsByCategory("diseno", "Diseño Interior", 1200, 12),
  electrodomesticos: generateProductsByCategory("electrodomesticos", "Electrodomésticos", 3000, 12),
  ferreteria: generateProductsByCategory("ferreteria", "Ferretería", 500, 12),
}

// Todas las categorías con información completa
export const CATEGORIES = [
  {
    id: "construccion",
    name: "Construcción",
    description:
      "Todo lo que necesitas para tus proyectos de construcción. Materiales de alta calidad y herramientas profesionales.",
    image: "/placeholder.svg?height=240&width=360&text=Construcción",
  },
  {
    id: "herramientas",
    name: "Herramientas",
    description: "Las mejores marcas de herramientas para profesionales y aficionados. Calidad garantizada.",
    image: "/placeholder.svg?height=240&width=360&text=Herramientas",
  },
  {
    id: "jardin",
    name: "Jardín",
    description: "Todo para el cuidado y mantenimiento de tus espacios verdes. Herramientas, plantas y accesorios.",
    image: "/placeholder.svg?height=240&width=360&text=Jardín",
  },
  {
    id: "diseno",
    name: "Diseño Interior",
    description: "Vinilos, baldosas, PVC y más para renovar tu hogar con el mejor estilo.",
    image: "/placeholder.svg?height=240&width=360&text=Diseño",
  },
  {
    id: "electrodomesticos",
    name: "Electrodomésticos",
    description: "Televisores, heladeras, aspiradoras y más para hacer tu vida más cómoda.",
    image: "/placeholder.svg?height=240&width=360&text=Electrodomésticos",
  },
  {
    id: "ferreteria",
    name: "Ferretería",
    description: "Artículos de ferretería para todo uso. Encuentra lo que necesitas para tus proyectos.",
    image: "/placeholder.svg?height=240&width=360&text=Ferretería",
  },
]

// Todos los productos en un solo array
export const ALL_PRODUCTS = Object.values(PRODUCTS).flat()

// Función para buscar un producto por ID
export const getProductById = (id: string): Product | undefined => {
  return ALL_PRODUCTS.find((product) => product.id === id)
}

// Función para buscar productos relacionados (misma categoría, distinto producto)
export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = getProductById(productId)
  if (!product) return []

  return PRODUCTS[product.categoryId].filter((p) => p.id !== productId).slice(0, limit)
}

// Función para buscar productos destacados (algunos de cada categoría)
export const getFeaturedProducts = (limit = 6): Product[] => {
  const featured: Product[] = []

  Object.values(PRODUCTS).forEach((categoryProducts) => {
    // Tomar 1 o 2 productos de cada categoría
    const take = Math.ceil(limit / CATEGORIES.length)
    featured.push(...categoryProducts.filter((p) => p.isFeatured).slice(0, take))
  })

  return featured.slice(0, limit)
}

// Función para buscar productos en oferta
export const getDiscountedProducts = (limit = 6): Product[] => {
  return ALL_PRODUCTS.filter((product) => product.discountPercentage !== undefined).slice(0, limit)
}

// Función para buscar productos nuevos
export const getNewProducts = (limit = 6): Product[] => {
  return ALL_PRODUCTS.filter((product) => product.isNew).slice(0, limit)
}

