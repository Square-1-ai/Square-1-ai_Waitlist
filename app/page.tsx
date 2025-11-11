"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import WaitlistForm from "@/components/waitlist-form"
import Footer from "@/components/footer"

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <Hero />
      {!formSubmitted && <WaitlistForm onSubmit={() => setFormSubmitted(true)} />}
      {formSubmitted && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 px-4">
          <div className="text-center max-w-md animate-fade-in">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-4">Thank You for Joining!</h2>
            <p className="text-lg text-blue-100 mb-8">
              Welcome to the Square 1 Ai waitlist! You'll receive early access updates and exclusive beta invites soon.
              Keep an eye on your inbox! 📧
            </p>
            <button
              onClick={() => setFormSubmitted(false)}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Another Entry
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
