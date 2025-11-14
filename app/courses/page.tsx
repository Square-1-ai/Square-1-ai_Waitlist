"use client"

import { useState } from "react"
import { BookOpen, Trophy, Users, Briefcase, Rocket, GraduationCap, Languages, Award, Building2, X } from "lucide-react"
import Footer from "@/components/footer"
import Image from "next/image"

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const ecosystemItems = [
    {
      icon: BookOpen,
      label: "AI Study Packs",
      gradient: "from-blue-600/20 to-cyan-600/20",
      border: "border-blue-400/40",
      hoverGradient: "hover:from-blue-600/30 hover:to-cyan-600/30",
      hoverBorder: "hover:border-blue-400/60"
    },
    {
      icon: Trophy,
      label: "Projects & Competitions",
      gradient: "from-purple-600/20 to-pink-600/20",
      border: "border-purple-400/40",
      hoverGradient: "hover:from-purple-600/30 hover:to-pink-600/30",
      hoverBorder: "hover:border-purple-400/60"
    },
    {
      icon: Users,
      label: "Circle Network",
      gradient: "from-green-600/20 to-emerald-600/20",
      border: "border-green-400/40",
      hoverGradient: "hover:from-green-600/30 hover:to-emerald-600/30",
      hoverBorder: "hover:border-green-400/60"
    },
    {
      icon: Briefcase,
      label: "Career Pathways",
      gradient: "from-orange-600/20 to-red-600/20",
      border: "border-orange-400/40",
      hoverGradient: "hover:from-orange-600/30 hover:to-red-600/30",
      hoverBorder: "hover:border-orange-400/60"
    },
    {
      icon: Rocket,
      label: "Startup Incubation",
      gradient: "from-indigo-600/20 to-violet-600/20",
      border: "border-indigo-400/40",
      hoverGradient: "hover:from-indigo-600/30 hover:to-violet-600/30",
      hoverBorder: "hover:border-indigo-400/60"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 leading-tight font-bold">
             The World's First AI-Powered Learn-to-Launch Platform 
          </h1>
          
          {/* Subheading/Description */}
          <p className="text-white text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            These courses feed directly into our ecosystem: AI Study Packs, Projects & competitions, Circle (powerhouse
             for Learners), Career pathways, and Startup incubation
          </p>

          {/* Ecosystem Items */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12">
            {ecosystemItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${item.border} bg-gradient-to-br ${item.gradient} backdrop-blur-sm text-white transition-all ${item.hoverGradient} ${item.hoverBorder} hover:scale-105`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm md:text-base font-medium">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Course Catalogue Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
               Square 1 Ai  Complete Course Catalogue
            </h2>
            <p className="text-slate-300 text-lg md:text-xl">
              Below is the full list categorized into 6 major streams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-xl p-6 hover:scale-105 transition-transform duration-300 flex flex-col overflow-hidden animated-gradient-border"
                >
                  
                  <div className="flex items-center gap-4 mb-6 flex-1">
                    {/* Icon/Image on the left */}
                    <div className="flex-shrink-0">
                      <Icon className="w-12 h-12 text-blue-600" />
                    </div>
                    
                    {/* Title on the right */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                        {category.displayTitle}
                      </h3>
                    </div>
                  </div>

                  {/* View all Courses Button */}
                  <button
                    onClick={() => setSelectedCategory(index)}
                    className="w-full bg-slate-100 text-slate-900 font-semibold py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors text-sm md:text-base border border-blue-300"
                  >
                    View all Courses
                  </button>
                </div>
              )
            })}
          </div>

          {/* Disclaimer */}
          <div className="text-center mt-8">
            <p className="text-slate-400 text-xs md:text-sm">
              These courses are subject to change. New courses will be added going forward.
            </p>
          </div>
        </div>
      </section>

      {/* Course Details Modal */}
      {selectedCategory !== null && (() => {
        const category = courseCategories[selectedCategory]
        const Icon = category.icon
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className={`${category.bgColor} p-6 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-white/10 backdrop-blur-sm ${category.iconBg}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {category.displayTitle}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {category.items.map((item, itemIndex) => {
                    const subtitle = 'subtitle' in item ? (item as { subtitle?: string }).subtitle : undefined
                    return (
                      <div key={itemIndex}>
                        {subtitle && (
                          <h3 className="text-lg font-semibold text-white mb-3">
                            {subtitle}
                          </h3>
                        )}
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {item.courses.map((course, courseIndex) => (
                            <li
                              key={courseIndex}
                              className="text-slate-300 text-sm md:text-base flex items-start gap-2"
                            >
                              <span className="text-slate-500 mt-1.5 flex-shrink-0">•</span>
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-700">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      <Footer />
    </div>
  )
}

const courseCategories = [
  {
    title: "🟦 1. School (K–12) Courses",
    displayTitle: "School (K–12) Courses",
    icon: GraduationCap,
    bgColor: "bg-gradient-to-br from-blue-700 to-blue-900",
    iconBg: "bg-blue-500/20",
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-400/40",
    items: [
      {
        subtitle: "Kindergarten – Grade 5",
        courses: [
          "Early Maths",
          "English Literacy",
          "Reading & Writing Skills",
          "Environmental Studies",
          "ICT Basics",
          "Art & Creativity",
          "General Knowledge",
          "Science Fundamentals"
        ]
      },
      {
        subtitle: "Grade 6 – Grade 9",
        courses: [
          "Mathematics",
          "Science",
          "English",
          "ICT / Computer Studies",
          "History",
          "Geography",
          "Civics",
          "Business & Accounting Fundamentals",
          "Literature",
          "Second Languages (Tamil, Sinhala, Hindi)"
        ]
      },
      {
        subtitle: "Grade 10 – Grade 13 (O/L & A/L)",
        courses: [
          "Mathematics",
          "Physics",
          "Chemistry",
          "Biology",
          "Combined Maths",
          "Business Studies",
          "Accounting",
          "Economics",
          "English Literature",
          "ICT / Computer Science",
          "Law",
          "History",
          "Geography",
          "Media Studies",
          "Political Science",
          "Agriculture",
          "Psychology",
          "Logic & Scientific Method"
        ]
      }
    ]
  },
  {
    title: "🟩 2. University & Higher Education Courses",
    displayTitle: "University & Higher Education Courses",
    icon: BookOpen,
    bgColor: "bg-gradient-to-br from-purple-700 to-purple-900",
    iconBg: "bg-purple-500/20",
    gradient: "from-green-600/20 to-emerald-600/20",
    border: "border-green-400/40",
    items: [
      {
        subtitle: "Computer Science & Engineering",
        courses: [
          "Artificial Intelligence",
          "Machine Learning",
          "Data Science",
          "Deep Learning & GenAI",
          "Computer Vision",
          "Robotics",
          "Software Engineering",
          "Networking",
          "Cybersecurity",
          "Cloud Computing (AWS, Azure, GCP)",
          "Full-Stack Development (React, Node, Python)",
          "DevOps",
          "Database Systems",
          "Web Development + Mobile App Development"
        ]
      },
      {
        subtitle: "Science & Medicine",
        courses: [
          "Human Anatomy",
          "Biochemistry",
          "Microbiology",
          "Physiology",
          "Public Health",
          "Pharmacology",
          "Genetics",
          "Environmental Science",
          "Psychology",
          "Nursing & Allied Health Basics",
          "Health Informatics"
        ]
      },
      {
        subtitle: "Business & Commerce",
        courses: [
          "Economics",
          "Corporate Finance",
          "Marketing",
          "Accounting",
          "Human Resource Management",
          "Banking",
          "Entrepreneurship",
          "Business Analytics",
          "International Business",
          "Operations Management",
          "Supply Chain & Logistics",
          "Strategic Management"
        ]
      },
      {
        subtitle: "Arts & Humanities",
        courses: [
          "Law",
          "Political Science",
          "Literature",
          "Philosophy",
          "History",
          "Sociology",
          "Media & Communication",
          "International Relations"
        ]
      }
    ]
  },
  {
    title: "🟨 3. Languages & Test Prep",
    displayTitle: "Languages & Test Prep",
    icon: Languages,
    bgColor: "bg-gradient-to-br from-green-700 to-green-900",
    iconBg: "bg-green-500/20",
    gradient: "from-yellow-600/20 to-amber-600/20",
    border: "border-yellow-400/40",
    items: [
      {
        subtitle: "Language Courses",
        courses: [
          "English",
          "Sinhala",
          "Tamil",
          "Hindi",
          "Bengali",
          "Arabic",
          "French",
          "German",
          "Mandarin",
          "Spanish"
        ]
      },
      {
        subtitle: "Language Learning (Duolingo-style)",
        courses: [
          "Grammar mastery",
          "Vocabulary builder",
          "Speaking practice with AI",
          "Listening & comprehension"
        ]
      },
      {
        subtitle: "Exam Preparation",
        courses: [
          "IELTS",
          "PTE",
          "TOEFL",
          "SAT",
          "GRE",
          "GMAT",
          "School exam prep (O/L, A/L, SSC, HSC, WAEC, KCSE)"
        ]
      }
    ]
  },
  {
    title: "🟥 4. Professional Qualifications",
    displayTitle: "Professional Qualifications",
    icon: Award,
    bgColor: "bg-gradient-to-br from-red-700 to-red-900",
    iconBg: "bg-red-500/20",
    gradient: "from-red-600/20 to-rose-600/20",
    border: "border-red-400/40",
    items: [
      {
        courses: [
          "CFA (Level 1, 2, 3)",
          "ACCA",
          "CIMA",
          "CA (Chartered Accounting)",
          "Banking Certifications",
          "PRINCE2",
          "PMP (Project Management)",
          "Six Sigma (Green & Black Belt)",
          "Digital Marketing Certifications",
          "Cloud Certs: AWS, Azure, Google Cloud",
          "Cybersecurity: CEH, CompTIA Security+",
          "Financial Modelling & Analytics"
        ]
      }
    ]
  },
  {
    title: "🟧 5. Specialized Learning Programs",
    displayTitle: "Specialized Learning Programs",
    icon: Rocket,
    bgColor: "bg-gradient-to-br from-orange-700 to-orange-900",
    iconBg: "bg-orange-500/20",
    gradient: "from-orange-600/20 to-red-600/20",
    border: "border-orange-400/40",
    items: [
      {
        subtitle: "Technology & AI",
        courses: [
          "GenAI Bootcamp",
          "Machine Learning Bootcamp",
          "Prompt Engineering",
          "AI App Development",
          "Python for Data Science",
          "R Programming",
          "TensorFlow/PyTorch Masterclass"
        ]
      },
      {
        subtitle: "Industry-Focused Tracks",
        courses: [
          "HealthTech",
          "AgriTech",
          "FinTech",
          "Climate Tech",
          "Insurance & Actuarial Science",
          "Hospitality & Tourism Analytics",
          "Retail & Consumer Behaviour"
        ]
      },
      {
        subtitle: "Skill Accelerators",
        courses: [
          "Communication & Public Speaking",
          "Leadership",
          "Personal Finance",
          "Career Building & Interview Prep",
          "Creative Writing",
          "Critical Thinking & Problem Solving"
        ]
      }
    ]
  },
  {
    title: "🟫 6. Corporate & Workforce Training",
    displayTitle: "Corporate & Workforce Training",
    icon: Building2,
    bgColor: "bg-gradient-to-br from-indigo-700 to-indigo-900",
    iconBg: "bg-indigo-500/20",
    gradient: "from-amber-600/20 to-yellow-600/20",
    border: "border-amber-400/40",
    items: [
      {
        courses: [
          "Sales Excellence",
          "B2B Tech Sales",
          "Modern Marketing",
          "Organizational Culture",
          "Leadership Development",
          "Root Cause Analysis",
          "Corporate AI Upskilling Programs",
          "Data Literacy for Teams",
          "Workplace Communication",
          "Productivity & Efficiency Training"
        ]
      }
    ]
  }
]

