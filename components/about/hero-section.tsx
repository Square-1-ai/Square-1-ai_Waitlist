import TextType from "@/components/ui/text-type"

export function HeroSection() {
  return (
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
  )
}
