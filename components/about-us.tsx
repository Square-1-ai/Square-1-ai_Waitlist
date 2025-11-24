"use client"

import { useCountAnimation } from "@/hooks/use-count-animation"
import { Globe } from "@/components/ui/globe"

export default function AboutUs() {
  const earlyAdopters = useCountAnimation({ end: 3000, suffix: '+' })
  const aiFeatures = useCountAnimation({ end: 15, suffix: '+' })
  const countries = useCountAnimation({ end: 10, suffix: '+' })
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">About Us</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transforming Education Through The Power Of Artificial Intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              At Square 1 Ai, we believe that quality education should be accessible to everyone, everywhere. 
              Our mission is to revolutionize the learning experience by harnessing cutting-edge AI technology 
              to create personalized, engaging, and effective educational journeys.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We're building a platform that adapts to each student's unique learning style, pace, and goals, 
              while empowering teachers with powerful tools to inspire and guide their students more effectively 
              than ever before.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">What We Offer</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-semibold text-blue-900">AI-Powered Learning Paths:</span>
                  <span className="text-slate-700"> Customized study plans that evolve with your progress</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-semibold text-blue-900">Smart Content Generation:</span>
                  <span className="text-slate-700"> Dynamic study materials tailored to your needs</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-semibold text-blue-900">Real-Time Insights:</span>
                  <span className="text-slate-700"> Track progress and identify areas for improvement instantly</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <span className="font-semibold text-blue-900">Global Community:</span>
                  <span className="text-slate-700"> Connect with learners and educators worldwide</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        

        <div className="relative min-h-[300px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="opacity-70" />
          </div>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 gap-6 md:gap-12 text-center w-full max-w-4xl px-4 mx-auto mt-8 md:mt-16">
            <div ref={earlyAdopters.ref}>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {earlyAdopters.count === '0+' ? '0' : earlyAdopters.count === '1000+' ? '1K+' : earlyAdopters.count}
              </div>
              <div className="text-slate-700 font-medium">Early Adopters</div>
            </div>
            <div ref={aiFeatures.ref}>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {aiFeatures.count}
              </div>
              <div className="text-slate-700 font-medium">AI-Powered Features</div>
            </div>
            <div ref={countries.ref}>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {countries.count}
              </div>
              <div className="text-slate-700 font-medium">Countries Across</div>
            </div>
          </div>
      </div>
    </section>
  )
}
