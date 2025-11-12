"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  children?: React.ReactNode
  className?: string
  number?: string | number
  title?: string
  description?: string
  interactiveColor?: string
  borderRadius?: string
  rotationFactor?: number
  transitionDuration?: number
  transitionEasing?: string
  tailwindBgClass?: string
}

export const InteractiveCard = ({
  children,
  className,
  number,
  title,
  description,
  interactiveColor = "#07eae6ff",
  borderRadius = "24px",
  rotationFactor = 0.4,
  transitionDuration = 0.3,
  transitionEasing = "easeInOut",
  tailwindBgClass = "bg-white",
}: InteractiveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateXTrans = useTransform(y, [0, 1], [rotationFactor * 15, -rotationFactor * 15])
  const rotateYTrans = useTransform(x, [0, 1], [-rotationFactor * 15, rotationFactor * 15])

  const handlePointerMove = (e: React.PointerEvent) => {
    const bounds = cardRef.current?.getBoundingClientRect()
    if (!bounds) return

    const px = (e.clientX - bounds.left) / bounds.width
    const py = (e.clientY - bounds.top) / bounds.height

    x.set(px)
    y.set(py)
  }

  const xPercentage = useTransform(x, (val) => `${val * 100}%`)
  const yPercentage = useTransform(y, (val) => `${val * 100}%`)
  const interactiveBackground = useMotionTemplate`radial-gradient(circle at ${xPercentage} ${yPercentage}, ${interactiveColor} 0%, transparent 80%)`

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false)
        x.set(0.5)
        y.set(0.5)
      }}
      style={{
        perspective: 1000,
        borderRadius,
      }}
      className={cn("relative w-full isolate", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          rotateX: rotateXTrans,
          rotateY: rotateYTrans,
          transformStyle: "preserve-3d",
          transition: `transform ${transitionDuration}s ${transitionEasing}`,
        }}
        className="w-full h-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Background Interactive Layer */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-0"
          style={{
            background: interactiveBackground,
            transition: `opacity ${transitionDuration}s ${transitionEasing}`,
            opacity: isHovered ? 0.3 : 0,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          className={cn(
            "relative z-10 w-full h-full p-8",
            tailwindBgClass,
            "text-foreground"
          )}
          style={{
            borderRadius,
          }}
        >
          {number && (
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl font-bold text-white">{number}</span>
            </motion.div>
          )}

          {title && (
            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
          )}

          {description && (
            <p className="text-slate-700 leading-relaxed">{description}</p>
          )}

          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
