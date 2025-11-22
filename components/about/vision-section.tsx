import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

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

          {/* Image - Right */}
          <div className="order-2">
            
          </div>
        </div>
      </div>
    </section>
  )
}
