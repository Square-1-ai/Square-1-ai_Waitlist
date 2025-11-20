"use client"

import Footer from "@/components/footer"
import Image from "next/image"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import TextType from "@/components/ui/text-type"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Country {
  name: string;
  x: number;
  y: number;
  avatar: string;
  connections: number[];
}

const countries: Country[] = [
  { name: 'USA', x: 20, y: 22, avatar: 'https://images.unsplash.com/photo-1662838496660-61af6ffa3788?w=200', connections: [1, 5, 8] },
  { name: 'Brazil', x: 35, y: 58, avatar: 'https://images.unsplash.com/photo-1609043238951-9bb29775f27c?w=200', connections: [0, 3] },
  { name: 'UK', x: 48.5, y: 14, avatar: 'https://images.unsplash.com/photo-1610103278906-6c96a3b2c1f0?w=200', connections: [6, 9] },
  // { name: 'Morocco', x: 48, y: 34, avatar: 'https://images.unsplash.com/photo-1628885443631-138b27f4ce57?w=200', connections: [2, 13] },
  // { name: 'Nigeria', x: 0, y: 48, avatar: 'https://images.unsplash.com/photo-1613002864483-7464b6bd442e?w=200', connections: [3, 13, 15] },
  { name: 'Russia', x: 66, y: 18, avatar: 'https://images.unsplash.com/photo-1596602549485-90a066ad2f2d?w=200', connections: [10, 6] },
  // { name: 'Germany', x: 51, y: 27, avatar: 'https://images.unsplash.com/photo-1647879063782-9ec0f6eb9ab3?w=200', connections: [2, 5] },
  { name: 'Egypt', x: 56, y: 36, avatar: 'https://images.unsplash.com/photo-1754639488181-7eae9f6c06e0?w=200', connections: [3, 4] },
  // { name: 'Mexico', x: 18, y: 42, avatar: 'https://images.unsplash.com/photo-1644966825640-bf597f873b89?w=200', connections: [0, 14] },
  { name: 'France', x: 43, y: 29, avatar: 'https://images.unsplash.com/photo-1597117753473-9a20330f5fb7?w=200', connections: [2, 6] },
  // { name: 'China', x: 72, y: 35, avatar: 'https://images.unsplash.com/photo-1662690833162-c45cae0357fc?w=200', connections: [5, 11, 15, 17] },
  { name: 'India', x: 66, y: 42, avatar: 'https://images.unsplash.com/photo-1669787210388-1847b47bdc2e?w=200', connections: [10, 12] },
  // { name: 'Saudi Arabia', x: 57, y: 40, avatar: 'https://images.unsplash.com/photo-1597117752855-72fe20be3b39?w=200', connections: [11, 7] },
  { name: 'South Africa', x: 53, y: 60, avatar: 'https://images.unsplash.com/photo-1761052710052-b545a62720a9?w=200', connections: [4, 3] },
  { name: 'Peru', x: 27, y: 50, avatar: 'https://images.unsplash.com/photo-1752652012551-d7685a746058?w=200', connections: [8, 1] },
  // { name: 'Kenya', x: 56, y: 52, avatar: 'https://images.unsplash.com/photo-1644966825640-bf597f873b89?w=200', connections: [4, 10] },
  { name: 'Australia', x: 79, y: 57, avatar: 'https://images.unsplash.com/photo-1597117753473-9a20330f5fb7?w=200', connections: [10, 11, 18] },
  { name: 'Japan', x: 81, y: 35, avatar: 'https://images.unsplash.com/photo-1571270237703-6ac8a769ad7a?w=200', connections: [10, 16, 18] },
  { name: 'New Zealand', x: 86, y: 70, avatar: 'https://images.unsplash.com/photo-1584162607168-7cf2a46a57bf?w=200', connections: [16, 17] },
];

function GlobalConnectionMap() {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 1000);
    const timer2 = setTimeout(() => setAnimationStage(2), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
      {/* World Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          src="/world-map.png"
          alt="World Map"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Country markers with avatars */}
      {animationStage >= 1 &&
        countries.map((country, index) => (
          <motion.div
            key={country.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 200,
            }}
            className="absolute"
            style={{
              left: `${country.x}%`,
              top: `${country.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              {/* Pulsing ring */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
                className="absolute inset-0 rounded-full"
                style={{ width: '50px', height: '50px', margin: '-5px', background: 'rgba(96, 165, 250, 0.6)' }}
              />

              {/* Avatar circle */}
              <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                <Image
                  src={country.avatar}
                  alt={country.name}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="mesh-gradient"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight font-semibold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Square 1 Ai</span> The World's First AI-Powered Learn-to-Launch Platform
          </h1>
          <p className="text-slate-200 max-w-3xl mx-auto leading-relaxed text-lg md:text-xl mb-4">
            In a world where education is still one-size-fits-all, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Square 1 Ai</span> reimagines what it means to learn.
          </p>
          <div className="mt-4 max-w-2xl mx-auto">
            <TextType
              as="p"
              text={[
                "We're not just an edtech company we're building the future of learning, where AI becomes your personal teacher, mentor, and career accelerator.",
                "Transform your learning journey with AI-powered personalization that adapts to your pace and goals.",
                "Join the revolution where education meets innovation, and learners become creators."
              ]}
              typingSpeed={50}
              pauseDuration={3000}
              deletingSpeed={30}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              className="text-slate-300 text-base sm:text-lg md:text-xl text-center leading-relaxed"
              startOnVisible={true}
            />
          </div>
        </div>
      </section>

      {/* What We Are - Image Left, Text Right */}
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

      {/* Our Vision - Text Left, Image Right */}
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
              <Image 
                src="/about_pics/our-vision.png" 
                alt="Our Vision" 
                width={500}
                height={350}
                className="w-full h-auto max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission - Image Left, Text Right */}
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

      {/* How It Works - Text Left, Image Right */}
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

      {/* Why It Matters - Image Left, Text Right */}
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

      {/* AI-First Personalization - Text Left, Image Right */}
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
              <Image 
                src="/about_pics/personalization.png" 
                alt="AI-First Personalization" 
                width={500}
                height={350}
                className="w-full h-auto max-w-md md:ml-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Learning A Launchpad - Image Left, Text Right */}
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

      {/* Our Promise */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal
            as="h2"
            size="lg"
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
            size="md"
            align="center"
            variant="default"
            textClassName="text-slate-200 leading-relaxed mb-6 max-w-4xl mx-auto"
            containerClassName="mb-6"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.04}
          >
            We're redefining education as an AI-driven journey of discovery where every learner has the tools to think, build, and lead from day one.
          </ScrollReveal>
          <ScrollReveal
            size="lg"
            align="center"
            variant="default"
            textClassName="text-white font-bold max-w-3xl mx-auto"
            containerClassName="mb-4"
            enableBlur={true}
            baseOpacity={0.2}
            staggerDelay={0.03}
          >
            Because at Square 1 Ai, we don't just teach knowledge
          </ScrollReveal>
          <ScrollReveal
            size="xl"
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
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100">
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
            size="lg"
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
