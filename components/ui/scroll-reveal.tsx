"use client"

import React, { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ScrollRevealProps {
  children: React.ReactNode
  /** Custom container className */
  containerClassName?: string
  /** Custom text className */
  textClassName?: string
  /** Enable blur animation effect */
  enableBlur?: boolean
  /** Base opacity when text is out of view */
  baseOpacity?: number
  /** Base rotation angle in degrees */
  baseRotation?: number
  /** Blur strength in pixels */
  blurStrength?: number
  /** Animation delay between words in seconds */
  staggerDelay?: number
  /** Viewport threshold for triggering animation */
  threshold?: number
  /** Animation duration in seconds */
  duration?: number
  /** Spring animation configuration */
  springConfig?: {
    damping?: number
    stiffness?: number
    mass?: number
  }
  /** Text size variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  /** Text alignment */
  align?: "left" | "center" | "right"
  /** Color variant */
  variant?: "default" | "muted" | "accent" | "primary"
  /** Use as heading instead of paragraph */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-xl md:text-2xl lg:text-3xl",
  lg: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  xl: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  "2xl": "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
}

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

const variantClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
  primary: "text-primary",
}

export function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 0,
  blurStrength = 4,
  staggerDelay = 0.05,
  threshold = 0.5,
  duration = 0.8,
  springConfig = {
    damping: 25,
    stiffness: 100,
    mass: 1,
  },
  size = "lg",
  align = "left",
  variant = "default",
  as = "p",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, {
    amount: threshold,
    once: false,
  })

  // Removed scroll-based rotation to keep text straight

  // Split text into words and spaces
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : ""
    return text
      .split(/(\s+)/)
      .map((part, index) => {
        return {
          value: part,
          isSpace: part.match(/^\s+$/) && part.length > 0,
          originalIndex: index,
        }
      })
      .filter((item) => item.value.length > 0)
  }, [children])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        ...springConfig,
        duration,
      },
    },
  }

  const MotionComponent = as === "h1" ? motion.h1 :
                         as === "h2" ? motion.h2 :
                         as === "h3" ? motion.h3 :
                         as === "h4" ? motion.h4 :
                         as === "h5" ? motion.h5 :
                         as === "h6" ? motion.h6 :
                         motion.p

  return (
    <motion.div
      ref={containerRef}
      className={cn("my-5 transform-gpu", containerClassName)}
    >
      <MotionComponent
        className={cn(
          "leading-relaxed font-semibold",
          sizeClasses[size],
          alignClasses[align],
          variantClasses[variant],
          textClassName
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {splitText.map((item) => {
          // Strip punctuation to check if word matches Square 1 Ai
          const wordWithoutPunctuation = item.value.replace(/[.,!?;:()\[\]{}'"]/g, '')
          const isSquare1Ai = wordWithoutPunctuation === "Square" || 
                             wordWithoutPunctuation === "1" || 
                             wordWithoutPunctuation === "Ai" ||
                             wordWithoutPunctuation === "AI"
          
          return item.isSpace ? (
            <span key={`space-${item.originalIndex}`}>{item.value}</span>
          ) : (
            <motion.span
              key={`word-${item.originalIndex}`}
              className={`inline-block ${
                isSquare1Ai
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                  : ""
              }`}
              variants={wordVariants}
            >
              {item.value}
            </motion.span>
          )
        })}
      </MotionComponent>
    </motion.div>
  )
}

export default ScrollReveal

