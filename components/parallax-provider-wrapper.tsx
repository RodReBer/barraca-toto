"use client"

import type { ReactNode } from "react"
import { ParallaxProvider } from "react-scroll-parallax"

interface ParallaxProviderWrapperProps {
  children: ReactNode
}

export default function ParallaxProviderWrapper({ children }: ParallaxProviderWrapperProps) {
  return <ParallaxProvider>{children}</ParallaxProvider>
}

