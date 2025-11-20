'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Rocket } from 'lucide-react'

export function HowItWorksSection() {
  const stages = [
    {
      number: 1,
      title: "Learn",
      icon: BookOpen,
      color: "#3b82f6",
      bgColor: "bg-blue-500",
      description: "Interactive courses enhanced with AI Study Packs (notes, mind maps, quizzes, podcasts).",
      side: "left"
    },
    {
      number: 2,
      title: "Apply",
      icon: Lightbulb,
      color: "#06b6d4",
      bgColor: "bg-cyan-500",
      description: "Real-world projects and competitions driven by data, innovation, and problem-solving.",
      side: "right"
    },
    {
      number: 3,
      title: "Launch",
      icon: Rocket,
      color: "#6366f1",
      bgColor: "bg-indigo-500",
      description: "AI-assisted career guidance, portfolio building, and startup incubation through our innovation network.",
      side: "left"
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 bg-blue-100 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-blue-700 text-sm tracking-wide uppercase">Your Learning Path</span>
          </motion.div>
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-4xl md:text-5xl font-bold">
            How It Works
          </h1>
          <p className="text-slate-700 max-w-3xl mx-auto text-lg">
            At the heart of Square 1 Ai is an AI engine that tailors every step of the learning journey
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-blue-400 via-cyan-500 to-indigo-600 rounded-full shadow-lg"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-32">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              const isLeft = stage.side === "left"

              return (
                <motion.div
                  key={stage.number}
                  className="relative"
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.3, duration: 0.6 }}
                >
                  <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-12`}>
                    {/* Content Card */}
                    <motion.div
                      className={`flex-1 ${isLeft ? 'text-right pr-4' : 'text-left pl-4'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.3 }}
                    >
                      <div className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-l-4 ${isLeft ? 'border-r-0' : 'border-l-0 border-r-4'}`} style={{ borderColor: stage.color }}>
                        <h2 className="mb-0 font-semibold text-xl" style={{ color: stage.color }}>
                          {stage.title}
                        </h2>
                        <p className="mt-2 text-slate-600">{stage.description}</p>
                      </div>
                    </motion.div>

                    {/* Circle with Icon */}
                    <motion.div
                      className="relative z-10 flex-shrink-0"
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
                          className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl ${stage.bgColor} ring-4 ring-white`}
                        >
                          <Icon className="text-white" size={36} strokeWidth={2.5} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Empty opposite side */}
                    <div className="flex-1"></div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Completion Badge */}
        <motion.div
          className="mt-32 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-6 rounded-2xl shadow-2xl text-center">
            <h3 className="text-white mb-2 text-xl font-semibold">Start Your Journey</h3>
            <p className="text-blue-100 text-sm">Transform learning into success</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
