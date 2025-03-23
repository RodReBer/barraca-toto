"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Minus, Save } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useProducts, type Product } from "@/contexts/product-context"

// Tipo para el producto
interface ProductFormData {
  id: string
  name: string
  category: string
  categoryId: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  image: string
  specifications: { name: string; value: string }[]
  features: string[]
  stock: boolean
  isNew?: boolean
  isFeatured?: boolean
}

export default function NuevoProductoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addProduct, categories } = useProducts()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar autenticación
  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin-auth")
    if (authStatus !== "true") {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  // Estado inicial del formulario
  const [formData, setFormData] = useState<ProductFormData>({
    id: "",
    name: "",
    category: "",
    categoryId: "",
    description: "",
    shortDescription: "",
    price: 0,
    image: "",
    specifications: [{ name: "", value: "" }],
    features: [""],
    stock: true,
    isNew: false,
    isFeatured: false,
  })

  // Estado para controlar si hay descuento
  const [hasDiscount, setHasDiscount] = useState(false)

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "originalPrice" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  // Manejar cambio de categoría
  const handleCategoryChange = (value: string) => {
    const category = categories.find((cat) => cat.id === value)
    if (category) {
      setFormData((prev) => ({
        ...prev,
        categoryId: value,
        category: category.name,
      }))
    }
  }

  // Manejar cambios en especificaciones
  const handleSpecChange = (index: number, field: "name" | "value", value: string) => {
    const newSpecs = [...formData.specifications]
    newSpecs[index][field] = value
    setFormData((prev) => ({
      ...prev,
      specifications: newSpecs,
    }))
  }

  // Agregar nueva especificación
  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { name: "", value: "" }],
    }))
  }

  // Eliminar especificación
  const removeSpecification = (index: number) => {
    if (formData.specifications.length > 1) {
      const newSpecs = [...formData.specifications]
      newSpecs.splice(index, 1)
      setFormData((prev) => ({
        ...prev,
        specifications: newSpecs,
      }))
    }
  }

  // Manejar cambios en características
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData((prev) => ({
      ...prev,
      features: newFeatures,
    }))
  }

  // Agregar nueva característica
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  // Eliminar característica
  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = [...formData.features]
      newFeatures.splice(index, 1)
      setFormData((prev) => ({
        ...prev,
        features: newFeatures,
      }))
    }
  }

  // Manejar cambio en descuento
  useEffect(() => {
    if (!hasDiscount) {
      setFormData((prev) => ({
        ...prev,
        originalPrice: undefined,
        discountPercentage: undefined,
      }))
    } else if (formData.price > 0 && (!formData.originalPrice || formData.originalPrice <= formData.price)) {
      // Sugerir un precio original 20% mayor
      const suggestedOriginalPrice = Math.round(formData.price * 1.2)
      const suggestedDiscount = Math.round(((suggestedOriginalPrice - formData.price) / suggestedOriginalPrice) * 100)

      setFormData((prev) => ({
        ...prev,
        originalPrice: suggestedOriginalPrice,
        discountPercentage: suggestedDiscount,
      }))
    }
  }, [hasDiscount, formData.price])

  // Calcular descuento cuando cambia el precio original
  useEffect(() => {
    if (hasDiscount && formData.originalPrice && formData.originalPrice > formData.price) {
      const discount = Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
      setFormData((prev) => ({
        ...prev,
        discountPercentage: discount,
      }))
    }
  }, [formData.originalPrice, formData.price, hasDiscount])

  // Generar ID único basado en la categoría y el nombre
  useEffect(() => {
    if (formData.categoryId && formData.name) {
      const timestamp = Date.now().toString().slice(-4)
      const nameSlug = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
        .slice(0, 20)
      const newId = `${formData.categoryId}-${nameSlug}-${timestamp}`
      setFormData((prev) => ({
        ...prev,
        id: newId,
      }))
    }
  }, [formData.categoryId, formData.name])

  // Generar URL de imagen placeholder si no se proporciona una
  useEffect(() => {
    if (!formData.image && formData.name) {
      const encodedName = encodeURIComponent(formData.name)
      setFormData((prev) => ({
        ...prev,
        image: `/placeholder.svg?height=500&width=500&text=${encodedName}`,
      }))
    }
  }, [formData.name, formData.image])

  // Guardar producto
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones básicas
    if (!formData.name || !formData.categoryId || !formData.description || formData.price <= 0) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    // Filtrar especificaciones y características vacías
    const cleanedFormData = {
      ...formData,
      specifications: formData.specifications.filter((spec) => spec.name.trim() !== "" && spec.value.trim() !== ""),
      features: formData.features.filter((feature) => feature.trim() !== ""),
    }

    // Guardar el producto usando el contexto
    try {
      // Agregar el producto al contexto
      addProduct(cleanedFormData as Product)

      toast({
        title: "Producto guardado",
        description: "El producto ha sido agregado correctamente y ya está disponible en el catálogo",
      })

      // Redirigir a la página de administración
      router.push("/admin")
    } catch (error) {
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar el producto. Intenta de nuevo.",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return null // No mostrar nada mientras verifica autenticación
  }

  return (
    <div className="container py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-800 mr-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al panel
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Agregar Nuevo Producto</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Taladro Percutor Profesional"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select value={formData.categoryId} onValueChange={handleCategoryChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Descripción Corta *</Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Breve descripción para mostrar en tarjetas de producto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Completa *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción detallada del producto"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (UYU) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.price || ""}
                  onChange={handleChange}
                  placeholder="Ej: 1500"
                  required
                />
              </div>
              <div className="space-y-2 flex items-center">
                <div className="flex items-center space-x-2 mt-8">
                  <Switch id="hasDiscount" checked={hasDiscount} onCheckedChange={setHasDiscount} />
                  <Label htmlFor="hasDiscount">Tiene descuento</Label>
                </div>
              </div>
              {hasDiscount && (
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Precio Original (UYU) *</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    min={formData.price > 0 ? formData.price + 1 : 1}
                    step="1"
                    value={formData.originalPrice || ""}
                    onChange={handleChange}
                    placeholder="Ej: 1800"
                    required={hasDiscount}
                  />
                  {formData.discountPercentage && (
                    <p className="text-sm text-gray-500">Descuento: {formData.discountPercentage}%</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de Imagen</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg (opcional)"
              />
              <p className="text-xs text-gray-500">
                Si no se proporciona, se generará una imagen de placeholder automáticamente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="stock"
                  checked={formData.stock}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, stock: checked }))}
                />
                <Label htmlFor="stock">En stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isNew"
                  checked={formData.isNew}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isNew: checked }))}
                />
                <Label htmlFor="isNew">Marcar como nuevo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isFeatured: checked }))}
                />
                <Label htmlFor="isFeatured">Destacar en inicio</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Especificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-2 flex-1">
                  <Input
                    placeholder="Nombre (ej: Marca)"
                    value={spec.name}
                    onChange={(e) => handleSpecChange(index, "name", e.target.value)}
                  />
                  <Input
                    placeholder="Valor (ej: Stanley)"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                  disabled={formData.specifications.length <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addSpecification} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Agregar Especificación
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Característica (ej: Resistente al agua)"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={formData.features.length <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addFeature} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Agregar Característica
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">
            <Save className="h-4 w-4 mr-2" /> Guardar Producto
          </Button>
        </div>
      </form>
    </div>
  )
}

