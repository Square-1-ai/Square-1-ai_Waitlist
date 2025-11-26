import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function TaglineSection() {
  return (
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
  )
}
