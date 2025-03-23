"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Eye, EyeOff, Plus, Trash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useProducts } from "@/contexts/product-context"

// Contraseña para acceder al panel de administración
const ADMIN_PASSWORD = "eltoto2025"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  // Verificar si ya está autenticado (usando sessionStorage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin-auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoading(true)
    setError("")

    // Simular una pequeña demora para dar sensación de procesamiento
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin-auth", "true")
        setIsAuthenticated(true)
        toast({
          title: "Acceso concedido",
          description: "Bienvenido al panel de administración",
        })
      } else {
        setError("Contraseña incorrecta")
        toast({
          title: "Error de autenticación",
          description: "La contraseña ingresada es incorrecta",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 800)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
    setPassword("")
    toast({
      title: "Sesión cerrada",
      description: "Has salido del panel de administración",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Panel de Administración</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa la contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button
                className="w-full bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Verificando..." : "Acceder"}
              </Button>
              <div className="text-center text-sm">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Volver al sitio principal
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mr-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver al sitio
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <Tabs defaultValue="productos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="productos">Gestión de Productos</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="productos" className="space-y-4">
          <div className="flex justify-end">
            <Button
              className="bg-yellow-400 text-gray-800 hover:bg-yellow-500"
              onClick={() => router.push("/admin/nuevo-producto")}
            >
              <Plus className="mr-2 h-4 w-4" /> Agregar Producto
            </Button>
          </div>

          <ProductList />
        </TabsContent>

        <TabsContent value="estadisticas">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500">
                Esta sección mostrará estadísticas de productos y ventas en una implementación completa.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProductList() {
  const { products, removeProduct } = useProducts()
  const { toast } = useToast()
  const [adminProducts, setAdminProducts] = useState<any[]>([])

  // Cargar productos agregados desde el admin
  useEffect(() => {
    // Obtener IDs de productos agregados desde el admin
    const storedProducts = localStorage.getItem("admin-products")
    if (storedProducts) {
      try {
        const adminProductsData = JSON.parse(storedProducts)
        const adminProductIds = new Set(adminProductsData.map((p: any) => p.id))

        // Filtrar productos que fueron agregados desde el admin
        const adminProductsList = products.filter((product) => adminProductIds.has(product.id))
        setAdminProducts(adminProductsList)
      } catch (error) {
        console.error("Error al cargar productos del admin:", error)
      }
    }
  }, [products])

  const handleDeleteProduct = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      removeProduct(id)
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente del catálogo",
      })
    }
  }

  if (adminProducts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No hay productos agregados desde el panel de administración.</p>
            <p className="text-sm text-gray-400">
              Los productos que agregues aquí se mostrarán automáticamente en el catálogo de la tienda.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Productos agregados: {adminProducts.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {product.image ? (
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-gray-400">Sin imagen</div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 truncate">{product.category}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">${product.price.toLocaleString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

