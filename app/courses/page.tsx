"use client"

import { useState } from "react"
import { BookOpen, Rocket, GraduationCap, Languages, Award, Building2, ChevronDown, ChevronUp } from "lucide-react"
import Footer from "@/components/footer"

export default function CoursesPage() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 leading-tight font-bold">
             The World's First AI-Powered Learn-to-Launch Platform 
          </h1>
          
          {/* Subheading/Description */}
          <p className="text-white text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed mb-4">
            These courses feed directly into our ecosystem: AI Study Packs, Projects & competitions, Circle (powerhouse
             for Learners), Career pathways, and Startup incubation
          </p>

        </div>
      </section>

      {/* Course Catalogue Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
               Square 1 Ai  Complete Course Catalogue
            </h2>
            <p className="text-slate-300 text-lg md:text-xl">
              Below is the full list categorized into 6 major streams.
            </p>
          </div>

          <div className="space-y-3">
            {courseCategories.map((category, index) => {
              const Icon = category.icon
              const isExpanded = expandedCategory === index
              return (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden transition-all duration-300 group bg-white"
                >
                  <div className="relative">
                    {/* Header - Clickable */}
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg">
                          <Icon className="w-8 h-8 text-blue-900" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-blue-900 text-left">
                          {category.displayTitle}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 p-2 rounded-lg">
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-blue-900" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-blue-900" />
                        )}
                      </div>
                    </button>

                    {/* Dropdown Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <div className="space-y-4">
                            {category.items.map((item, itemIndex) => {
                              const subtitle = 'subtitle' in item ? (item as { subtitle?: string }).subtitle : undefined
                              return (
                                <div key={itemIndex}>
                                  {subtitle && (
                                    <h4 className="text-lg font-semibold text-blue-600 mb-2 border-b border-blue-300 pb-1.5">
                                      {subtitle}
                                    </h4>
                                  )}
                                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {item.courses.map((course, courseIndex) => (
                                      <li
                                        key={courseIndex}
                                        className="text-blue-900 text-sm md:text-base flex items-start gap-2 py-2 px-3 rounded-md bg-white hover:bg-white/90 transition-colors shadow-sm"
                                      >
                                        <span className="text-blue-600 mt-1.5 flex-shrink-0">•</span>
                                        <span>{course}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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

      <Footer />
    </div>
  )
}

const courseCategories = [
  {
    title: "🟦 1. School (K–12) Courses",
    displayTitle: "School (K–12) Courses",
    icon: GraduationCap,
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
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
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    iconBg: "bg-blue-500/20",
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-400/40",
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
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    iconBg: "bg-blue-500/20",
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-400/40",
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
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    iconBg: "bg-blue-500/20",
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-400/40",
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
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    iconBg: "bg-blue-500/20",
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-400/40",
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
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    iconBg: "bg-blue-500/20",
    gradient: "from-blue-600/20 to-cyan-600/20",
    border: "border-blue-400/40",
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

