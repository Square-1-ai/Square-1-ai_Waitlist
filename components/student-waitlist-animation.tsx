"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface Node {
  id: number
  x: number
  y: number
  type: "circle" | "triangle" | "squiggle"
  color: string
  size: number
}

export default function StudentWaitlistAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sparkRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const linesRef = useRef<SVGLineElement[]>([])
  const messageRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)

  // Knowledge nodes configuration
  const nodes: Node[] = [
    { id: 1, x: 20, y: 15, type: "circle", color: "from-blue-400 to-blue-500", size: 12 },
    { id: 2, x: 75, y: 20, type: "triangle", color: "from-purple-400 to-purple-500", size: 14 },
    { id: 3, x: 15, y: 45, type: "squiggle", color: "from-cyan-400 to-cyan-500", size: 16 },
    { id: 4, x: 80, y: 40, type: "circle", color: "from-indigo-400 to-indigo-500", size: 10 },
    { id: 5, x: 25, y: 70, type: "triangle", color: "from-pink-400 to-pink-500", size: 13 },
    { id: 6, x: 70, y: 75, type: "squiggle", color: "from-blue-400 to-purple-500", size: 15 },
    { id: 7, x: 50, y: 30, type: "circle", color: "from-cyan-400 to-blue-500", size: 11 },
    { id: 8, x: 45, y: 60, type: "triangle", color: "from-purple-400 to-pink-500", size: 12 },
  ]

  // Connections between nodes (pairs of node IDs)
  const connections = [
    [0, 1], // spark to node 1
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 7],
    [6, 7],
    [2, 6],
    [3, 7],
  ]

  useEffect(() => {
    let ctx: gsap.Context | null = null

    // Wait for DOM to be ready
    const timeout = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline()

        // Collect all elements
        const allNodes = nodesRef.current.filter(Boolean) as HTMLDivElement[]
        const allLines = linesRef.current.filter(Boolean)
        const allElements = [
          sparkRef.current,
          ...allNodes,
          ...allLines,
          messageRef.current,
        ].filter(Boolean) as (HTMLElement | SVGElement)[]

        // Step 0: Initial State - Set all elements to hidden
        gsap.set(allElements, {
          opacity: 0,
          scale: 0,
        })

        // Step 1: The Initial "Spark" - Fades in and scales up from center (0.5s)
        if (sparkRef.current) {
          tl.to(sparkRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        // Step 2: Burst of "Knowledge Nodes" - Emerge from spark and expand outwards (1.0s staggered)
        if (allNodes.length > 0) {
          tl.to(allNodes, {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            stagger: {
              amount: 0.8,
              from: "start",
            },
            ease: "power2.out",
          }, "-=0.3") // Start slightly before spark completes
        }

        // Step 3: Interconnecting Paths - Draw lines between nodes (0.8s)
        if (allLines.length > 0) {
          tl.to(allLines, {
            strokeDashoffset: 0,
            opacity: 0.4,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          }, "-=0.5") // Start during node animation
        }

        // Step 4: Core Message Reveal - Fade in and slide up from bottom (0.7s)
        if (messageRef.current) {
          tl.fromTo(
            messageRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.3"
          )
        }

        // Step 5: Gentle Breathing Loop - Subtle pulse and glow for entire network (5.0s loop)
        if (networkRef.current) {
          tl.to(networkRef.current, {
            scale: 1.02,
            opacity: 0.98,
            duration: 5.0,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          }, "-=0.5")
        }

        // Individual node twinkling (subtle movement and opacity changes)
        allNodes.forEach((node, index) => {
          gsap.to(node, {
            y: "+=8",
            x: `+=${(Math.random() - 0.5) * 6}`,
            opacity: "+=0.15",
            duration: 4 + Math.random() * 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2 + 2, // Start after initial animation
          })
        })

        // Spark gentle pulse
        if (sparkRef.current) {
          gsap.to(sparkRef.current, {
            scale: 1.15,
            opacity: 0.85,
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.5,
          })
        }
      }, containerRef)
    }, 100) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timeout)
      if (ctx) ctx.revert()
    }
  }, [])

  const renderNode = (node: Node, index: number) => {
    const baseClasses = `absolute bg-gradient-to-br ${node.color} opacity-0`
    const style = {
      left: `${node.x}%`,
      top: `${node.y}%`,
      width: `${node.size}px`,
      height: `${node.size}px`,
      transform: "translate(-50%, -50%)",
    }

    switch (node.type) {
      case "circle":
        return (
          <div
            key={node.id}
            ref={(el) => {
              if (el) nodesRef.current[index] = el
            }}
            className={`${baseClasses} rounded-full blur-[0.5px]`}
            style={style}
          />
        )
      case "triangle":
        return (
          <div
            key={node.id}
            ref={(el) => {
              if (el) nodesRef.current[index] = el
            }}
            className={`${baseClasses} blur-[0.5px]`}
            style={{
              ...style,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        )
      case "squiggle":
        return (
          <div
            key={node.id}
            ref={(el) => {
              if (el) nodesRef.current[index] = el
            }}
            className="absolute opacity-0"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              width: `${node.size * 1.5}px`,
              height: `${node.size}px`,
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 24 16"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q8 2, 12 8 T22 8"
                stroke={`url(#gradient-${node.id})`}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const renderConnections = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {connections.map(([startIdx, endIdx], lineIndex) => {
          const startNode = startIdx === 0 
            ? { x: 50, y: 50 } // Spark position (center)
            : nodes[startIdx - 1]
          const endNode = nodes[endIdx - 1]

          if (!startNode || !endNode) return null

          const startX = startIdx === 0 ? 50 : startNode.x
          const startY = startIdx === 0 ? 50 : startNode.y
          const endX = endNode.x
          const endY = endNode.y

          return (
            <line
              key={`line-${lineIndex}`}
              ref={(el) => {
                if (el) linesRef.current[lineIndex] = el
              }}
              x1={`${startX}%`}
              y1={`${startY}%`}
              x2={`${endX}%`}
              y2={`${endY}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              strokeDasharray="100"
              strokeDashoffset="100"
              strokeLinecap="round"
              opacity="0"
              className="blur-[0.5px]"
            />
          )
        })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] flex items-center justify-center">
      <div ref={networkRef} className="relative w-full h-full">
        {/* Step 1: The Initial Spark */}
        <div
          ref={sparkRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0"
          style={{ zIndex: 10 }}
        >
          <div className="relative w-12 h-12">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full blur-md opacity-60" />
            {/* Core spark */}
            <div className="relative w-full h-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 rounded-full shadow-lg shadow-yellow-400/50">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
            </div>
          </div>
        </div>

        {/* Step 2: Knowledge Nodes */}
        <div className="relative w-full h-full" style={{ zIndex: 2 }}>
          {nodes.map((node, index) => renderNode(node, index))}
        </div>

        {/* Step 3: Interconnecting Paths */}
        {renderConnections()}

        {/* Step 4: Core Message */}
        <div
          ref={messageRef}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center opacity-0"
          style={{ zIndex: 5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Unlock Your Potential
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Your future starts here
          </p>
        </div>
      </div>
    </div>
  )
}
