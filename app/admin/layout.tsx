import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel de Administración - El Toto",
  description: "Panel de administración para Barraca y Ferretería El Toto",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}

