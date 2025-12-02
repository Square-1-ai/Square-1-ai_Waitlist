"use client";

import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedList } from "@/registry/magicui/animated-list"

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let visionItems = [
  {
    name: "Innovation Labs",
    description: "Transforming classrooms",
    time: "Our Vision",
    icon: "🔬",
    color: "#00C9A7",
  },
  {
    name: "Creators & Innovators",
    description: "Empowering learners",
    time: "Future Ready",
    icon: "💡",
    color: "#FFB800",
  },
  {
    name: "Personalized Learning",
    description: "Adaptive AI companion",
    time: "For Everyone",
    icon: "🎯",
    color: "#FF3D71",
  },
  {
    name: "Global Opportunities",
    description: "Real-world connections",
    time: "Connected",
    icon: "🌐",
    color: "#1E86FF",
  },
]

visionItems = Array.from({ length: 10 }, () => visionItems).flat()

const VisionItem = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function VisionSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left */}
          <div className="order-1">
            <ScrollReveal
              size="lg"
              align="left"
              variant="default"
              textClassName="text-blue-900 mb-4 font-bold"
              containerClassName="mb-8"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.03}
            >
              Our Vision
            </ScrollReveal>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-700 leading-relaxed mb-6"
              containerClassName="mb-6"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.04}
            >
              To redefine the global learning experience by transforming classrooms into innovation labs and learners into creators, innovators, and founders.
            </ScrollReveal>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-700 leading-relaxed mb-6"
              containerClassName="mb-6"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.04}
            >
              We believe education should be personalized, practical, and purpose-driven.
            </ScrollReveal>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-700 leading-relaxed"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.04}
            >
              Every student deserves an AI companion that understands their pace, adapts to their goals, and connects them with real-world opportunities.
            </ScrollReveal>
          </div>

          {/* Animated List - Right */}
          <div className="order-2">
            <div className="relative flex h-[500px] w-full flex-col overflow-hidden rounded-lg p-2">
              <AnimatedList delay={2000}>
                {visionItems.map((item, idx) => (
                  <VisionItem {...item} key={idx} />
                ))}
              </AnimatedList>
              <div className="from-blue-50 pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
