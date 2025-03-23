"use client"

import type { ReactNode } from "react"
import { Parallax } from "react-scroll-parallax"
import { motion } from "framer-motion"

interface ParallaxHeroProps {
  bgImage: string
  children: ReactNode
  overlayOpacity?: number
}

export default function ParallaxHero({ bgImage, children, overlayOpacity = 0.5 }: ParallaxHeroProps) {
  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center">
      <Parallax className="absolute inset-0 z-0" speed={-20}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat h-[120%] w-full"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </Parallax>

      <div className="absolute inset-0 z-10 bg-gray-900" style={{ opacity: overlayOpacity }} />

      <motion.div
        className="relative z-20 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

