"use client"

import Footer from "@/components/footer"
import { HeroSection } from "@/components/about/hero-section"
import { WhatWeAreSection } from "@/components/about/what-we-are-section"
import { VisionSection } from "@/components/about/vision-section"
import { MissionSection } from "@/components/about/mission-section"
import { HowItWorksSection } from "@/components/about/how-it-works-section"
import { WhyItMattersSection } from "@/components/about/why-it-matters-section"
import { AIPersonalizationSection } from "@/components/about/ai-personalization-section"
import { LaunchpadSection } from "@/components/about/launchpad-section"
import { PromiseSection } from "@/components/about/promise-section"
import { TaglineSection } from "@/components/about/tagline-section"



export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <HeroSection />
      <WhatWeAreSection />
      <VisionSection />
      <MissionSection />
      <HowItWorksSection />
      <WhyItMattersSection />
      <AIPersonalizationSection />
      <LaunchpadSection />
      <PromiseSection />
      <TaglineSection />
      <Footer />
    </div>
  )
}
