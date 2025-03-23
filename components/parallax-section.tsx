"use client"

import type { ReactNode } from "react"
import { Parallax } from "react-scroll-parallax"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  className?: string
  children: ReactNode
  bgImage?: string
  speed?: number
  overlayColor?: string
  overlayOpacity?: number
  direction?: "up" | "down"
}

export default function ParallaxSection({
  className,
  children,
  bgImage,
  speed = -10,
  overlayColor = "rgba(0, 0, 0, 0.6)",
  overlayOpacity = 0.6,
  direction = "up",
}: ParallaxSectionProps) {
  return (
    <div className={cn("relative overflow-hidden py-20", className)}>
      {bgImage && (
        <>
          <Parallax className="absolute inset-0 z-0" speed={speed}>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat h-[120%] w-full"
              style={{ backgroundImage: `url(${bgImage})` }}
            />
          </Parallax>

          <div className="absolute inset-0 z-10" style={{ backgroundColor: overlayColor, opacity: overlayOpacity }} />
        </>
      )}

      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: direction === "up" ? 40 : -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

