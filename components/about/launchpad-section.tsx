import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function LaunchpadSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - Left */}
          <div className="order-2 md:order-1">
            <Image 
              src="/about_pics/ecosystem.png" 
              alt="Beyond Learning A Launchpad" 
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
              Beyond Learning A Launchpad
            </ScrollReveal>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-8"></div>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-200 leading-relaxed mb-8"
              containerClassName="mb-8"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.04}
            >
              Square 1 Ai is more than a platform it's an ecosystem:
            </ScrollReveal>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-white mb-2">Circle: the Powerhouse for Learners</h3>
                <p className="text-slate-200 leading-relaxed">
                  Share achievements, join communities, and connect with employers.
                </p>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 border-l-4 border-cyan-400">
                <h3 className="text-xl font-bold text-white mb-2">Competitions Hub</h3>
                <p className="text-slate-200 leading-relaxed">
                  A Kaggle-like challenge space where students solve real-world problems and win recognition.
                </p>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-white mb-2">Career & Startup Labs</h3>
                <p className="text-slate-200 leading-relaxed">
                  Direct pathways to internships, funding, and entrepreneurship.
                </p>
              </div>
            </div>
            
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-200 leading-relaxed mt-8 font-semibold"
              containerClassName="mt-8"
              enableBlur={true}
              baseOpacity={0.2}
              staggerDelay={0.04}
            >
              Every learner leaves with skills, credentials, and a portfolio that speaks for itself.
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
