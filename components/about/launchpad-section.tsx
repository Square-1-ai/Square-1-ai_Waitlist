import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function LaunchpadSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - Left */}
          <div className="order-2 md:order-1">
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Trophy in center */}
              <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <Image 
                  src="/logo.svg" 
                  alt="Trophy" 
                  width={225} 
                  height={225}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Top - achievements */}
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  <span className="uppercase tracking-wider text-xs md:text-sm font-semibold">achievements</span>
                </div>
              </div>

              {/* Right - communities */}
              <div className="absolute right-[0%] top-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  <span className="uppercase tracking-wider text-xs md:text-sm font-semibold">communities</span>
                </div>
              </div>

              {/* Bottom Right - internships */}
              <div className="absolute bottom-[12%] right-[15%]">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  <span className="uppercase tracking-wider text-xs md:text-sm font-semibold">internships</span>
                </div>
              </div>

              {/* Bottom Left - funding */}
              <div className="absolute bottom-[12%] left-[15%]">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  <span className="uppercase tracking-wider text-xs md:text-sm font-semibold">funding</span>
                </div>
              </div>

              {/* Left - startups */}
              <div className="absolute left-[2%] top-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-400 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  <span className="uppercase tracking-wider text-xs md:text-sm font-semibold">startups</span>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-blue-400/30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-cyan-400/20"></div>
              </div>
            </div>
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
