"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface ScatteredElement {
  id: number
  x: number
  y: number
  size: number
  type: "dot" | "small-square"
}

interface Module {
  id: number
  gridX: number
  gridY: number
  finalX: number
  finalY: number
}

export default function TeacherWaitlistAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const foundationRef = useRef<HTMLDivElement>(null)
  const modulesRef = useRef<HTMLDivElement[]>([])
  const linesRef = useRef<SVGPathElement[]>([])
  const messageRef = useRef<HTMLDivElement>(null)
  const structureRef = useRef<HTMLDivElement>(null)
  const scatteredElementsRef = useRef<HTMLDivElement[]>([])

  // Scattered elements (initial state - representing unorganized material)
  const scatteredElements: ScatteredElement[] = [
    { id: 1, x: 15, y: 20, size: 6, type: "dot" },
    { id: 2, x: 85, y: 15, size: 8, type: "small-square" },
    { id: 3, x: 25, y: 75, size: 7, type: "dot" },
    { id: 4, x: 70, y: 80, size: 6, type: "small-square" },
    { id: 5, x: 10, y: 50, size: 8, type: "dot" },
    { id: 6, x: 90, y: 60, size: 7, type: "small-square" },
    { id: 7, x: 30, y: 30, size: 6, type: "dot" },
    { id: 8, x: 80, y: 40, size: 8, type: "small-square" },
  ]

  // Grid layout for modules (3x3 grid centered around foundation)
  const modules: Module[] = [
    { id: 1, gridX: -1, gridY: -1, finalX: 35, finalY: 30 }, // top-left
    { id: 2, gridX: 0, gridY: -1, finalX: 50, finalY: 30 }, // top-center
    { id: 3, gridX: 1, gridY: -1, finalX: 65, finalY: 30 }, // top-right
    { id: 4, gridX: -1, gridY: 0, finalX: 35, finalY: 50 }, // middle-left
    { id: 5, gridX: 1, gridY: 0, finalX: 65, finalY: 50 }, // middle-right
    { id: 6, gridX: -1, gridY: 1, finalX: 35, finalY: 70 }, // bottom-left
    { id: 7, gridX: 0, gridY: 1, finalX: 50, finalY: 70 }, // bottom-center
    { id: 8, gridX: 1, gridY: 1, finalX: 65, finalY: 70 }, // bottom-right
  ]

  useEffect(() => {
    let ctx: gsap.Context | null = null

    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline()

        // Collect all elements
        const allModules = modulesRef.current.filter(Boolean) as HTMLDivElement[]
        const allLines = linesRef.current.filter(Boolean)
        const allScattered = scatteredElementsRef.current.filter(Boolean) as HTMLDivElement[]

        // Step 0: Initial State - Scattered elements with randomized positions
        scatteredElements.forEach((element, index) => {
          const el = allScattered[index]
          if (el) {
            // Randomize initial position slightly
            const randomX = element.x + (Math.random() - 0.5) * 10
            const randomY = element.y + (Math.random() - 0.5) * 10
            gsap.set(el, {
              opacity: 0.4, // Start visible but subtle
              left: `${randomX}%`,
              top: `${randomY}%`,
            })
          }
        })

        gsap.set([foundationRef.current, ...allModules, ...allLines, messageRef.current], {
          opacity: 0,
        })

        // Step 1: The Foundation - Slides in from top-left (0.4s)
        if (foundationRef.current) {
          // Position at center initially, then animate from top-left
          gsap.set(foundationRef.current, {
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
            opacity: 0,
          })

          tl.fromTo(
            foundationRef.current,
            {
              x: "-200%", // Start from far left
              y: "-200%", // Start from far top
              opacity: 0,
            },
            {
              x: "-50%",
              y: "-50%",
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            }
          )
        }

        // Step 2: Modular Connections - Squares emerge from foundation and slot into grid (1.0s staggered)
        if (allModules.length > 0) {
          // Set initial positions at foundation center
          gsap.set(allModules, {
            x: "50%",
            y: "50%",
            transform: "translate(-50%, -50%)",
            scale: 0,
          })

          tl.to(allModules, {
            x: (index) => `${modules[index].finalX}%`,
            y: (index) => `${modules[index].finalY}%`,
            scale: 1,
            opacity: 1,
            duration: 1.0,
            stagger: {
              amount: 0.8,
              from: "start",
            },
            ease: "back.out(1.2)",
            transform: "translate(-50%, -50%)",
          }, "-=0.2")
        }

        // Step 3: Path of Influence - Curved lines/arrows draw outward (0.7s)
        if (allLines.length > 0) {
          tl.to(allLines, {
            strokeDashoffset: 0,
            opacity: 0.6,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
          }, "-=0.4")
        }

        // Step 4: Core Message Reveal - Fades in and sharpens (0.6s)
        if (messageRef.current) {
          tl.fromTo(
            messageRef.current,
            {
              opacity: 0,
              filter: "blur(4px)",
            },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.3"
          )
        }

        // Step 5: Subdued Loop - Gentle pulse and subtle glow (6.0s loop)
        if (structureRef.current) {
          tl.to(structureRef.current, {
            scale: 1.01,
            opacity: 0.98,
            duration: 6.0,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          }, "-=0.3")
        }

        // Individual module subtle glow
        allModules.forEach((module, index) => {
          gsap.to(module, {
            opacity: 0.9,
            duration: 3 + Math.random() * 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.15 + 2,
          })
        })

        // Lines subtle color shift
        allLines.forEach((line) => {
          gsap.to(line, {
            opacity: 0.5,
            duration: 4 + Math.random() * 1,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2,
          })
        })

        // Fade out scattered elements as structure forms
        if (allScattered.length > 0) {
          tl.to(allScattered, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.in",
          }, "-=1.0")
        }
      }, containerRef)
    }, 100)

    return () => {
      clearTimeout(timeout)
      if (ctx) ctx.revert()
    }
  }, [])

  const renderScatteredElement = (element: ScatteredElement, index: number) => {
    const baseClasses = `absolute`
    const style = {
      left: `${element.x}%`,
      top: `${element.y}%`,
      width: `${element.size}px`,
      height: `${element.size}px`,
      transform: "translate(-50%, -50%)",
    }

    if (element.type === "dot") {
      return (
        <div
          key={element.id}
          ref={(el) => {
            if (el) scatteredElementsRef.current[index] = el
          }}
          className={`${baseClasses} rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-400/40`}
          style={style}
        />
      )
    } else {
      return (
        <div
          key={element.id}
          ref={(el) => {
            if (el) scatteredElementsRef.current[index] = el
          }}
          className={`${baseClasses} bg-gradient-to-br from-indigo-400/40 to-teal-400/40 rounded-sm`}
          style={style}
        />
      )
    }
  }

  const renderInfluencePaths = () => {
    // Curved lines/arrows drawing outward from the grid
    const paths = [
      { startX: 50, startY: 50, endX: 15, endY: 15, curve: 0.3 }, // top-left
      { startX: 50, startY: 50, endX: 85, endY: 15, curve: -0.3 }, // top-right
      { startX: 50, startY: 50, endX: 15, endY: 85, curve: 0.3 }, // bottom-left
      { startX: 50, startY: 50, endX: 85, endY: 85, curve: -0.3 }, // bottom-right
      { startX: 65, startY: 50, endX: 95, endY: 30, curve: -0.2 }, // right-up
      { startX: 65, startY: 50, endX: 95, endY: 70, curve: -0.2 }, // right-down
    ]

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {paths.map((path, index) => {
          const midX = path.startX + (path.endX - path.startX) * 0.5
          const midY = path.startY + (path.endY - path.startY) * 0.5 + path.curve * 20

          return (
            <path
              key={`path-${index}`}
              ref={(el) => {
                if (el) linesRef.current[index] = el
              }}
              d={`M ${path.startX}% ${path.startY}% Q ${midX}% ${midY}% ${path.endX}% ${path.endY}%`}
              stroke="url(#teacherLineGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="200"
              strokeDashoffset="200"
              strokeLinecap="round"
              opacity="0"
            />
          )
        })}
        <defs>
          <linearGradient id="teacherLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(14, 165, 233)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] flex items-center justify-center">
      <div ref={structureRef} className="relative w-full h-full">
        {/* Step 0: Scattered Elements (initial state) */}
        <div className="absolute inset-0">
          {scatteredElements.map((element, index) => renderScatteredElement(element, index))}
        </div>

        {/* Step 1: The Foundation */}
        <div
          ref={foundationRef}
          className="absolute top-1/2 left-1/2 opacity-0"
          style={{
            zIndex: 10,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-lg shadow-xl shadow-blue-500/30 border-2 border-white/20">
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
          </div>
        </div>

        {/* Step 2: Modular Connections (Grid) */}
        <div className="relative w-full h-full" style={{ zIndex: 2 }}>
          {modules.map((module, index) => (
            <div
              key={module.id}
              ref={(el) => {
                if (el) modulesRef.current[index] = el
              }}
              className="absolute opacity-0"
              style={{
                left: `${module.finalX}%`,
                top: `${module.finalY}%`,
                transform: "translate(-50%, -50%)",
                width: "32px",
                height: "32px",
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 rounded-md shadow-md border border-white/30" />
            </div>
          ))}
        </div>

        {/* Step 3: Path of Influence */}
        {renderInfluencePaths()}

        {/* Step 4: Core Message */}
        <div
          ref={messageRef}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center opacity-0"
          style={{ zIndex: 5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Amplify Your Impact
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Lead the Digital Classroom
          </p>
        </div>
      </div>
    </div>
  )
}
