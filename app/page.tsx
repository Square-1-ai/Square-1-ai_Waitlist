"use client"

import Hero from "@/components/hero"
import WhatWeOffer from "@/components/what-we-offer"
import AboutUs from "@/components/about-us"
import WaitlistBanner from "@/components/waitlist-banner"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <Hero />
      <WhatWeOffer />
      <AboutUs />
      <WaitlistBanner />
      <Footer />
    </div>
  )
}
