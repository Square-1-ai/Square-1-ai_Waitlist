"use client"

import { useEffect, useState, useMemo } from "react"
import { School, Presentation, Award, Target, GraduationCap } from "lucide-react"

export default function TeacherAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate particle positions once
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
      })),
    [],
  )

  const icons = [
    { Icon: School, delay: 0, x: "10%", y: "20%" },
    { Icon: Presentation, delay: 0.2, x: "80%", y: "15%" },
    { Icon: Award, delay: 0.4, x: "15%", y: "70%" },
    { Icon: Target, delay: 0.6, x: "75%", y: "75%" },
    { Icon: GraduationCap, delay: 0.8, x: "45%", y: "50%" },
  ]

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-indigo-400/20 animate-gradient-shift" />
      
      {/* Floating icons */}
      {mounted &&
        icons.map(({ Icon, delay, x, y }, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: x,
              top: y,
              animationDelay: `${delay}s`,
              animationDuration: `${3 + index * 0.5}s`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
              <Icon className="relative w-12 h-12 text-cyan-600 dark:text-cyan-400 drop-shadow-lg" />
            </div>
          </div>
        ))}

      {/* Central illustration */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          {/* Glowing circle */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse" />
          
          {/* Main icon */}
          <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 shadow-2xl transform transition-transform hover:scale-105">
            <School className="w-24 h-24 text-white" />
          </div>
        </div>

        {/* Animated text */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Share Your Expertise
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Join our community of educators and make an impact
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Floating particles */}
      {mounted &&
        particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
    </div>
  )
}

