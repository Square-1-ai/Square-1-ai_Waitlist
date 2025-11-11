"use client"
import Image from "next/image"
import { Button } from "@/components/ui/moving-border"

export default function WaitlistBanner() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Blurred Background Image Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-600/20 to-blue-600/20 blur-3xl"
          style={{
            backgroundImage: 'radial-gradient(ellipse at top left, rgba(251, 146, 60, 0.3), transparent 50%), radial-gradient(ellipse at bottom right, rgba(147, 51, 234, 0.3), transparent 50%)',
          }}
        />
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image 
            src="/White.png" 
            alt="Square 1 Ai Logo" 
            width={400} 
            height={100}
            className="object-contain w-[150px] sm:w-[180px] md:w-[200px] h-auto"
          />
        </div>

        {/* Coming Soon Text */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
          Coming soon!
        </h2>

        {/* Waitlist Button */}
        <div className="flex justify-center">
          <Button
            borderRadius="1.75rem"
            onClick={scrollToTop}
            duration={3000}
            className="bg-slate-800/90 backdrop-blur-sm text-white border-slate-700/50 px-8 py-3.5 hover:bg-slate-700/90 transition-all duration-300"
            containerClassName="hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 text-base font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
              </svg>
              Join Waitlist
            </div>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  )
}
