"use client"
import { ChevronRight, Shield, Brain, Users2, GraduationCap, Route } from "lucide-react"
import Image from "next/image"
import TextType from "@/components/ui/text-type"
import { cn } from "@/lib/utils"


export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Grid Background Effect */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"
          )}
        />
        
        {/* Blurred mesh gradients in 4 corners */}
        <div className="absolute top-10 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Radial gradient overlay for faded look */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative z-10 px-4 sm:px-6 md:px-8 text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 text-balance leading-tight px-2"
            style={{ fontFamily: "'Inter Tight', 'Inter', 'Noto Sans JP', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
          >
            Learn. Teach. Build the Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Square 1 Ai
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-lg lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-balance leading-relaxed text-slate-200 px-2">
            Join The Next Generation Of AI-Powered Learning Whether You're A Student Eager To Grow Or A Teacher Ready
            To Inspire.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 px-2">
            <a
              href="/student-waitlist"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-bold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Join as Student
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/teacher-waitlist"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Join as Teacher
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* <p className="text-sm text-blue-300 font-medium">
            <TextType
              text={["✨ Early access opens soon — be one of the first to join."]}
              typingSpeed={50}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          </p> */}
        </div>

          {/* Hero Image */}
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 px-2">
            <div className="relative rounded-xl sm:rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl">
              <Image 
                src="/Hero.png" 
                alt="Square 1 Ai Platform Preview" 
                width={1200} 
                height={675}
                className="w-full h-auto object-contain rounded-xl sm:rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Early Section - Separate Section */}
      <section id="why-join" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
        <div className="mt-0">
          <div className="text-center mb-12 sm:mb-16 px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Why Join{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
               Square 1 Ai
              </span>
               {" "}Early?</h2>
            <p className="text-base sm:text-lg text-blue-100 px-4">Get Exclusive Benefits And Shape The Future Of AI Learning</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 px-2">
            {[
              {
                icon: Shield,
                title: "Early Access to AI Study Packs",
                description: "Get first access to our cutting-edge AI-powered study materials",
              },
              {
                icon: Brain,
                title: "AI Powered Assessment Preparation",
                description: "Experience intelligent, adaptive learning that evolves with you",
              },
              {
                icon: Users2,
                title: "Join a Global Learning Community",
                description: "Connect with students and teachers from around the world",
              },
              {
                icon: GraduationCap,
                title: "Exclusive Tools for Teachers",
                description: "Unlock premium features designed to enhance your teaching",
              },
              {
                icon: Route,
                title: "Personalized Learning Paths",
                description: "AI tailors your learning journey to your goals and pace",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-200 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-400"
                >
                  <div className="mb-3 sm:mb-4">
                    <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 text-blue-900" />
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-xs sm:text-base text-blue-900">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>
    </>
  )
}
