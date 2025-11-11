"use client"
import { ChevronRight } from "lucide-react"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import TextType from "@/components/ui/text-type"

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <BackgroundRippleEffect />

      <div className="max-w-5xl mx-auto text-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative z-10 p-12 md:p-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight">
            Learn. Teach. Build the Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Square 1 Ai
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-balance leading-relaxed text-background">
            Join the next generation of AI-powered learning — whether you're a student eager to grow or a teacher ready
            to inspire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/student-waitlist"
              className="group px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Join as Student
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/teacher-waitlist"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Join as Teacher
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="text-sm text-blue-300 font-medium">
            <TextType
              text={["✨ Early access opens soon — be one of the first to join."]}
              typingSpeed={50}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          </p>
        </div>
      </div>
    </section>
  )
}
