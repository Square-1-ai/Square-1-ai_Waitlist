"use client"

import { CheckCircle2, Mail, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function EmailVerified() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <Navbar />
      
      {/* Main Content */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        


        <div className="max-w-4xl mx-auto relative z-10">
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-6">
                <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-center leading-tight">
            Email Successfully{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Verified!
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            Congratulations! Your email has been verified. You're now part of the Square 1 Ai community.
          </p>

          {/* Info Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8 hover:border-blue-400/50 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-3 flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What's Next?</h2>
                <p className="text-slate-300 leading-relaxed">
                  You're all set! We'll keep you updated with the latest news, exclusive early access opportunities, and important announcements about Square 1 Ai.
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 ml-16">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <p className="text-slate-200">Get early access to AI-powered study materials</p>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <p className="text-slate-200">Be the first to know when we launch</p>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <p className="text-slate-200">Unlock referral discounts and rewards for inviting friends</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Back to Home
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/courses"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Explore Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">
              Keep an eye on your inbox for updates. We can't wait to have you onboard! 🚀
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
