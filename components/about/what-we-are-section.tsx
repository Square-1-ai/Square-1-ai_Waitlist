import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function WhatWeAreSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - Left */}
          <div className="order-2 md:order-1">
            <Image 
              src="/Gradient.png" 
              alt="What We Are" 
              width={500}
              height={350}
              className="w-full h-auto max-w-md"
            />
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
              What We Are
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
              Square 1 Ai is the world's first AI-powered Learn-to-Launch platform a personalized ecosystem where students can learn smarter, build projects faster, and launch careers or startups seamlessly.
            </ScrollReveal>
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
              From school to university to the workplace, Square 1 Ai unifies education, skill-building, and entrepreneurship into one continuous, AI-driven journey.
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
              It's where learning doesn't stop at knowledge it evolves into creation, innovation, and opportunity.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
