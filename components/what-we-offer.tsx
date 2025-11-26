"use client"

import { useEffect, useRef, useState } from "react"
import { Brain, Video, Trophy, Users, GraduationCap, Rocket, Globe, ChevronLeft, ChevronRight } from "lucide-react"

export default function WhatWeOffer() {
  // Features for the scrolling cards (existing)
  const features = [
    {
      icon: Brain,
      title: "AI Powered Learning",
      subtitle: "Personalized education for every learner.",
      description: "Empowered by intelligent AI companions, our platform adapts to each student's goals, pace, and strengths. Whether you're learning for school, university, or professional growth, AI ensures your study experience is optimized for success.",
      keyFeatures: [
        "Smart Study Packs — automatically generate notes, quizzes, podcasts, and mind maps.",
        "Real-time feedback with detailed progress analytics.",
        "Adaptive learning paths that evolve as you learn and grow."
      ]
    },
    {
      icon: Video,
      title: "Live & On Demand Courses",
      subtitle: "Learn anything, anytime  your way.",
      description: "Access an ever-expanding library of interactive lessons covering school subjects, university disciplines, and professional certifications. Each class includes an AI Study Pack summarizing lectures, key insights, and practice material.",
      keyFeatures: [
        "K–12: Math, Science, English, ICT, Arts, Business, and more.",
        "University: AI, Data Science, Finance, Engineering, Medicine, Law, and Arts.",
        "Professional: CFA, ACCA, PMP, Cloud, Cybersecurity, and Marketing.",
        "Corporate training for teams and organizations."
      ]
    },
    {
      icon: Trophy,
      title: "Competitions & Challenges",
      subtitle: "Learn by doing and get recognized for it.",
      description: "A global Kaggle-style hub where learners solve real-world challenges, compete for prizes, and build their portfolios.",
      keyFeatures: [
        "Weekly and monthly challenges in AI, Finance, Sustainability, Engineering, and Arts.",
        "Global leaderboards, verified certificates, and cash rewards.",
        "Company-sponsored challenges for internships and job opportunities."
      ]
    },
    {
      icon: Users,
      title: "Circle  The Learning Network",
      subtitle: "Your LinkedIn for learners and innovators.",
      description: "Build a verified learner profile to showcase your skills, courses, and achievements. Connect with peers, mentors, and employers in a vibrant learning ecosystem.",
      keyFeatures: [
        "Display your learning journey and project portfolio.",
        "Join communities, share posts, and collaborate.",
        "Get personalized career recommendations from the AI Career Match system.",
        "Allow companies to discover and recruit top learners directly."
      ]
    },
    {
      icon: GraduationCap,
      title: "Mentorship & Collaboration",
      subtitle: "Guided growth through human + AI mentorship.",
      description: "Access a mentor marketplace with certified teachers and industry experts ready to guide you. Combine live mentorship sessions with the power of AI study assistance.",
      keyFeatures: [
        "One-on-one or group mentorship via built-in video calls and schedules.",
        "Project Pods for teamwork and collaborative innovation.",
        "24/7 AI Mentor for instant academic and career guidance."
      ]
    },
    {
      icon: Rocket,
      title: "Career & Startup Launchpad",
      subtitle: "Transform learning into life-changing opportunities.",
      description: "From internships to startup incubation, we bridge the gap between education and employment.",
      keyFeatures: [
        "Career Hub for internships, placements, and partnerships.",
        "Startup Club offering funding access and co-founder matching.",
        "AI Portfolio Builder — auto-generates your professional CV and portfolio.",
        "Annual Innovation Days and Global Career Fairs."
      ]
    },
    {
      icon: Globe,
      title: "Community & Open-Source Projects",
      subtitle: "Learn, build, and impact together.",
      description: "Collaborate on open-source projects across global domains like AI, HealthTech, AgriTech, Finance, and Arts.",
      keyFeatures: [
        "Work with peers worldwide on real projects.",
        "Earn verified badges, contributor titles, and mentor recognition.",
        "Create a public impact portfolio that showcases your innovation."
      ]
    },
    {
      icon: Globe,
      title: "Community & Open-Source Projects",
      subtitle: "Learn, build, and impact together.",
      description: "Collaborate on open-source projects across global domains like AI, HealthTech, AgriTech, Finance, and Arts.",
      keyFeatures: [
        "Work with peers worldwide on real projects.",
        "Earn verified badges, contributor titles, and mentor recognition.",
        "Create a public impact portfolio that showcases your innovation."
      ]
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  // Navigation logic for arrows
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    scrollToCard(currentIndex === 0 ? features.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    scrollToCard(currentIndex === features.length - 1 ? 0 : currentIndex + 1);
  };

  const scrollToCard = (idx: number) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const cardWidth = 350 + 24; // card width + gap (w-[350px] + gap-6)
    scrollContainer.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // Only auto-scroll and duplicate for desktop
    const isMobile = window.innerWidth < 768
    let animationFrameId: number
    let scrollPosition = 0
    let isPaused = false
    const scrollSpeed = 1.0 // pixels per frame

    if (!isMobile) {
      // Duplicate items for seamless loop
      const items = Array.from(scrollContainer.children)
      if (items.length === features.length) {
        items.forEach(item => {
          const clone = item.cloneNode(true) as HTMLElement
          scrollContainer.appendChild(clone)
        })
      }
    }

    const animate = () => {
      if (!isPaused && scrollContainer && !isMobile) {
        scrollPosition += scrollSpeed
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
        scrollContainer.scrollLeft = scrollPosition
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    if (!isMobile) {
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseEnter = () => { isPaused = true }
    const handleMouseLeave = () => { isPaused = false }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    // Mobile: track scroll to update activeIndex
    const handleScroll = () => {
      if (isMobile) {
        const cardWidth = 350 + 24 // card width + gap (w-[350px] + gap-6)
        const idx = Math.round(scrollContainer.scrollLeft / cardWidth)
        setActiveIndex(Math.min(Math.max(idx, 0), features.length - 1))
      }
    }
    if (isMobile) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      if (isMobile) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [features.length])


  // Mobile & desktop: scroll to card when dot is clicked
  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
    scrollToCard(idx);
  };

  return (
    <>
      {/* New Section: Teach Smarter with AI */}
      <section className="w-full bg-[#10192B] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-2">
            What We Offer
          </h2>
          <p className="text-lg text-gray-300 text-center mb-10">
           A Complete Ecosystem For Learning, Growth, And Career Success
          </p>
          {/* First row: first 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-6">
            {[
              'AI Powered Learning',
              'Live & On Demand Courses',
              'Competitions & Challenges',
            ].map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-[#10192B] border border-[#1E293B] rounded-xl px-6 py-5 shadow-sm"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#0ea5e9" fillOpacity="0.12"/><path d="M8.5 12.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-white text-base font-medium">{item}</span>
              </div>
            ))}
          </div>
          {/* Second row: next 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-6">
            {[
              'Circle The Learning Network',
              'Mentorship & Collaboration',
              'Career & Startup Launchpad',
            ].map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-[#10192B] border border-[#1E293B] rounded-xl px-6 py-5 shadow-sm"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#0ea5e9" fillOpacity="0.12"/><path d="M8.5 12.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-white text-base font-medium">{item}</span>
              </div>
            ))}
          </div>
          {/* Third row: last card centered */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 bg-[#10192B] border border-[#1E293B] rounded-xl px-6 py-5 shadow-sm">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#0ea5e9" fillOpacity="0.12"/><path d="M8.5 12.5l2 2 5-5" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-white text-base font-medium">Community & Open-Source Projects</span>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

