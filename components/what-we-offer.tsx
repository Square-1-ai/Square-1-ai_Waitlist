"use client"

export default function WhatWeOffer() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            <span className="text-4xl sm:text-5xl"></span> What We Offer
          </h2>
          <p className="text-base sm:text-lg text-blue-100 px-4">
            A Complete Ecosystem For Learning, Growth, And Career Success
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {/* 1. AI-Powered Learning */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex flex-col items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5zm-1.5 5v6.414l4.586 4.586 1.414-1.414-4-4v-5.586h-2z"/>
              </svg>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">AI-Powered Learning</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Personalized learning powered by AI that adapts to every student's goals, pace, and strengths.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Live & On-Demand Courses */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex flex-col items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Live & On-Demand Courses</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Learn anything, anytime — from school subjects to professional and university-level courses.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Competitions & Challenges */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex flex-col items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Competitions & Challenges</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Show your skills in global challenges with prizes, rankings, and real-world career visibility.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Circle - The Learning Network */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex flex-col items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Circle — The Learning Network</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Connect, share, and showcase your learning journey on a LinkedIn-style platform for students.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Mentorship & Collaboration */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex flex-col items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Mentorship & Collaboration</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Grow with expert mentors, AI assistants, and team projects that spark innovation.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Career & Startup Launchpad */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex flex-col items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
              </svg>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Career & Startup Launchpad</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Turn learning into real-world success through jobs, internships, and startup opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Community & Open-Source Projects */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex flex-col items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Community & Open-Source Projects</h3>
                <p className="text-sm sm:text-base text-blue-100">
                  Collaborate globally on open-source innovations that make real-world impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
