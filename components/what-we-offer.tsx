"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export default function WhatWeOffer() {
  const features = [
    {
      icon: "🤖",
      title: "AI Powered Learning",
      subtitle: "Personalized education for every learner.",
      image: "../1-min.jpg",
      description: "Empowered by intelligent AI companions, our platform adapts to each student's goals, pace, and strengths. Whether you're learning for school, university, or professional growth, AI ensures your study experience is optimized for success.",
      keyFeatures: [
        "Smart Study Packs — automatically generate notes, quizzes, podcasts, and mind maps.",
        "Real-time feedback with detailed progress analytics.",
        "Adaptive learning paths that evolve as you learn and grow."
      ]
    },
    {
      icon: "💻",
      title: "Live & On Demand Courses",
      subtitle: "Learn anything, anytime  your way.",
      image: "../2-min.jpg",
      description: "Access an ever-expanding library of interactive lessons covering school subjects, university disciplines, and professional certifications. Each class includes an AI Study Pack summarizing lectures, key insights, and practice material.",
      keyFeatures: [
        "K–12: Math, Science, English, ICT, Arts, Business, and more.",
        "University: AI, Data Science, Finance, Engineering, Medicine, Law, and Arts.",
        "Professional: CFA, ACCA, PMP, Cloud, Cybersecurity, and Marketing.",
        "Corporate training for teams and organizations."
      ]
    },
    {
      icon: "🏆",
      title: "Competitions & Challenges",
      subtitle: "Learn by doing and get recognized for it.",
      image: "../3-min.jpg",
      description: "A global Kaggle-style hub where learners solve real-world challenges, compete for prizes, and build their portfolios.",
      keyFeatures: [
        "Weekly and monthly challenges in AI, Finance, Sustainability, Engineering, and Arts.",
        "Global leaderboards, verified certificates, and cash rewards.",
        "Company-sponsored challenges for internships and job opportunities."
      ]
    },
    {
      icon: "🧩",
      title: "Circle  The Learning Network",
      subtitle: "Your LinkedIn for learners and innovators.",
      image: "../4-min.jpg",
      description: "Build a verified learner profile to showcase your skills, courses, and achievements. Connect with peers, mentors, and employers in a vibrant learning ecosystem.",
      keyFeatures: [
        "Display your learning journey and project portfolio.",
        "Join communities, share posts, and collaborate.",
        "Get personalized career recommendations from the AI Career Match system.",
        "Allow companies to discover and recruit top learners directly."
      ]
    },
    {
      icon: "🧑‍🏫",
      title: "Mentorship & Collaboration",
      subtitle: "Guided growth through human + AI mentorship.",
      image: "../5-min.jpg",
      description: "Access a mentor marketplace with certified teachers and industry experts ready to guide you. Combine live mentorship sessions with the power of AI study assistance.",
      keyFeatures: [
        "One-on-one or group mentorship via built-in video calls and schedules.",
        "Project Pods for teamwork and collaborative innovation.",
        "24/7 AI Mentor for instant academic and career guidance."
      ]
    },
    {
      icon: "🚀",
      title: "Career & Startup Launchpad",
      subtitle: "Transform learning into life-changing opportunities.",
      image: "../6-min.jpg",
      description: "From internships to startup incubation, we bridge the gap between education and employment.",
      keyFeatures: [
        "Career Hub for internships, placements, and partnerships.",
        "Startup Club offering funding access and co-founder matching.",
        "AI Portfolio Builder — auto-generates your professional CV and portfolio.",
        "Annual Innovation Days and Global Career Fairs."
      ]
    },
    {
      icon: "🌐",
      title: "Community & Open-Source Projects",
      subtitle: "Learn, build, and impact together.",
      image: "../7-min.jpg",
      description: "Collaborate on open-source projects across global domains like AI, HealthTech, AgriTech, Finance, and Arts.",
      keyFeatures: [
        "Work with peers worldwide on real projects.",
        "Earn verified badges, contributor titles, and mentor recognition.",
        "Create a public impact portfolio that showcases your innovation."
      ]
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // Duplicate items for seamless loop
    const items = Array.from(scrollContainer.children)
    items.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement
      scrollContainer.appendChild(clone)
    })

    let animationFrameId: number
    let scrollPosition = 0
    let isPaused = false
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed
        
        const maxScroll = scrollContainer.scrollWidth / 2
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    const handleMouseEnter = () => {
      isPaused = true
    }

    const handleMouseLeave = () => {
      isPaused = false
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What We Offer
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            A Complete Ecosystem For Learning, Growth, And Career Success
          </p>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 flex-shrink-0 w-[350px] snap-center"
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Subtitle as description */}
                  <p className="text-gray-300 text-base leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>

                {/* Hover Description Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-y-auto p-8 flex flex-col justify-center">
                  <p className="text-gray-200 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
