"use client"

import Footer from "@/components/footer"
import Image from "next/image"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal
            as="h1"
            size="2xl"
            align="center"
            variant="default"
            textClassName="text-white mb-6 leading-tight"
            containerClassName="mb-6"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
          >
            Square 1 Ai — The World's First AI-Powered Learn-to-Launch Platform
          </ScrollReveal>
          <ScrollReveal
            size="md"
            align="center"
            variant="default"
            textClassName="text-slate-200 max-w-3xl mx-auto leading-relaxed"
            containerClassName="mb-4"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.04}
          >
            In a world where education is still one-size-fits-all, Square 1 Ai reimagines what it means to learn.
          </ScrollReveal>
          <ScrollReveal
            size="sm"
            align="center"
            variant="default"
            textClassName="text-slate-300 mt-4 max-w-2xl mx-auto"
            containerClassName="mt-4"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.04}
          >
            We're not just an edtech company — we're building the future of learning, where AI becomes your personal teacher, mentor, and career accelerator.
          </ScrollReveal>
        </div>
      </section>

      {/* What We Are */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            size="xl"
            align="left"
            variant="default"
            textClassName="text-slate-900 mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            What We Are
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed mb-6"
            containerClassName="mb-6"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            Square 1 Ai is the world's first AI-powered Learn-to-Launch platform — a personalized ecosystem where students can learn smarter, build projects faster, and launch careers or startups seamlessly.
          </ScrollReveal>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed mb-6"
            containerClassName="mb-6"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            From school to university to the workplace, Square 1 Ai unifies education, skill-building, and entrepreneurship into one continuous, AI-driven journey.
          </ScrollReveal>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            It's where learning doesn't stop at knowledge — it evolves into creation, innovation, and opportunity.
          </ScrollReveal>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            size="xl"
            align="left"
            variant="default"
            textClassName="text-slate-900 mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            Our Vision
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
          <ScrollReveal
            size="md"
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
            size="md"
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
            size="md"
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
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            size="xl"
            align="left"
            variant="default"
            textClassName="text-slate-900 mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            Our Mission
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed mb-6"
            containerClassName="mb-6"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            To democratize access to world-class education through intelligent AI-driven systems that personalize learning, quantify progress, and bridge the gap between knowledge and real-world application.
          </ScrollReveal>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            We help learners go from classroom to career — and from idea to launch — using the power of data, AI, and community.
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            size="xl"
            align="left"
            variant="default"
            textClassName="text-slate-900 mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            How It Works
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-12"></div>
          <ScrollReveal
            size="md"
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
          
          <div className="grid md:grid-cols-3 gap-8">
            <InteractiveCard
              number="1"
              title="Learn"
              description="Interactive courses enhanced with AI Study Packs (notes, mind maps, quizzes, podcasts)."
            />
            
            <InteractiveCard
              number="2"
              title="Apply"
              description="Real-world projects and competitions driven by data, innovation, and problem-solving."
            />
            
            <InteractiveCard
              number="3"
              title="Launch"
              description="AI-assisted career guidance, portfolio building, and startup incubation through our innovation network."
            />
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            size="xl"
            align="left"
            variant="default"
            textClassName="text-slate-900 mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            Why It Matters
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed mb-6"
            containerClassName="mb-6"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            The education system hasn't evolved with the pace of technology — until now.
          </ScrollReveal>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            Square 1 Ai integrates Artificial Intelligence, Adaptive Learning, and Real-World Launch Programs into one seamless experience, helping millions of learners build skills, validate knowledge, and turn learning into measurable success.
          </ScrollReveal>
        </div>
      </section>

      {/* AI-First Personalization */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            size="xl"
            align="left"
            variant="default"
            textClassName="text-slate-900 mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            AI-First Personalization
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
          <ScrollReveal
            size="md"
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
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-700 leading-relaxed">
                  Craft individual learning paths
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-700 leading-relaxed">
                  Recommend personalized study packs, projects, and mentors
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-700 leading-relaxed">
                  Track learning outcomes with predictive analytics
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-700 leading-relaxed">
                  Provide real-time feedback through natural-language interaction
                </p>
              </div>
            </div>
          </div>
          
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed mt-8 font-semibold"
            containerClassName="mt-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            Each student experiences a completely unique learning journey — powered by data, shaped by AI, and designed for success.
          </ScrollReveal>
        </div>
      </section>

      {/* Beyond Learning — A Launchpad */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal
            as="h2"
            size="xl"
            align="left"
            variant="default"
            textClassName="text-slate-900 mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            Beyond Learning — A Launchpad
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mb-8"></div>
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed mb-8"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            Square 1 Ai is more than a platform — it's an ecosystem:
          </ScrollReveal>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Circle: the LinkedIn for Learners</h3>
              <p className="text-slate-700 leading-relaxed">
                Share achievements, join communities, and connect with employers.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Competitions Hub</h3>
              <p className="text-slate-700 leading-relaxed">
                A Kaggle-like challenge space where students solve real-world problems and win recognition.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Career & Startup Labs</h3>
              <p className="text-slate-700 leading-relaxed">
                Direct pathways to internships, funding, and entrepreneurship.
              </p>
            </div>
          </div>
          
          <ScrollReveal
            size="md"
            align="left"
            variant="default"
            textClassName="text-slate-700 leading-relaxed mt-8 font-semibold"
            containerClassName="mt-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.04}
          >
            Every learner leaves with skills, credentials, and a portfolio that speaks for itself.
          </ScrollReveal>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal
            as="h2"
            size="xl"
            align="center"
            variant="default"
            textClassName="text-white mb-8 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
          >
            Our Promise
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-12"></div>
          <ScrollReveal
            size="lg"
            align="center"
            variant="default"
            textClassName="text-slate-200 leading-relaxed mb-6 max-w-4xl mx-auto"
            containerClassName="mb-6"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.04}
          >
            We're redefining education as an AI-driven journey of discovery — where every learner has the tools to think, build, and lead from day one.
          </ScrollReveal>
          <ScrollReveal
            size="xl"
            align="center"
            variant="default"
            textClassName="text-white font-bold max-w-3xl mx-auto"
            containerClassName="mb-4"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
          >
            Because at Square 1 Ai, we don't just teach knowledge —
          </ScrollReveal>
          <ScrollReveal
            size="2xl"
            align="center"
            variant="default"
            textClassName="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold mt-4"
            containerClassName="mt-4"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
          >
            we engineer possibility.
          </ScrollReveal>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Image 
              src="/Gradient.png" 
              alt="Square 1 Ai Logo" 
              width={200} 
              height={75}
              className="object-contain w-[150px] sm:w-[180px] md:w-[200px] h-auto"
            />
          </div>
          <ScrollReveal
            size="xl"
            align="center"
            variant="default"
            textClassName="text-slate-700 font-semibold"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            Learn Smarter. Build Faster. Launch Further.
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}

