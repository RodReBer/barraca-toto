"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ScrollAnimation({ children, delay = 0, direction = "up" }: ScrollAnimationProps) {
  const getInitialY = () => {
    switch (direction) {
      case "up":
        return 40
      case "down":
        return -40
      default:
        return 0
    }
  }

  const getInitialX = () => {
    switch (direction) {
      case "left":
        return 40
      case "right":
        return -40
      default:
        return 0
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  )
}

