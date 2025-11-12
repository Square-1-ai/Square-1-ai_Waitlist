"use client"

export default function WhatWeOffer() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            <span className="text-4xl sm:text-5xl">🎓</span> What We Offer
          </h2>
          <p className="text-base sm:text-lg text-blue-100 px-4">
            A Complete Ecosystem For Learning, Growth, And Career Success
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-8 sm:space-y-12 px-2">
          {/* 1. AI-Powered Learning */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">�</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">AI-Powered Learning</h3>
                <p className="text-base sm:text-lg text-blue-100">
                  Personalized learning powered by AI that adapts to every student's goals, pace, and strengths.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Live & On-Demand Courses */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">💻</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Live & On-Demand Courses</h3>
                <p className="text-base sm:text-lg text-blue-100">
                  Learn anything, anytime — from school subjects to professional and university-level courses.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Competitions & Challenges */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">🏆</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Competitions & Challenges</h3>
                <p className="text-base sm:text-lg text-blue-100">
                  Show your skills in global challenges with prizes, rankings, and real-world career visibility.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Circle - The Learning Network */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">🧩</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Circle — The Learning Network</h3>
                <p className="text-base sm:text-lg text-blue-100">
                  Connect, share, and showcase your learning journey on a LinkedIn-style platform for students.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Mentorship & Collaboration */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">🧑‍🏫</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Mentorship & Collaboration</h3>
                <p className="text-base sm:text-lg text-blue-100">
                  Grow with expert mentors, AI assistants, and team projects that spark innovation.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Career & Startup Launchpad */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">🚀</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Career & Startup Launchpad</h3>
                <p className="text-base sm:text-lg text-blue-100">
                  Turn learning into real-world success through jobs, internships, and startup opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Community & Open-Source Projects */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-700/40 to-slate-800/40 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl">🌐</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Community & Open-Source Projects</h3>
                <p className="text-base sm:text-lg text-blue-100">
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
