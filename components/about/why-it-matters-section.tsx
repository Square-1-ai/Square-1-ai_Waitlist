import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function WhyItMattersSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - Left */}
          <div className="order-2 md:order-1">
            <Image 
              src="/about_pics/why-it-matters.png" 
              alt="Why It Matters" 
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
              Why It Matters
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
              The education system hasn't evolved with the pace of technology until now.
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
              Square 1 Ai integrates Artificial Intelligence, Adaptive Learning, and Real-World Launch Programs into one seamless experience, helping millions of learners build skills, validate knowledge, and turn learning into measurable success.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
