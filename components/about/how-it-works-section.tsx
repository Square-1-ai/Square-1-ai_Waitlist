'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Rocket } from 'lucide-react'

export function HowItWorksSection() {
  const stages = [
    {
      number: 1,
      title: "Learning",
      icon: BookOpen,
      color: "#3b82f6",
      bgColor: "bg-blue-500",
      description: "Enroll in courses (live or recorded) — school, university, professional, or language.",
      details: "Every class enhanced with AI: notes, Q&A stacks, mind maps, practice questions, further reading.",
      side: "left"
    },
    {
      number: 2,
      title: "Practical Application",
      icon: Lightbulb,
      color: "#06b6d4",
      bgColor: "bg-cyan-500",
      description: "After each course, complete real-world projects (case studies, coding projects, business challenges).",
      details: "Compete in quizzes, hackathons, and Kaggle-style competitions.",
      side: "right"
    },
    {
      number: 3,
      title: "Certification",
      icon: Rocket,
      color: "#10b981",
      bgColor: "bg-emerald-500",
      description: "Earn Square1 Ai Certificates backed by industry partnerships.",
      details: "Recognized for university admissions, professional CVs, and employer trust.",
      side: "left"
    },
    {
      number: 4,
      title: "Career Enablement",
      icon: Rocket,
      color: "#f59e0b",
      bgColor: "bg-amber-500",
      description: "Join career fairs hosted on Square1 Ai with partner companies.",
      details: "AI-powered CV & interview prep tools. Direct job placements through the Square1 Ai Career Hub.",
      side: "right"
    },
    {
      number: 5,
      title: "Startup Incubation",
      icon: Rocket,
      color: "#6366f1",
      bgColor: "bg-indigo-500",
      description: "Enter the Startup Club. Participate in Idea Generation Weeks & Startup Days.",
      details: "Get matched with mentors, co-founders, and investors. Access funding & incubation support (similar to Y Combinator).",
      side: "left"
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 md:px-6 py-2 bg-blue-100 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-blue-700 text-xs md:text-sm tracking-wide uppercase">Your Learning Path</span>
          </motion.div>
          <h1 className="mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold">
            How It Works
          </h1>
          <p className="text-slate-700 max-w-3xl mx-auto text-base md:text-lg px-4">
            At the heart of Square 1 Ai is an AI engine that tailors every step of the learning journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Left on mobile, center on desktop */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 md:w-1">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-blue-400 via-cyan-500 to-indigo-600 rounded-full shadow-lg"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-32">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              const isLeft = stage.side === "left"

              return (
                <motion.div
                  key={stage.number}
                  className="relative pl-12 md:pl-0"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.3, duration: 0.6 }}
                >
                  <div className={`flex flex-col md:flex-row md:items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-12`}>
                    {/* Content Card */}
                    <motion.div
                      className={`flex-1 w-full ${isLeft ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4'} text-left`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.3 }}
                    >
                      <div className={`bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-shadow duration-300 border-l-4 ${isLeft ? 'border-r-0' : 'border-l-0 border-r-4'}`} style={{ borderColor: stage.color }}>
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 justify-start">
                          <span className="text-xl md:text-2xl font-bold text-slate-300">Step {stage.number}</span>
                          <h2 className="mb-0 font-semibold text-lg md:text-xl" style={{ color: stage.color }}>
                            {stage.title}
                          </h2>
                        </div>
                        <p className="mt-2 text-slate-700 font-medium text-sm md:text-base">{stage.description}</p>
                        <p className="mt-2 text-slate-600 text-xs md:text-sm leading-relaxed">{stage.details}</p>
                      </div>
                    </motion.div>

                    {/* Circle with Icon */}
                    <motion.div
                      className="relative z-10 flex-shrink-0 -ml-8 md:ml-0"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + index * 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <div className="relative">
                        <div 
                          className="absolute inset-0 rounded-full blur-xl opacity-30"
                          style={{ backgroundColor: stage.color, width: '96px', height: '96px', left: '-8px', top: '-8px' }}
                        />
                        <div 
                          className={`relative w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl md:shadow-2xl ${stage.bgColor} ring-2 md:ring-4 ring-white`}
                        >
                          <Icon className="text-white w-6 h-6 md:w-9 md:h-9" strokeWidth={2.5} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Empty opposite side - only on desktop */}
                    <div className="hidden md:block flex-1"></div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Completion Badge */}
        <motion.div
          className="mt-16 md:mt-32 flex justify-center px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl text-center w-full max-w-md md:max-w-none">
            <h3 className="text-white mb-2 text-lg md:text-xl font-semibold">Start Your Journey</h3>
            <p className="text-blue-100 text-xs md:text-sm">Transform learning into success</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
