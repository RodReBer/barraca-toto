"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

// Tipo para categorías
export interface Category {
  id: string
  name: string
  description: string
  image: string
}

// Tipo para el contexto
interface ProductContextType {
  products: Product[]
  categories: Category[]
  getProductById: (id: string) => Product | undefined
  getProductsByCategory: (categoryId: string) => Product[]
  getRelatedProducts: (productId: string, limit?: number) => Product[]
  getFeaturedProducts: (limit?: number) => Product[]
  getDiscountedProducts: (limit?: number) => Product[]
  getNewProducts: (limit?: number) => Product[]
  addProduct: (product: Product) => void
  removeProduct: (id: string) => void
}

// Crear el contexto
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// Datos de categorías
const CATEGORIES: Category[] = [
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

// Datos de productos predefinidos
const PREDEFINED_PRODUCTS: Product[] = [
  // Productos de Construcción
  {
    id: "construccion-1",
    name: "Cemento Portland Premium",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Cemento Portland de alta resistencia para todo tipo de construcciones. Ideal para estructuras que requieren durabilidad y resistencia a condiciones climáticas adversas.",
    shortDescription: "Cemento de alta resistencia para todo tipo de construcciones.",
    price: 1200,
    originalPrice: 1400,
    discountPercentage: 15,
    image: "/placeholder.svg?height=500&width=500&text=Cemento+Portland",
    specifications: [
      { name: "Marca", value: "Ancap" },
      { name: "Peso", value: "25kg" },
      { name: "Resistencia", value: "Alta" },
      { name: "Tipo", value: "Portland" },
      { name: "Garantía", value: "1 año" },
    ],
    features: [
      "Alta resistencia a la compresión",
      "Secado rápido",
      "Ideal para estructuras",
      "Resistente a la humedad",
      "Cumple con normas internacionales",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "construccion-2",
    name: "Arena Fina Lavada",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Arena fina lavada de primera calidad, libre de impurezas y con granulometría controlada. Perfecta para mezclas de concreto, morteros y revoques.",
    shortDescription: "Arena fina lavada para mezclas de concreto y morteros.",
    price: 850,
    image: "/placeholder.svg?height=500&width=500&text=Arena+Fina",
    specifications: [
      { name: "Tipo", value: "Fina" },
      { name: "Presentación", value: "Bolsa" },
      { name: "Peso", value: "50kg" },
      { name: "Origen", value: "Nacional" },
      { name: "Granulometría", value: "Controlada" },
    ],
    features: [
      "Libre de impurezas",
      "Granulometría controlada",
      "Ideal para revoques finos",
      "Excelente adherencia",
      "Fácil de trabajar",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "construccion-3",
    name: "Ladrillos Cerámicos Huecos",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Ladrillos cerámicos huecos de alta calidad para muros y tabiques. Ofrecen excelente aislamiento térmico y acústico, además de ser livianos y fáciles de instalar.",
    shortDescription: "Ladrillos cerámicos para muros con aislamiento térmico y acústico.",
    price: 1500,
    originalPrice: 1800,
    discountPercentage: 17,
    image: "/placeholder.svg?height=500&width=500&text=Ladrillos+Cerámicos",
    specifications: [
      { name: "Marca", value: "Ceramica del Norte" },
      { name: "Dimensiones", value: "12x18x33cm" },
      { name: "Material", value: "Cerámica" },
      { name: "Peso", value: "2.5kg por unidad" },
      { name: "Cantidad", value: "Paquete de 50 unidades" },
    ],
    features: [
      "Excelente aislamiento térmico",
      "Buen aislamiento acústico",
      "Livianos y fáciles de instalar",
      "Alta resistencia a la compresión",
      "Uniformidad dimensional",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "construccion-4",
    name: "Varillas de Hierro 8mm",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Varillas de hierro nervado de 8mm para refuerzo estructural. Fabricadas con acero de alta calidad, ofrecen excelente resistencia a la tracción y durabilidad.",
    shortDescription: "Varillas de hierro nervado para refuerzo estructural.",
    price: 2200,
    image: "/placeholder.svg?height=500&width=500&text=Varillas+Hierro",
    specifications: [
      { name: "Marca", value: "Gerdau" },
      { name: "Diámetro", value: "8mm" },
      { name: "Longitud", value: "12m" },
      { name: "Material", value: "Acero nervado" },
      { name: "Resistencia", value: "Alta" },
    ],
    features: [
      "Alta resistencia a la tracción",
      "Excelente adherencia al concreto",
      "Cumple con normas UNIT",
      "Fácil de doblar y cortar",
      "Resistente a la corrosión",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "construccion-5",
    name: "Membrana Asfáltica Aluminio",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Membrana asfáltica con terminación de aluminio para impermeabilización de techos. Ofrece excelente protección contra la humedad y los rayos UV, con gran durabilidad.",
    shortDescription: "Membrana asfáltica para impermeabilización de techos.",
    price: 3200,
    originalPrice: 3800,
    discountPercentage: 16,
    image: "/placeholder.svg?height=500&width=500&text=Membrana+Asfáltica",
    specifications: [
      { name: "Marca", value: "Ormiflex" },
      { name: "Ancho", value: "1m" },
      { name: "Largo", value: "10m" },
      { name: "Espesor", value: "4mm" },
      { name: "Terminación", value: "Aluminio" },
    ],
    features: [
      "Excelente impermeabilización",
      "Protección UV",
      "Fácil instalación",
      "Alta durabilidad",
      "Resistente a cambios de temperatura",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "construccion-6",
    name: "Malla Electrosoldada",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Malla electrosoldada para refuerzo de contrapisos y losas. Fabricada con acero de alta calidad, ofrece excelente resistencia y distribución uniforme de cargas.",
    shortDescription: "Malla electrosoldada para refuerzo de contrapisos y losas.",
    price: 2800,
    image: "/placeholder.svg?height=500&width=500&text=Malla+Electrosoldada",
    specifications: [
      { name: "Marca", value: "Gerdau" },
      { name: "Dimensiones", value: "2.4x6m" },
      { name: "Diámetro del alambre", value: "4.2mm" },
      { name: "Separación", value: "15x15cm" },
      { name: "Material", value: "Acero" },
    ],
    features: [
      "Distribución uniforme de cargas",
      "Fácil instalación",
      "Reduce el riesgo de fisuras",
      "Alta resistencia",
      "Cumple con normas UNIT",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "construccion-7",
    name: "Hormigón Premezclado H21",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Hormigón premezclado H21 de alta resistencia para estructuras. Dosificado con precisión para garantizar la calidad y resistencia requeridas en cada proyecto.",
    shortDescription: "Hormigón premezclado para estructuras de alta resistencia.",
    price: 4500,
    originalPrice: 5200,
    discountPercentage: 14,
    image: "/placeholder.svg?height=500&width=500&text=Hormigón+Premezclado",
    specifications: [
      { name: "Tipo", value: "H21" },
      { name: "Resistencia", value: "210kg/cm²" },
      { name: "Volumen", value: "1m³" },
      { name: "Asentamiento", value: "8-10cm" },
      { name: "Tamaño máx. agregado", value: "19mm" },
    ],
    features: [
      "Alta resistencia a la compresión",
      "Dosificación precisa",
      "Calidad controlada",
      "Entrega programada",
      "Ideal para estructuras",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "construccion-8",
    name: "Bloques de Hormigón",
    category: "Construcción",
    categoryId: "construccion",
    description:
      "Bloques de hormigón de alta resistencia para muros y cerramientos. Fabricados con materiales de primera calidad, ofrecen excelente durabilidad y aislamiento.",
    shortDescription: "Bloques de hormigón para muros y cerramientos.",
    price: 1800,
    image: "/placeholder.svg?height=500&width=500&text=Bloques+Hormigón",
    specifications: [
      { name: "Dimensiones", value: "19x19x39cm" },
      { name: "Material", value: "Hormigón vibrado" },
      { name: "Peso", value: "12kg por unidad" },
      { name: "Resistencia", value: "Alta" },
      { name: "Cantidad", value: "Paquete de 30 unidades" },
    ],
    features: [
      "Alta resistencia a la compresión",
      "Excelente aislamiento térmico",
      "Buen aislamiento acústico",
      "Fácil instalación",
      "Uniformidad dimensional",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },

  // Productos de Herramientas
  {
    id: "herramientas-1",
    name: "Taladro Percutor 850W",
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Taladro percutor profesional de 850W con mandril de 13mm. Ideal para perforar concreto, madera y metal con precisión y potencia. Incluye maletín y accesorios.",
    shortDescription: "Taladro percutor profesional para concreto, madera y metal.",
    price: 5500,
    originalPrice: 6500,
    discountPercentage: 15,
    image: "/placeholder.svg?height=500&width=500&text=Taladro+Percutor",
    specifications: [
      { name: "Marca", value: "Bosch" },
      { name: "Potencia", value: "850W" },
      { name: "Mandril", value: "13mm" },
      { name: "Velocidad", value: "0-3000rpm" },
      { name: "Garantía", value: "2 años" },
    ],
    features: [
      "Función percutor para concreto",
      "Control de velocidad variable",
      "Empuñadura ergonómica",
      "Incluye maletín y accesorios",
      "Reversible para extraer tornillos",
    ],
    stock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "herramientas-2",
    name: 'Amoladora Angular 4.5"',
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Amoladora angular de 4.5 pulgadas con 750W de potencia. Perfecta para cortar, desbastar y pulir diversos materiales con precisión y facilidad.",
    shortDescription: "Amoladora angular para cortar, desbastar y pulir materiales.",
    price: 4200,
    image: "/placeholder.svg?height=500&width=500&text=Amoladora+Angular",
    specifications: [
      { name: "Marca", value: "DeWalt" },
      { name: "Potencia", value: "750W" },
      { name: "Diámetro de disco", value: '4.5"' },
      { name: "Velocidad", value: "11000rpm" },
      { name: "Peso", value: "1.8kg" },
    ],
    features: [
      "Diseño compacto y ligero",
      "Empuñadura lateral ajustable",
      "Protector de disco ajustable",
      "Bloqueo de eje para cambio fácil de disco",
      "Motor protegido contra polvo",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "herramientas-3",
    name: "Juego de Destornilladores Precisión",
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Juego de destornilladores de precisión con 45 puntas intercambiables. Ideal para trabajos de electrónica, relojería y reparaciones de dispositivos móviles.",
    shortDescription: "Juego de destornilladores de precisión con puntas intercambiables.",
    price: 1800,
    originalPrice: 2200,
    discountPercentage: 18,
    image: "/placeholder.svg?height=500&width=500&text=Destornilladores+Precisión",
    specifications: [
      { name: "Marca", value: "Stanley" },
      { name: "Piezas", value: "45" },
      { name: "Material", value: "Acero cromo-vanadio" },
      { name: "Incluye", value: "Estuche organizador" },
      { name: "Tipos de puntas", value: "Phillips, planas, torx, hexagonales" },
    ],
    features: [
      "Puntas intercambiables de alta precisión",
      "Mango ergonómico con giro libre",
      "Estuche organizador compacto",
      "Ideal para electrónica y dispositivos",
      "Acero de alta calidad resistente al desgaste",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "herramientas-4",
    name: 'Sierra Circular 7.25"',
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Sierra circular de 7.25 pulgadas con 1500W de potencia. Perfecta para cortes precisos en madera, aglomerado y otros materiales. Incluye disco de corte.",
    shortDescription: "Sierra circular potente para cortes precisos en madera.",
    price: 7800,
    image: "/placeholder.svg?height=500&width=500&text=Sierra+Circular",
    specifications: [
      { name: "Marca", value: "Makita" },
      { name: "Potencia", value: "1500W" },
      { name: "Diámetro de disco", value: '7.25"' },
      { name: "Velocidad", value: "5800rpm" },
      { name: "Profundidad de corte", value: "65mm a 90°" },
    ],
    features: [
      "Base de aluminio resistente",
      "Guía láser para cortes precisos",
      "Ajuste de profundidad y ángulo",
      "Protector retráctil de seguridad",
      "Incluye disco de 24 dientes",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "herramientas-5",
    name: "Caja de Herramientas Completa",
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Caja de herramientas completa con 105 piezas para todo tipo de trabajos. Incluye llaves, alicates, destornilladores, martillo y mucho más en un estuche resistente.",
    shortDescription: "Caja de herramientas con 105 piezas para todo tipo de trabajos.",
    price: 6500,
    originalPrice: 7800,
    discountPercentage: 17,
    image: "/placeholder.svg?height=500&width=500&text=Caja+Herramientas",
    specifications: [
      { name: "Marca", value: "Tramontina" },
      { name: "Piezas", value: "105" },
      { name: "Material", value: "Acero cromo-vanadio" },
      { name: "Estuche", value: "Plástico reforzado" },
      { name: "Peso", value: "8.5kg" },
    ],
    features: [
      "Herramientas de uso profesional",
      "Estuche con compartimentos organizados",
      "Incluye llaves, alicates y destornilladores",
      "Acabado cromado resistente a la corrosión",
      "Ideal para hogar, taller y automóvil",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "herramientas-6",
    name: "Nivel Láser Autonivelante",
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Nivel láser autonivelante con líneas horizontales y verticales. Perfecto para instalaciones precisas de muebles, cuadros, estanterías y trabajos de construcción.",
    shortDescription: "Nivel láser autonivelante con líneas horizontales y verticales.",
    price: 4900,
    image: "/placeholder.svg?height=500&width=500&text=Nivel+Láser",
    specifications: [
      { name: "Marca", value: "Bosch" },
      { name: "Alcance", value: "15m" },
      { name: "Precisión", value: "±0.3mm/m" },
      { name: "Autonivelación", value: "±4°" },
      { name: "Incluye", value: "Soporte y estuche" },
    ],
    features: [
      "Proyección de líneas horizontales y verticales",
      "Autonivelación con indicador",
      "Bloqueo de péndulo para transporte",
      "Base giratoria 360°",
      "Resistente a polvo y salpicaduras",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "herramientas-7",
    name: "Soldadora Inverter 200A",
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Soldadora inverter de 200A para electrodos de hasta 4mm. Compacta, ligera y potente, ideal para trabajos profesionales y aficionados exigentes.",
    shortDescription: "Soldadora inverter compacta y potente para trabajos profesionales.",
    price: 9800,
    originalPrice: 11500,
    discountPercentage: 15,
    image: "/placeholder.svg?height=500&width=500&text=Soldadora+Inverter",
    specifications: [
      { name: "Marca", value: "Lincoln Electric" },
      { name: "Amperaje", value: "200A" },
      { name: "Voltaje", value: "220V" },
      { name: "Ciclo de trabajo", value: "60% a 200A" },
      { name: "Electrodos", value: "Hasta 4mm" },
    ],
    features: [
      "Tecnología inverter de bajo consumo",
      "Sistema anti-stick para electrodos",
      "Protección térmica y sobrecarga",
      "Ventilador de refrigeración",
      "Incluye cables y pinzas",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "herramientas-8",
    name: "Compresor de Aire 50L",
    category: "Herramientas",
    categoryId: "herramientas",
    description:
      "Compresor de aire de 50 litros con 2HP de potencia. Ideal para inflar neumáticos, pintar, limpiar y usar herramientas neumáticas en el taller o garaje.",
    shortDescription: "Compresor de aire potente para múltiples aplicaciones.",
    price: 12500,
    image: "/placeholder.svg?height=500&width=500&text=Compresor+Aire",
    specifications: [
      { name: "Marca", value: "Black & Decker" },
      { name: "Capacidad", value: "50L" },
      { name: "Potencia", value: "2HP" },
      { name: "Presión máxima", value: "8 bar" },
      { name: "Caudal", value: "222L/min" },
    ],
    features: [
      "Tanque de 50L con ruedas para transporte",
      "Motor de inducción de bajo mantenimiento",
      "Regulador de presión con manómetro",
      "Válvula de seguridad y drenaje",
      "Incluye manguera espiral y accesorios",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },

  // Productos de Jardín
  {
    id: "jardin-1",
    name: "Cortadora de Césped Eléctrica",
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Cortadora de césped eléctrica de 1800W con ancho de corte de 38cm. Ideal para jardines medianos, con ajuste de altura de corte y bolsa recolectora.",
    shortDescription: "Cortadora de césped eléctrica potente para jardines medianos.",
    price: 8500,
    originalPrice: 9800,
    discountPercentage: 13,
    image: "/placeholder.svg?height=500&width=500&text=Cortadora+Césped",
    specifications: [
      { name: "Marca", value: "Black & Decker" },
      { name: "Potencia", value: "1800W" },
      { name: "Ancho de corte", value: "38cm" },
      { name: "Altura de corte", value: "20-70mm ajustable" },
      { name: "Capacidad bolsa", value: "40L" },
    ],
    features: [
      "Motor potente de 1800W",
      "Ajuste de altura de corte en 6 posiciones",
      "Bolsa recolectora de gran capacidad",
      "Mango plegable para fácil almacenamiento",
      "Ruedas grandes para mejor maniobrabilidad",
    ],
    stock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "jardin-2",
    name: 'Motosierra a Gasolina 18"',
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Motosierra a gasolina con espada de 18 pulgadas y motor de 52cc. Potente y resistente para trabajos de poda, tala y corte de leña en jardines y fincas.",
    shortDescription: "Motosierra potente para poda, tala y corte de leña.",
    price: 12800,
    image: "/placeholder.svg?height=500&width=500&text=Motosierra",
    specifications: [
      { name: "Marca", value: "Stihl" },
      { name: "Motor", value: "52cc 2 tiempos" },
      { name: "Longitud de espada", value: '18"' },
      { name: "Capacidad tanque", value: "550ml" },
      { name: "Peso", value: "5.6kg" },
    ],
    features: [
      "Sistema anti-vibración",
      "Freno de cadena automático",
      "Lubricación automática de cadena",
      "Arranque fácil con cebador",
      "Incluye funda protectora y herramientas",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "jardin-3",
    name: "Set de Herramientas de Jardín",
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Set completo de herramientas de jardín con 8 piezas. Incluye pala, rastrillo, tijeras de podar y más, todo en acero inoxidable con mangos ergonómicos.",
    shortDescription: "Set completo de herramientas para jardinería.",
    price: 3200,
    originalPrice: 3800,
    discountPercentage: 16,
    image: "/placeholder.svg?height=500&width=500&text=Herramientas+Jardín",
    specifications: [
      { name: "Marca", value: "Tramontina" },
      { name: "Piezas", value: "8" },
      { name: "Material", value: "Acero inoxidable" },
      { name: "Mangos", value: "Madera tratada" },
      { name: "Incluye", value: "Bolsa de almacenamiento" },
    ],
    features: [
      "Herramientas de alta calidad",
      "Mangos ergonómicos para mayor comodidad",
      "Resistentes a la corrosión",
      "Ideal para todo tipo de trabajos de jardinería",
      "Bolsa organizadora incluida",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "jardin-4",
    name: "Hidrolavadora 2000W",
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Hidrolavadora de alta presión con 2000W de potencia. Perfecta para limpiar patios, vehículos, fachadas y más con su potente chorro de agua a presión.",
    shortDescription: "Hidrolavadora potente para limpieza de exteriores.",
    price: 7500,
    image: "/placeholder.svg?height=500&width=500&text=Hidrolavadora",
    specifications: [
      { name: "Marca", value: "Karcher" },
      { name: "Potencia", value: "2000W" },
      { name: "Presión máxima", value: "150 bar" },
      { name: "Caudal", value: "420L/h" },
      { name: "Longitud manguera", value: "8m" },
    ],
    features: [
      "Motor de inducción silencioso",
      "Sistema de auto-stop",
      "Incluye lanza y boquillas intercambiables",
      "Depósito para detergente integrado",
      "Enrollador de manguera",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "jardin-5",
    name: "Aspersor Oscilante para Riego",
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Aspersor oscilante para riego de jardines con cobertura ajustable. Ideal para césped, huertos y jardines de tamaño mediano, con base estable y duradera.",
    shortDescription: "Aspersor oscilante ajustable para riego de jardines.",
    price: 1200,
    originalPrice: 1450,
    discountPercentage: 17,
    image: "/placeholder.svg?height=500&width=500&text=Aspersor+Riego",
    specifications: [
      { name: "Marca", value: "Gardena" },
      { name: "Cobertura máxima", value: "250m²" },
      { name: "Material", value: "Plástico ABS" },
      { name: "Conexión", value: '3/4"' },
      { name: "Ajustes", value: "17 posiciones" },
    ],
    features: [
      "Cobertura ajustable en longitud y anchura",
      "Base estable con pies antideslizantes",
      "Mecanismo oscilante duradero",
      "Filtro de agua integrado",
      "Compatible con sistemas de riego estándar",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "jardin-6",
    name: "Maceta Decorativa Grande",
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Maceta decorativa grande de cerámica con diseño rústico. Perfecta para plantas de interior o exterior, con excelente drenaje y acabado resistente a la intemperie.",
    shortDescription: "Maceta decorativa de cerámica para plantas grandes.",
    price: 2800,
    image: "/placeholder.svg?height=500&width=500&text=Maceta+Decorativa",
    specifications: [
      { name: "Material", value: "Cerámica esmaltada" },
      { name: "Dimensiones", value: "40x40x45cm" },
      { name: "Color", value: "Terracota" },
      { name: "Peso", value: "5kg" },
      { name: "Drenaje", value: "Orificio inferior" },
    ],
    features: [
      "Diseño rústico elegante",
      "Resistente a la intemperie",
      "Excelente drenaje",
      "Ideal para plantas grandes",
      "Acabado esmaltado duradero",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "jardin-7",
    name: "Semillas de Césped Premium",
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Mezcla premium de semillas de césped resistente y de rápido crecimiento. Ideal para crear nuevos jardines o reparar áreas dañadas con un resultado verde y tupido.",
    shortDescription: "Mezcla de semillas para césped resistente y tupido.",
    price: 950,
    originalPrice: 1100,
    discountPercentage: 14,
    image: "/placeholder.svg?height=500&width=500&text=Semillas+Césped",
    specifications: [
      { name: "Marca", value: "Green Garden" },
      { name: "Peso", value: "1kg" },
      { name: "Cobertura", value: "30m²" },
      { name: "Variedades", value: "Mezcla de 4 especies" },
      { name: "Germinación", value: "7-14 días" },
    ],
    features: [
      "Rápido crecimiento",
      "Resistente a pisadas",
      "Tolera sol y sombra parcial",
      "Bajo mantenimiento",
      "Incluye fertilizante inicial",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "jardin-8",
    name: "Manguera Expandible 30m",
    category: "Jardín",
    categoryId: "jardin",
    description:
      "Manguera expandible de 30 metros con pistola de 8 funciones. Ligera, flexible y resistente, se expande al contacto con el agua y se contrae para fácil almacenamiento.",
    shortDescription: "Manguera expandible con pistola multifunción.",
    price: 1800,
    image: "/placeholder.svg?height=500&width=500&text=Manguera+Expandible",
    specifications: [
      { name: "Marca", value: "FlexiHose" },
      { name: "Longitud", value: "10m contraída / 30m expandida" },
      { name: "Material", value: "Látex triple capa" },
      { name: "Conectores", value: "Latón" },
      { name: "Pistola", value: "8 funciones" },
    ],
    features: [
      "Se expande hasta 3 veces su tamaño",
      "No se enreda ni retuerce",
      "Pistola con 8 patrones de riego",
      "Conectores de latón duraderos",
      "Fácil almacenamiento",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },

  // Productos de Diseño Interior
  {
    id: "diseno-1",
    name: "Vinilo Decorativo Pared",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Vinilo decorativo para pared con diseño moderno y elegante. Fácil de instalar y remover sin dañar la superficie, ideal para renovar espacios con estilo.",
    shortDescription: "Vinilo decorativo moderno para renovar paredes.",
    price: 1500,
    originalPrice: 1800,
    discountPercentage: 17,
    image: "/placeholder.svg?height=500&width=500&text=Vinilo+Decorativo",
    specifications: [
      { name: "Dimensiones", value: "150x80cm" },
      { name: "Material", value: "Vinilo adhesivo" },
      { name: "Diseño", value: "Geométrico moderno" },
      { name: "Color", value: "Negro y gris" },
      { name: "Aplicación", value: "Interior" },
    ],
    features: [
      "Fácil instalación sin burbujas",
      "Removible sin residuos",
      "Resistente a la humedad",
      "No daña la pintura",
      "Diseño exclusivo",
    ],
    stock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "diseno-2",
    name: "Piso Vinílico Tipo Madera",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Piso vinílico con apariencia de madera natural en sistema click. Resistente al agua y al desgaste, ideal para renovar cualquier ambiente con elegancia y practicidad.",
    shortDescription: "Piso vinílico resistente con apariencia de madera natural.",
    price: 2800,
    image: "/placeholder.svg?height=500&width=500&text=Piso+Vinílico",
    specifications: [
      { name: "Marca", value: "Tarkett" },
      { name: "Dimensiones", value: "122x18cm" },
      { name: "Espesor", value: "4mm" },
      { name: "Sistema", value: "Click" },
      { name: "Rendimiento", value: "2.2m² por caja" },
    ],
    features: [
      "100% resistente al agua",
      "Instalación sin pegamento",
      "Textura realista de madera",
      "Aislamiento acústico",
      "Fácil limpieza y mantenimiento",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "diseno-3",
    name: "Papel Tapiz Texturizado",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Papel tapiz texturizado de alta calidad con diseño elegante. Resistente a la humedad y fácil de instalar, transforma cualquier espacio con su acabado premium.",
    shortDescription: "Papel tapiz texturizado para paredes con diseño elegante.",
    price: 2200,
    originalPrice: 2600,
    discountPercentage: 15,
    image: "/placeholder.svg?height=500&width=500&text=Papel+Tapiz",
    specifications: [
      { name: "Marca", value: "Graham & Brown" },
      { name: "Dimensiones", value: "10m x 53cm" },
      { name: "Material", value: "Vinilo sobre papel" },
      { name: "Patrón", value: "Damasco" },
      { name: "Color", value: "Beige y dorado" },
    ],
    features: [
      "Textura en relieve",
      "Resistente a la humedad",
      "Lavable",
      "Fácil instalación",
      "Elegante acabado metalizado",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "diseno-4",
    name: "Revestimiento 3D para Paredes",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Paneles de revestimiento 3D para paredes con diseño geométrico. Fáciles de instalar y pintar, crean efectos visuales impresionantes y mejoran la acústica del ambiente.",
    shortDescription: "Paneles 3D decorativos para paredes con efecto visual.",
    price: 3500,
    image: "/placeholder.svg?height=500&width=500&text=Revestimiento+3D",
    specifications: [
      { name: "Material", value: "PVC ecológico" },
      { name: "Dimensiones", value: "50x50cm" },
      { name: "Paquete", value: "12 paneles (3m²)" },
      { name: "Espesor", value: "15mm" },
      { name: "Peso", value: "350g por panel" },
    ],
    features: [
      "Efecto tridimensional",
      "Mejora la acústica",
      "Fácil instalación con adhesivo",
      "Pintable con cualquier color",
      "Resistente a golpes y humedad",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "diseno-5",
    name: "Alfombra Moderna Geométrica",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Alfombra moderna con diseño geométrico en colores neutros. Suave al tacto y resistente al desgaste, añade estilo y confort a cualquier ambiente del hogar.",
    shortDescription: "Alfombra moderna con diseño geométrico y colores neutros.",
    price: 4800,
    originalPrice: 5600,
    discountPercentage: 14,
    image: "/placeholder.svg?height=500&width=500&text=Alfombra+Moderna",
    specifications: [
      { name: "Dimensiones", value: "200x150cm" },
      { name: "Material", value: "Polipropileno de alta densidad" },
      { name: "Altura pelo", value: "12mm" },
      { name: "Diseño", value: "Geométrico" },
      { name: "Colores", value: "Gris, beige y negro" },
    ],
    features: ["Suave al tacto", "Resistente a manchas", "Antideslizante", "Fácil limpieza", "No destiñe"],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "diseno-6",
    name: "Cortina Blackout Térmica",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Cortina blackout térmica que bloquea la luz y aísla la temperatura. Elegante y funcional, mejora la eficiencia energética mientras añade estilo a cualquier habitación.",
    shortDescription: "Cortina blackout que bloquea luz y aísla temperatura.",
    price: 2900,
    image: "/placeholder.svg?height=500&width=500&text=Cortina+Blackout",
    specifications: [
      { name: "Dimensiones", value: "140x230cm" },
      { name: "Material", value: "Poliéster triple capa" },
      { name: "Color", value: "Gris oscuro" },
      { name: "Bloqueo luz", value: "99%" },
      { name: "Ojales", value: "8 metálicos" },
    ],
    features: [
      "Triple capa aislante",
      "Bloqueo total de luz",
      "Ahorro energético",
      "Reducción de ruido",
      "Lavable a máquina",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "diseno-7",
    name: "Espejo Decorativo Redondo",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Espejo decorativo redondo con marco metálico dorado. Elegante y moderno, añade luminosidad y amplitud visual a cualquier espacio del hogar u oficina.",
    shortDescription: "Espejo decorativo redondo con marco metálico dorado.",
    price: 3200,
    originalPrice: 3800,
    discountPercentage: 16,
    image: "/placeholder.svg?height=500&width=500&text=Espejo+Decorativo",
    specifications: [
      { name: "Diámetro", value: "80cm" },
      { name: "Marco", value: "Metal dorado" },
      { name: "Espesor vidrio", value: "5mm" },
      { name: "Peso", value: "4.5kg" },
      { name: "Instalación", value: "Horizontal o vertical" },
    ],
    features: [
      "Diseño minimalista elegante",
      "Marco metálico resistente",
      "Incluye kit de instalación",
      "Vidrio de alta calidad sin distorsión",
      "Acabado dorado cepillado",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "diseno-8",
    name: "Lámpara Colgante Moderna",
    category: "Diseño Interior",
    categoryId: "diseno",
    description:
      "Lámpara colgante moderna con diseño geométrico en metal negro. Perfecta para iluminar comedores, salas o islas de cocina con un toque contemporáneo y elegante.",
    shortDescription: "Lámpara colgante con diseño geométrico contemporáneo.",
    price: 4500,
    image: "/placeholder.svg?height=500&width=500&text=Lámpara+Colgante",
    specifications: [
      { name: "Material", value: "Metal y vidrio" },
      { name: "Color", value: "Negro mate" },
      { name: "Dimensiones", value: "45cm diámetro x 35cm alto" },
      { name: "Bombilla", value: "E27 (no incluida)" },
      { name: "Longitud cable", value: "Ajustable hasta 120cm" },
    ],
    features: [
      "Diseño geométrico moderno",
      "Cable ajustable en altura",
      "Compatible con bombillas LED",
      "Fácil instalación",
      "Ideal para espacios contemporáneos",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },

  // Productos de Electrodomésticos
  {
    id: "electrodomesticos-1",
    name: "Heladera No Frost 400L",
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Heladera no frost de 400 litros con freezer superior. Eficiente energéticamente, con múltiples compartimentos y tecnología de enfriamiento uniforme sin escarcha.",
    shortDescription: "Heladera no frost con freezer y tecnología de ahorro energético.",
    price: 85000,
    originalPrice: 98000,
    discountPercentage: 13,
    image: "/placeholder.svg?height=500&width=500&text=Heladera+No+Frost",
    specifications: [
      { name: "Marca", value: "Samsung" },
      { name: "Capacidad", value: "400L" },
      { name: "Eficiencia energética", value: "A++" },
      { name: "Dimensiones", value: "70x180x65cm" },
      { name: "Color", value: "Acero inoxidable" },
    ],
    features: [
      "Tecnología No Frost",
      "Compartimentos ajustables",
      "Control digital de temperatura",
      "Alarma de puerta abierta",
      "Iluminación LED interior",
    ],
    stock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "electrodomesticos-2",
    name: "Lavarropas Automático 8kg",
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Lavarropas automático de carga frontal con capacidad para 8kg. Múltiples programas de lavado, eficiente energéticamente y con tecnología de lavado inteligente.",
    shortDescription: "Lavarropas automático con múltiples programas y eficiencia energética.",
    price: 65000,
    image: "/placeholder.svg?height=500&width=500&text=Lavarropas+Automático",
    specifications: [
      { name: "Marca", value: "LG" },
      { name: "Capacidad", value: "8kg" },
      { name: "Velocidad centrifugado", value: "1200rpm" },
      { name: "Eficiencia energética", value: "A+++" },
      { name: "Programas", value: "14" },
    ],
    features: [
      "Tecnología Inverter",
      "Programa rápido 30 minutos",
      "Sistema anti-vibración",
      "Display digital",
      "Tambor de acero inoxidable",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "electrodomesticos-3",
    name: "Microondas Digital 28L",
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Microondas digital de 28 litros con grill y múltiples funciones. Potente y versátil, con programas automáticos y descongelado rápido para mayor comodidad.",
    shortDescription: "Microondas digital con grill y programas automáticos.",
    price: 22000,
    originalPrice: 25800,
    discountPercentage: 15,
    image: "/placeholder.svg?height=500&width=500&text=Microondas+Digital",
    specifications: [
      { name: "Marca", value: "Whirlpool" },
      { name: "Capacidad", value: "28L" },
      { name: "Potencia", value: "900W" },
      { name: "Grill", value: "1000W" },
      { name: "Dimensiones", value: "52x32x45cm" },
    ],
    features: [
      "10 niveles de potencia",
      "Grill de cuarzo",
      "8 programas automáticos",
      "Descongelado por peso",
      "Bloqueo para niños",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "electrodomesticos-4",
    name: 'Smart TV 4K 55"',
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Smart TV 4K de 55 pulgadas con sistema operativo Android TV. Imagen nítida, sonido envolvente y acceso a todas las aplicaciones de streaming para una experiencia completa.",
    shortDescription: "Smart TV 4K con Android TV y excelente calidad de imagen.",
    price: 78000,
    image: "/placeholder.svg?height=500&width=500&text=Smart+TV+4K",
    specifications: [
      { name: "Marca", value: "Sony" },
      { name: "Tamaño", value: '55"' },
      { name: "Resolución", value: "4K UHD" },
      { name: "Sistema operativo", value: "Android TV" },
      { name: "Conexiones", value: "4 HDMI, 3 USB, Wi-Fi" },
    ],
    features: [
      "Procesador X1 4K HDR",
      "Dolby Vision y Atmos",
      "Google Assistant integrado",
      "Chromecast built-in",
      "Bluetooth para audio",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "electrodomesticos-5",
    name: "Aspiradora Robot Inteligente",
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Aspiradora robot inteligente con mapeo láser y control por app. Programa la limpieza, establece zonas prohibidas y controla remotamente para mantener tu hogar impecable.",
    shortDescription: "Aspiradora robot con mapeo láser y control por aplicación.",
    price: 45000,
    originalPrice: 52000,
    discountPercentage: 13,
    image: "/placeholder.svg?height=500&width=500&text=Aspiradora+Robot",
    specifications: [
      { name: "Marca", value: "Xiaomi" },
      { name: "Potencia succión", value: "2500Pa" },
      { name: "Batería", value: "5200mAh" },
      { name: "Autonomía", value: "150 minutos" },
      { name: "Capacidad depósito", value: "480ml" },
    ],
    features: [
      "Mapeo láser LiDAR",
      "Control por app WiFi",
      "Múltiples modos de limpieza",
      "Sensores anti-caída",
      "Programación horaria",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "electrodomesticos-6",
    name: "Aire Acondicionado Split Inverter",
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Aire acondicionado split inverter frío/calor de 12000 BTU. Eficiente energéticamente, silencioso y con funciones inteligentes para mayor confort y ahorro.",
    shortDescription: "Aire acondicionado inverter frío/calor eficiente y silencioso.",
    price: 58000,
    image: "/placeholder.svg?height=500&width=500&text=Aire+Acondicionado",
    specifications: [
      { name: "Marca", value: "Carrier" },
      { name: "Capacidad", value: "12000 BTU" },
      { name: "Tecnología", value: "Inverter" },
      { name: "Eficiencia energética", value: "A+++" },
      { name: "Funciones", value: "Frío/Calor" },
    ],
    features: [
      "Tecnología Inverter de ahorro",
      "Modo Sleep para uso nocturno",
      "Filtro antibacteriano",
      "Control remoto con display",
      "Función Follow Me",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "electrodomesticos-7",
    name: "Licuadora de Vaso 1000W",
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Licuadora de vaso con 1000W de potencia y cuchillas de acero inoxidable. Perfecta para preparar batidos, sopas, salsas y triturar hielo con sus múltiples velocidades.",
    shortDescription: "Licuadora potente con múltiples velocidades y vaso de vidrio.",
    price: 12000,
    originalPrice: 14500,
    discountPercentage: 17,
    image: "/placeholder.svg?height=500&width=500&text=Licuadora+Vaso",
    specifications: [
      { name: "Marca", value: "Oster" },
      { name: "Potencia", value: "1000W" },
      { name: "Capacidad", value: "1.5L" },
      { name: "Material vaso", value: "Vidrio templado" },
      { name: "Velocidades", value: "5 + pulso" },
    ],
    features: [
      "Cuchillas de acero inoxidable",
      "Función para triturar hielo",
      "Vaso resistente a impactos",
      "Sistema de seguridad",
      "Piezas aptas para lavavajillas",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "electrodomesticos-8",
    name: "Cafetera Automática Espresso",
    category: "Electrodomésticos",
    categoryId: "electrodomesticos",
    description:
      "Cafetera automática para espresso y cappuccino con molinillo integrado. Prepara café recién molido con solo presionar un botón, con sistema de espuma de leche para bebidas cremosas.",
    shortDescription: "Cafetera automática con molinillo y sistema para espuma de leche.",
    price: 35000,
    image: "/placeholder.svg?height=500&width=500&text=Cafetera+Automática",
    specifications: [
      { name: "Marca", value: "Philips" },
      { name: "Potencia", value: "1500W" },
      { name: "Presión", value: "15 bar" },
      { name: "Capacidad agua", value: "1.8L" },
      { name: "Capacidad granos", value: "250g" },
    ],
    features: [
      "Molinillo cerámico integrado",
      "Panel táctil intuitivo",
      "Sistema de espuma de leche",
      "Ajuste de intensidad y temperatura",
      "Función de autolimpieza",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  // Productos de Ferretería
  {
    id: "ferreteria-1",
    name: "Set de Destornilladores Profesionales",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Set de destornilladores profesionales con 10 piezas de diferentes tamaños y tipos. Incluye destornilladores Phillips, planos y Torx con mangos ergonómicos y puntas magnéticas para facilitar el trabajo.",
    shortDescription: "Set de destornilladores profesionales de 10 piezas con diferentes tipos y tamaños.",
    price: 1800,
    originalPrice: 2200,
    discountPercentage: 18,
    image: "/placeholder.svg?height=500&width=500&text=Set+Destornilladores",
    specifications: [
      { name: "Marca", value: "Stanley" },
      { name: "Piezas", value: "10" },
      { name: "Material", value: "Acero cromo-vanadio" },
      { name: "Incluye", value: "Soporte organizador" },
      { name: "Tipos", value: "Phillips, planos y Torx" },
    ],
    features: [
      "Puntas magnéticas para mejor agarre",
      "Mangos ergonómicos con código de colores",
      "Resistentes a la corrosión",
      "Ideal para usos profesionales y domésticos",
      "Incluye organizador para fácil almacenamiento",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "ferreteria-2",
    name: "Caja de Clavos Surtidos",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Caja de clavos surtidos con diversos tamaños para múltiples aplicaciones. Incluye clavos para madera, cartón-yeso y acabados finos, fabricados en acero de alta resistencia.",
    shortDescription: "Caja con surtido de clavos en diferentes tamaños y aplicaciones.",
    price: 650,
    image: "/placeholder.svg?height=500&width=500&text=Clavos+Surtidos",
    specifications: [
      { name: "Marca", value: "Tramontina" },
      { name: "Cantidad", value: "500 unidades" },
      { name: "Material", value: "Acero" },
      { name: "Tamaños", value: '1/2" a 3"' },
      { name: "Tipos", value: "Comunes, sin cabeza, para acabados" },
    ],
    features: [
      "Diversos tamaños para diferentes usos",
      "Acero de alta resistencia",
      "Caja organizadora con compartimentos",
      "Ideal para construcción y carpintería",
      "Incluye guía de usos y aplicaciones",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "ferreteria-3",
    name: "Cerradura de Seguridad",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Cerradura de seguridad para puertas exteriores con sistema anti-bumping y anti-taladro. Fabricada en acero reforzado con acabado cromado, ofrece máxima protección para su hogar o negocio.",
    shortDescription: "Cerradura de alta seguridad para puertas exteriores.",
    price: 3500,
    originalPrice: 4100,
    discountPercentage: 15,
    image: "/placeholder.svg?height=500&width=500&text=Cerradura+Seguridad",
    specifications: [
      { name: "Marca", value: "Yale" },
      { name: "Material", value: "Acero reforzado" },
      { name: "Acabado", value: "Cromado" },
      { name: "Llaves", value: "5 llaves de seguridad" },
      { name: "Instalación", value: "Para puertas de 35-45mm" },
    ],
    features: [
      "Sistema anti-bumping y anti-taladro",
      "Cilindro europeo de alta seguridad",
      "Llaves de difícil duplicación",
      "Certificación de seguridad grado 3",
      "Incluye plantilla de instalación",
    ],
    stock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "ferreteria-4",
    name: "Juego de Llaves Combinadas",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Juego de llaves combinadas de 12 piezas en medidas métricas. Fabricadas en acero cromo-vanadio con acabado cromado para mayor durabilidad y resistencia a la corrosión.",
    shortDescription: "Juego de 12 llaves combinadas en medidas métricas.",
    price: 2200,
    image: "/placeholder.svg?height=500&width=500&text=Llaves+Combinadas",
    specifications: [
      { name: "Marca", value: "Bahco" },
      { name: "Piezas", value: "12" },
      { name: "Medidas", value: "8-19mm" },
      { name: "Material", value: "Acero cromo-vanadio" },
      { name: "Acabado", value: "Cromado pulido" },
    ],
    features: [
      "Perfil DIN pulido en ambos extremos",
      "Sistema DynamicDrive en extremo de boca",
      "Ángulo de 15° en extremo de anillo",
      "Acero templado para mayor resistencia",
      "Incluye estuche para organización",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "ferreteria-5",
    name: "Candado de Alta Seguridad",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Candado de alta seguridad con cuerpo de acero endurecido y arco protegido. Resistente a cortes, golpes y manipulaciones, ideal para proteger áreas exteriores, depósitos y negocios.",
    shortDescription: "Candado de alta seguridad con cuerpo y arco de acero endurecido.",
    price: 1800,
    originalPrice: 2100,
    discountPercentage: 14,
    image: "/placeholder.svg?height=500&width=500&text=Candado+Seguridad",
    specifications: [
      { name: "Marca", value: "Master Lock" },
      { name: "Ancho", value: "60mm" },
      { name: "Material", value: "Acero endurecido" },
      { name: "Llaves", value: "3 llaves" },
      { name: "Protección", value: "Resistente al agua y corrosión" },
    ],
    features: [
      "Doble sistema de bolas de bloqueo",
      "Arco protegido contra cortes",
      "Cilindro resistente a ganzúas",
      "Cubierta de protección contra el polvo",
      "Ideal para exteriores",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "ferreteria-6",
    name: "Cinta Métrica Profesional 8m",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Cinta métrica profesional de 8 metros con carcasa ergonómica resistente a golpes. Cinta de acero recubierta con nylon para mayor durabilidad, con bloqueo automático y gancho magnético.",
    shortDescription: "Cinta métrica profesional de 8m con carcasa resistente a golpes.",
    price: 950,
    image: "/placeholder.svg?height=500&width=500&text=Cinta+Métrica",
    specifications: [
      { name: "Marca", value: "Stanley" },
      { name: "Longitud", value: "8m / 26ft" },
      { name: "Ancho cinta", value: "25mm" },
      { name: "Material carcasa", value: "ABS con sobremolde" },
      { name: "Material cinta", value: "Acero recubierto" },
    ],
    features: [
      "Bloqueo automático de cinta",
      "Gancho magnético para trabajos individuales",
      "Carcasa ergonómica con agarre antideslizante",
      "Escala en sistema métrico e imperial",
      "Clip para cinturón",
    ],
    stock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "ferreteria-7",
    name: "Kit de Brocas para Madera y Metal",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Kit completo de brocas para madera y metal con 30 piezas de diferentes diámetros. Incluye brocas para metal HSS, brocas para madera, piedra y concreto, en un estuche organizador.",
    shortDescription: "Kit de 30 brocas para diferentes materiales y aplicaciones.",
    price: 1600,
    originalPrice: 1900,
    discountPercentage: 16,
    image: "/placeholder.svg?height=500&width=500&text=Kit+Brocas",
    specifications: [
      { name: "Marca", value: "Bosch" },
      { name: "Piezas", value: "30" },
      { name: "Diámetros", value: "1-10mm" },
      { name: "Tipos", value: "HSS, madera, mampostería" },
      { name: "Incluye", value: "Estuche organizador" },
    ],
    features: [
      "Brocas HSS para metal de precisión",
      "Brocas para madera con punta centradora",
      "Brocas para mampostería con punta de carburo",
      "Estuche organizador con identificación de tamaños",
      "Compatible con todos los taladros estándar",
    ],
    stock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "ferreteria-8",
    name: "Juego de Alicates Profesionales",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Juego de alicates profesionales de 4 piezas incluyendo alicate universal, de punta, de corte y regulable. Fabricados con acero al cromo-vanadio con mangos ergonómicos bi-material.",
    shortDescription: "Juego de 4 alicates profesionales para diferentes aplicaciones.",
    price: 2400,
    image: "/placeholder.svg?height=500&width=500&text=Alicates+Profesionales",
    specifications: [
      { name: "Marca", value: "Knipex" },
      { name: "Piezas", value: "4" },
      { name: "Material", value: "Acero cromo-vanadio" },
      { name: "Mangos", value: "Bi-material antideslizante" },
      { name: "Incluye", value: "Estuche de transporte" },
    ],
    features: [
      "Alicate universal de 180mm",
      "Alicate de punta larga de 160mm",
      "Alicate de corte diagonal de 160mm",
      "Alicate regulable de 250mm",
      "Aislamiento para trabajos hasta 1000V",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "ferreteria-9",
    name: "Nivel Láser Autonivelante",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Nivel láser autonivelante con líneas horizontal y vertical. Proyecta líneas cruzadas precisas a 90°, ideal para instalación de muebles, cuadros, estanterías y trabajos de construcción.",
    shortDescription: "Nivel láser autonivelante con líneas horizontal y vertical.",
    price: 3900,
    originalPrice: 4500,
    discountPercentage: 13,
    image: "/placeholder.svg?height=500&width=500&text=Nivel+Láser",
    specifications: [
      { name: "Marca", value: "Bosch" },
      { name: "Alcance", value: "15m" },
      { name: "Precisión", value: "±0.3mm/m" },
      { name: "Autonivelación", value: "±4°" },
      { name: "Incluye", value: "Soporte y estuche" },
    ],
    features: [
      "Proyección de líneas horizontales y verticales",
      "Autonivelación con indicador",
      "Bloqueo de péndulo para transporte",
      "Base giratoria 360°",
      "Resistente a polvo y salpicaduras",
    ],
    stock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "ferreteria-10",
    name: "Bisagras Invisibles para Muebles",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Set de bisagras invisibles para muebles con sistema de cierre suave. Perfectas para puertas de armarios y alacenas, ofrecen un acabado limpio y profesional con cierre amortiguado.",
    shortDescription: "Set de bisagras invisibles con sistema de cierre suave.",
    price: 850,
    image: "/placeholder.svg?height=500&width=500&text=Bisagras+Invisibles",
    specifications: [
      { name: "Marca", value: "Häfele" },
      { name: "Cantidad", value: "Pack de 4 unidades" },
      { name: "Material", value: "Acero niquelado" },
      { name: "Apertura", value: "110°" },
      { name: "Para puertas de", value: "16-22mm de espesor" },
    ],
    features: [
      "Sistema de cierre suave incorporado",
      "Ajuste en 3 direcciones",
      "Fácil instalación con plantilla",
      "Acabado niquelado duradero",
      "Incluye tornillos de montaje",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "ferreteria-11",
    name: "Sellador de Silicona Transparente",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Sellador de silicona transparente multiuso, resistente al agua y moho. Ideal para sellar juntas en baños, cocinas, ventanas y materiales de construcción con excelente adherencia.",
    shortDescription: "Sellador de silicona transparente resistente al agua y moho.",
    price: 550,
    originalPrice: 650,
    discountPercentage: 15,
    image: "/placeholder.svg?height=500&width=500&text=Silicona+Transparente",
    specifications: [
      { name: "Marca", value: "Sikasil" },
      { name: "Contenido", value: "280ml" },
      { name: "Color", value: "Transparente" },
      { name: "Secado", value: "2-3mm/24h" },
      { name: "Temperatura de aplicación", value: "5°C a 40°C" },
    ],
    features: [
      "100% resistente al agua",
      "Antihongos y antimoho",
      "Gran elasticidad y durabilidad",
      "No amarillea con el tiempo",
      "Compatible con múltiples superficies",
    ],
    stock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "ferreteria-12",
    name: "Clavadora Neumática para Acabados",
    category: "Ferretería",
    categoryId: "ferreteria",
    description:
      "Clavadora neumática para trabajos de acabado, molduras y carpintería fina. Ligera y ergonómica, permite trabajar cómodamente durante horas sin fatiga.",
    shortDescription: "Clavadora neumática para trabajos de acabado y carpintería fina.",
    price: 4800,
    image: "/placeholder.svg?height=500&width=500&text=Clavadora+Neumática",
    specifications: [
      { name: "Marca", value: "DeWalt" },
      { name: "Tamaño clavos", value: "15-50mm" },
      { name: "Presión de trabajo", value: "4.8-8.3 bar" },
      { name: "Capacidad cargador", value: "100 clavos" },
      { name: "Peso", value: "1.6kg" },
    ],
    features: [
      "Diseño compacto y ligero",
      "Punta de no marcado para acabados finos",
      "Ajuste de profundidad sin herramientas",
      "Escape de aire rotativo 360°",
      "Incluye maletín y accesorios de mantenimiento",
    ],
    stock: true,
    isNew: true,
    isFeatured: true,
  },
]

// Proveedor del contexto
export function ProductProvider({ children }: { children: ReactNode }) {
  // Estado para almacenar todos los productos (predefinidos + agregados por el usuario)
  const [products, setProducts] = useState<Product[]>(PREDEFINED_PRODUCTS)

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = localStorage.getItem("admin-products")
      if (storedProducts) {
        try {
          const adminProducts = JSON.parse(storedProducts) as Product[]
          // Combinar productos predefinidos con los del admin, evitando duplicados por ID
          setProducts((prevProducts) => {
            const existingIds = new Set(prevProducts.map((p) => p.id))
            const newProducts = adminProducts.filter((p) => !existingIds.has(p.id))
            return [...prevProducts, ...newProducts]
          })
        } catch (error) {
          console.error("Error al cargar productos del admin:", error)
        }
      }
    }
  }, [])

  // Función para buscar un producto por ID
  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id)
  }

  // Función para buscar productos por categoría
  const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter((product) => product.categoryId === categoryId)
  }

  // Función para buscar productos relacionados (misma categoría, distinto producto)
  const getRelatedProducts = (productId: string, limit = 4): Product[] => {
    const product = getProductById(productId)
    if (!product) return []

    return products.filter((p) => p.categoryId === product.categoryId && p.id !== productId).slice(0, limit)
  }

  // Función para buscar productos destacados
  const getFeaturedProducts = (limit = 6): Product[] => {
    return products.filter((product) => product.isFeatured).slice(0, limit)
  }

  // Función para buscar productos en oferta
  const getDiscountedProducts = (limit = 6): Product[] => {
    return products.filter((product) => product.discountPercentage !== undefined).slice(0, limit)
  }

  // Función para buscar productos nuevos
  const getNewProducts = (limit = 6): Product[] => {
    return products.filter((product) => product.isNew).slice(0, limit)
  }

  // Función para agregar un nuevo producto
  const addProduct = (product: Product) => {
    setProducts((prevProducts) => {
      // Verificar si ya existe un producto con el mismo ID
      const exists = prevProducts.some((p) => p.id === product.id)
      if (exists) {
        // Actualizar el producto existente
        return prevProducts.map((p) => (p.id === product.id ? product : p))
      } else {
        // Agregar nuevo producto
        return [...prevProducts, product]
      }
    })

    // Guardar en localStorage
    if (typeof window !== "undefined") {
      try {
        const storedProducts = localStorage.getItem("admin-products")
        const adminProducts = storedProducts ? (JSON.parse(storedProducts) as Product[]) : []

        // Actualizar o agregar el producto
        const exists = adminProducts.some((p) => p.id === product.id)
        const updatedAdminProducts = exists
          ? adminProducts.map((p) => (p.id === product.id ? product : p))
          : [...adminProducts, product]

        localStorage.setItem("admin-products", JSON.stringify(updatedAdminProducts))
      } catch (error) {
        console.error("Error al guardar producto en localStorage:", error)
      }
    }
  }

  // Función para eliminar un producto
  const removeProduct = (id: string) => {
    // Solo permitir eliminar productos agregados por el admin (no los predefinidos)
    const isPredefined = PREDEFINED_PRODUCTS.some((p) => p.id === id)
    if (isPredefined) {
      console.warn("No se puede eliminar un producto predefinido")
      return
    }

    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id))

    // Eliminar de localStorage
    if (typeof window !== "undefined") {
      try {
        const storedProducts = localStorage.getItem("admin-products")
        if (storedProducts) {
          const adminProducts = JSON.parse(storedProducts) as Product[]
          const updatedAdminProducts = adminProducts.filter((p) => p.id !== id)
          localStorage.setItem("admin-products", JSON.stringify(updatedAdminProducts))
        }
      } catch (error) {
        console.error("Error al eliminar producto de localStorage:", error)
      }
    }
  }

  // Valor del contexto
  const value = {
    products,
    categories: CATEGORIES,
    getProductById,
    getProductsByCategory,
    getRelatedProducts,
    getFeaturedProducts,
    getDiscountedProducts,
    getNewProducts,
    addProduct,
    removeProduct,
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

// Hook para usar el contexto
export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider")
  }
  return context
}

