import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { InteractiveCard } from "@/components/ui/interactive-card"

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
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
              How It Works
            </ScrollReveal>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-12"></div>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-700 leading-relaxed mb-12"
              containerClassName="mb-12"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.04}
            >
              At the heart of Square 1 Ai is an AI engine that tailors every step of the learning journey:
            </ScrollReveal>
            
            <div className="grid grid-cols-1 gap-4">
              <InteractiveCard
                number="1"
                title="Learn"
                description="Interactive courses enhanced with AI Study Packs (notes, mind maps, quizzes, podcasts)."
                compact={true}
              />
              
              <InteractiveCard
                number="2"
                title="Apply"
                description="Real-world projects and competitions driven by data, innovation, and problem-solving."
                compact={true}
              />
              
              <InteractiveCard
                number="3"
                title="Launch"
                description="AI-assisted career guidance, portfolio building, and startup incubation through our innovation network."
                compact={true}
              />
            </div>
          </div>

          {/* Image - Right */}
          <div className="order-2">
            <Image 
              src="/about_pics/how-it-works.png" 
              alt="How It Works" 
              width={500}
              height={350}
              className="w-full h-auto max-w-md md:ml-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
