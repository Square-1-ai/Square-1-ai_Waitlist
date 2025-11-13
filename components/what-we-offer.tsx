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
      icon: "💻",
      title: "Live & On Demand Courses",
      subtitle: "Learn anything, anytime — your way.",
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
      subtitle: "Learn by doing — and get recognized for it.",
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
      subtitle: "Learn, build, and impact — together.",
      description: "Collaborate on open-source projects across global domains like AI, HealthTech, AgriTech, Finance, and Arts.",
      keyFeatures: [
        "Work with peers worldwide on real projects.",
        "Earn verified badges, contributor titles, and mentor recognition.",
        "Create a public impact portfolio that showcases your innovation."
      ]
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
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm font-medium italic">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-white font-semibold mb-2 text-sm">Key Features:</p>
                    <ul className="space-y-2">
                      {feature.keyFeatures.map((item, idx) => (
                        <li key={idx} className="text-gray-300 text-sm leading-relaxed flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
