import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { GlobalConnectionMap } from "./global-connection-map"

export function MissionSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - Left */}
          <div className="order-2 md:order-1 flex justify-start">
            <GlobalConnectionMap />
          </div>
          
          {/* Text Content - Right */}
          <div className="order-1 md:order-2">
            <ScrollReveal
              as="h2"
              size="lg"
              align="left"
              variant="default"
              textClassName="text-white mb-4 font-bold"
              containerClassName="mb-8"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.03}
            >
              Our Mission
            </ScrollReveal>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-8"></div>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-200 leading-relaxed mb-6"
              containerClassName="mb-6"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.04}
            >
              To democratize access to world-class education through intelligent AI-driven systems that personalize learning, quantify progress, and bridge the gap between knowledge and real-world application.
            </ScrollReveal>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-200 leading-relaxed"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.04}
            >
              We help learners go from classroom to career and from idea to launch using the power of data, AI, and community.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
