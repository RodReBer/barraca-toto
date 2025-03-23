import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ProductProvider } from "@/contexts/product-context"
import { Toaster } from "@/components/ui/toaster"
// Importar el ParallaxProviderWrapper
import ParallaxProviderWrapper from "@/components/parallax-provider-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "El Toto - Barraca y Ferretería",
  description:
    "Todo lo que necesitas para construcción, diseño y hogar en un solo lugar. Calidad y variedad en Toledo, Uruguay.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Modificar el return para incluir el ParallaxProviderWrapper
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ProductProvider>
            <ParallaxProviderWrapper>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster />
            </ParallaxProviderWrapper>
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'