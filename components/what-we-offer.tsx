"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function WhatWeOffer() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Learning",
      description: "Personalized learning powered by AI that adapts to every student's goals, pace, and strengths.",
    },
    {
      icon: "💻",
      title: "Live & On-Demand Courses",
      description: "Learn anything, anytime — from school subjects to professional and university-level courses.",
    },
    {
      icon: "🏆",
      title: "Competitions & Challenges",
      description: "Show your skills in global challenges with prizes, rankings, and real-world career visibility.",
    },
    {
      icon: "🧩",
      title: "Circle — The Learning Network",
      description: "Connect, share, and showcase your learning journey on a LinkedIn-style platform for students.",
    },
    {
      icon: "🧑‍🏫",
      title: "Mentorship & Collaboration",
      description: "Grow with expert mentors, AI assistants, and team projects that spark innovation.",
    },
    {
      icon: "🚀",
      title: "Career & Startup Launchpad",
      description: "Turn learning into real-world success through jobs, internships, and startup opportunities.",
    },
    {
      icon: "🌐",
      title: "Community & Open-Source Projects",
      description: "Collaborate globally on open-source innovations that make real-world impact.",
    },
  ]

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What We Offer
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            A Complete Ecosystem For Learning, Growth, And Career Success
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {features.map((feature, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <span className="text-lg font-semibold text-white">
                  {feature.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
