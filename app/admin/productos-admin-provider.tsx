"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useProducts, type Product } from "@/contexts/product-context"

interface AdminProductsContextType {
  adminProducts: Product[]
  addProduct: (product: Product) => void
  removeProduct: (id: string) => void
  getAdminProductById: (id: string) => Product | undefined
}

const AdminProductsContext = createContext<AdminProductsContextType | undefined>(undefined)

export function AdminProductsProvider({ children }: { children: ReactNode }) {
  const [adminProducts, setAdminProducts] = useState<Product[]>([])
  const { products } = useProducts()

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const storedProducts = localStorage.getItem("admin-products")
    if (storedProducts) {
      setAdminProducts(JSON.parse(storedProducts))
    }
  }, [])

  // Agregar un nuevo producto
  const addProduct = (product: Product) => {
    setAdminProducts((prev) => {
      const newProducts = [...prev, product]
      localStorage.setItem("admin-products", JSON.stringify(newProducts))
      return newProducts
    })
  }

  // Eliminar un producto
  const removeProduct = (id: string) => {
    setAdminProducts((prev) => {
      const newProducts = prev.filter((p) => p.id !== id)
      localStorage.setItem("admin-products", JSON.stringify(newProducts))
      return newProducts
    })
  }

  // Obtener un producto por ID
  const getAdminProductById = (id: string) => {
    return adminProducts.find((p) => p.id === id) || products.find((p) => p.id === id)
  }

  return (
    <AdminProductsContext.Provider value={{ adminProducts, addProduct, removeProduct, getAdminProductById }}>
      {children}
    </AdminProductsContext.Provider>
  )
}

export function useAdminProducts() {
  const context = useContext(AdminProductsContext)
  if (context === undefined) {
    throw new Error("useAdminProducts must be used within an AdminProductsProvider")
  }
  return context
}

