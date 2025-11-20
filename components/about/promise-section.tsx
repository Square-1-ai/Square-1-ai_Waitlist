import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function PromiseSection() {
  return (
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
  )
}
