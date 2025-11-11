"use client"
import { ChevronRight } from "lucide-react"
import TextType from "@/components/ui/text-type"
import BorderBeam from "@/components/border-beam"
import FallBeamBackground from "@/components/fall-beam-background"

export default function Hero() {
  return (
  <section id="why-join" className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Falling Beam Background Animation */}
      <FallBeamBackground 
        lineCount={25}
        beamColorClass="cyan-400"
        className="opacity-60"
      />
      
      {/* subtle stars/dots / decorative overlays */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-30" />
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_40%)] opacity-30 rounded-full pointer-events-none" /> */}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
  <div className="relative z-10 p-6 md:p-8 text-center">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance leading-tight"
            style={{ fontFamily: "'Inter Tight', 'Inter', 'Noto Sans JP', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
          >
            Learn. Teach. Build the Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Square 1 Ai
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-balance leading-relaxed text-background">
            Join the next generation of AI-powered learning — whether you're a student eager to grow or a teacher ready
            to inspire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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

        {/* Mock video / app screenshot card placed inside the same hero section */}
        <div className="flex justify-center mt-6">
          <div className="relative rounded-2xl bg-gradient-to-br from-[#0b1220] to-[#121212] border border-white/6 shadow-2xl w-full max-w-5xl overflow-hidden">
              <div>
                <div>
                  <div className="h-100 md:h-150 rounded-lg bg-gradient-to-br from-[#0f1724] to-[#111800] flex items-center justify-center relative group overflow-hidden">
                    {/* Animated border beam around the mock video area */}
                    <BorderBeam
                      size={100}
                      duration={20}
                      colorFrom="#172ad6ff"
                      colorTo="#60a5fa"
                      glowIntensity={3}
                      beamBorderRadius={20}
                      pauseOnHover
                      opacity={1.9}
                     className="-left-6 top-2"
                    />
                  </div>

                  
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
