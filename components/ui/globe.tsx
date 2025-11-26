"use client"

import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.4, 0.6, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 }, // Manila
    { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
    { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka
    { location: [30.0444, 31.2357], size: 0.07 }, // Cairo
    { location: [39.9042, 116.4074], size: 0.08 }, // Beijing
    { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
    { location: [19.4326, -99.1332], size: 0.1 }, // Mexico City
    { location: [40.7128, -74.006], size: 0.1 }, // New York
    { location: [34.6937, 135.5022], size: 0.05 }, // Osaka
    { location: [41.0082, 28.9784], size: 0.06 }, // Istanbul
    // Additional markers for more glow and coverage
    { location: [51.5074, -0.1278], size: 0.07 }, // London
    { location: [48.8566, 2.3522], size: 0.07 }, // Paris
    { location: [55.7558, 37.6173], size: 0.07 }, // Moscow
    { location: [35.6895, 139.6917], size: 0.08 }, // Tokyo
    { location: [28.6139, 77.209], size: 0.07 }, // Delhi
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    { location: [37.7749, -122.4194], size: 0.07 }, // San Francisco
    { location: [52.52, 13.405], size: 0.06 }, // Berlin
    { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
    { location: [6.5244, 3.3792], size: 0.08 }, // Lagos
    { location: [31.2304, 121.4737], size: 0.08 }, // Shanghai
    { location: [13.7563, 100.5018], size: 0.06 }, // Bangkok
    { location: [45.4642, 9.19], size: 0.06 }, // Milan
    { location: [43.6532, -79.3832], size: 0.07 }, // Toronto
    { location: [-34.6037, -58.3816], size: 0.07 }, // Buenos Aires
    { location: [25.276987, 55.296249], size: 0.07 }, // Dubai
    { location: [59.3293, 18.0686], size: 0.06 }, // Stockholm
    { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo (alt)
    { location: [21.0285, 105.8542], size: 0.06 }, // Hanoi
    { location: [50.1109, 8.6821], size: 0.06 }, // Frankfurt
    { location: [37.5665, 126.978], size: 0.07 }, // Seoul
    { location: [60.1699, 24.9384], size: 0.06 }, // Helsinki
    { location: [33.6844, 73.0479], size: 0.06 }, // Islamabad
    { location: [24.7136, 46.6753], size: 0.07 }, // Riyadh
    { location: [55.9533, -3.1883], size: 0.06 }, // Edinburgh
    { location: [41.9028, 12.4964], size: 0.06 }, // Rome
    { location: [40.4168, -3.7038], size: 0.06 }, // Madrid
    { location: [35.9078, 127.7669], size: 0.06 }, // South Korea (center)
    { location: [22.3964, 114.1095], size: 0.06 }, // Hong Kong
    { location: [39.7392, -104.9903], size: 0.06 }, // Denver
    { location: [53.3498, -6.2603], size: 0.06 }, // Dublin
    { location: [30.2672, -97.7431], size: 0.06 }, // Austin
    { location: [25.2048, 55.2708], size: 0.06 }, // Dubai (alt)
    { location: [10.8231, 106.6297], size: 0.06 }, // Ho Chi Minh City
    { location: [12.9716, 77.5946], size: 0.06 }, // Bangalore
    { location: [50.0755, 14.4378], size: 0.06 }, // Prague
    { location: [41.3851, 2.1734], size: 0.06 }, // Barcelona
    { location: [38.7223, -9.1393], size: 0.06 }, // Lisbon
    { location: [59.9139, 10.7522], size: 0.06 }, // Oslo
    { location: [35.8617, 104.1954], size: 0.06 }, // China (center)
    { location: [55.8642, -4.2518], size: 0.06 }, // Glasgow
    { location: [39.9526, -75.1652], size: 0.06 }, // Philadelphia
    { location: [32.0853, 34.7818], size: 0.06 }, // Tel Aviv
    { location: [52.3676, 4.9041], size: 0.06 }, // Amsterdam
    { location: [35.6895, 51.389], size: 0.06 }, // Tehran
    { location: [40.6401, 22.9444], size: 0.06 }, // Thessaloniki
    { location: [36.1627, -86.7816], size: 0.06 }, // Nashville
    { location: [33.4484, -112.074], size: 0.06 }, // Phoenix
    { location: [43.6532, -79.3832], size: 0.06 }, // Toronto (alt)
    { location: [35.2271, -80.8431], size: 0.06 }, // Charlotte
    { location: [29.7604, -95.3698], size: 0.06 }, // Houston
    { location: [39.7684, -86.1581], size: 0.06 }, // Indianapolis
    { location: [33.749, -84.388], size: 0.06 }, // Atlanta
    { location: [42.3601, -71.0589], size: 0.06 }, // Boston
    { location: [47.6062, -122.3321], size: 0.06 }, // Seattle
    { location: [34.0522, -118.2437], size: 0.06 }, // Los Angeles
    { location: [25.7617, -80.1918], size: 0.06 }, // Miami
    { location: [45.5017, -73.5673], size: 0.06 }, // Montreal
    { location: [19.076, 72.8777], size: 0.06 }, // Mumbai (alt)
    { location: [31.9686, 99.9018], size: 0.06 }, // Texas (center)
    { location: [35.8617, 104.1954], size: 0.06 }, // China (center, alt)
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + rs.get()
        state.width = width * 2
        state.height = width * 2
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
