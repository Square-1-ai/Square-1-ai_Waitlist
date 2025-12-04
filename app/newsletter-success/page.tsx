"use client"

import { PartyPopper, Bell, ArrowRight, Star, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function NewsletterSuccess() {
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
                <PartyPopper className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-center leading-tight">
            Welcome to Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Newsletter!
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            You've successfully subscribed! Get ready for exclusive insights, updates, and AI-powered learning tips delivered straight to your inbox.
          </p>

          {/* Info Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8 hover:border-blue-400/50 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-3 flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What You'll Receive</h2>
                <p className="text-slate-300 leading-relaxed">
                  As a newsletter subscriber, you'll be among the first to know about exciting developments at Square 1 Ai.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 ml-0 sm:ml-16">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Exclusive Content</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Access premium learning resources and insider tips before anyone else
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Feature Updates</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Be the first to discover new AI-powered tools and platform features
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Learning Tips</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Get expert advice on maximizing your learning potential with AI
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Launch Alerts</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Never miss important announcements and early access opportunities
                </p>
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
              href="/about"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm">
              Check your inbox for a welcome email. We're excited to have you in our community! 🎉
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
