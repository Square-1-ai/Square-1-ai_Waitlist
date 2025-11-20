import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ChatInterface } from "./chat-interface"

export function AIPersonalizationSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-100">
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
              AI-First Personalization
            </ScrollReveal>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-700 leading-relaxed mb-8"
              containerClassName="mb-8"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.04}
            >
              Our AI companions analyze learning behavior, strengths, and gaps to:
            </ScrollReveal>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    Craft individual learning paths
                  </p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100 hover:border-cyan-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    Recommend personalized study packs, projects, and mentors
                  </p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    Track learning outcomes with predictive analytics
                  </p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-100 hover:border-cyan-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-600 to-sky-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    Provide real-time feedback through natural-language interaction
                  </p>
                </div>
              </div>
            </div>
            
            <ScrollReveal
              size="sm"
              align="left"
              variant="default"
              textClassName="text-slate-700 leading-relaxed mt-8 font-semibold"
              containerClassName="mt-8"
              enableBlur={true}
              baseOpacity={0.1}
              staggerDelay={0.04}
            >
              Each student experiences a completely unique learning journey powered by data, shaped by AI, and designed for success.
            </ScrollReveal>
          </div>

          {/* Image - Right */}
          <div className="order-2">
            <ChatInterface />
          </div>
        </div>
      </div>
    </section>
  )
}
