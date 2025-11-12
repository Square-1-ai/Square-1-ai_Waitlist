"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function WhatWeOffer() {
  const [currentPage, setCurrentPage] = useState(0)
  
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600">
          <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5zm-1.5 5v6.414l4.586 4.586 1.414-1.414-4-4v-5.586h-2z"/>
        </svg>
      ),
      title: "AI-Powered Learning",
      description: "Personalized learning powered by AI that adapts to every student's goals, pace, and strengths."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
        </svg>
      ),
      title: "Live & On-Demand Courses",
      description: "Learn anything, anytime — from school subjects to professional and university-level courses."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Competitions & Challenges",
      description: "Show your skills in global challenges with prizes, rankings, and real-world career visibility."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      title: "Circle — The Learning Network",
      description: "Connect, share, and showcase your learning journey on a LinkedIn-style platform for students."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      ),
      title: "Mentorship & Collaboration",
      description: "Grow with expert mentors, AI assistants, and team projects that spark innovation."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
        </svg>
      ),
      title: "Career & Startup Launchpad",
      description: "Turn learning into real-world success through jobs, internships, and startup opportunities."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      title: "Community & Open-Source Projects",
      description: "Collaborate globally on open-source innovations that make real-world impact."
    }
  ]

  const cardsPerPage = 4
  const totalPages = Math.ceil(features.length / cardsPerPage)
  const startIndex = currentPage * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const currentFeatures = features.slice(startIndex, endIndex)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            <span className="text-4xl sm:text-5xl"></span> What We Offer
          </h2>
          <p className="text-base sm:text-lg text-slate-700 px-4">
            A Complete Ecosystem For Learning, Growth, And Career Success
          </p>
        </div>

        {/* Features Grid with Pagination */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-slate-50 border border-slate-200"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>
          
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-slate-50 border border-slate-200"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2">
            {currentFeatures.map((feature, index) => (
              <div
                key={startIndex + index}
                className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-start gap-3">
                  {feature.icon}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "bg-blue-600 w-8"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
