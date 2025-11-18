"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { 
  Brain, 
  Globe, 
  Video, 
  TrendingUp, 
  Award, 
  Users, 
  BookOpen, 
  Layout, 
  DollarSign,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  ChevronRight
} from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { cn } from "@/lib/utils"

export default function TeacherWaitlistPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const aiTools = [
    "AI-generated lecture notes",
    "AI-generated quizzes",
    "AI-generated mind maps",
    "AI-generated podcasts from your lessons",
    "AI-generated revision guides",
    "AI student learning outcome summaries",
    "Auto-created homework & questions",
    "AI-powered assessments",
    "Automatic class transcripts"
  ]

  const benefits = [
    { icon: Globe, title: "Earn globally", desc: "Payments via Stripe, local bank integrations" },
    { icon: Video, title: "Flexible teaching", desc: "Teach live or upload recorded courses" },
    { icon: TrendingUp, title: "Grow your brand", desc: "Build your presence on a global stage" },
    { icon: Users, title: "Global reach", desc: "Reach students from 30+ regions" },
    { icon: Layout, title: "Smart analytics", desc: "Get student analytics and performance insights" },
    { icon: Award, title: "Build reputation", desc: "Build your teacher profile with ratings and reviews" },
  ]

  const whoCanTeach = [
    "School teachers (K–12)",
    "University lecturers",
    "Subject experts",
    "Ed-tech tutors",
    "Industry professionals (AI, Finance, Medicine, Law, Engineering)"
  ]

  const subjects = [
    "School subjects (1–13)",
    "University courses",
    "Languages",
    "Professional certifications (CFA, ACCA, PMP, Cloud)",
    "Tech courses (AI, ML, Data Science, Cybersecurity)",
    "Business & Finance",
    "Arts, Law, Medicine",
    "Soft skills & career skills"
  ]

  const dashboardFeatures = [
    "Schedule classes",
    "Upload videos",
    "Track attendance",
    "Engage with students",
    "Review assignments",
    "View earnings",
    "Manage course content",
    "Monitor feedback and performance"
  ]

  const earningMethods = [
    { icon: Video, title: "Live class sessions", desc: "Earn per session" },
    { icon: BookOpen, title: "Pre-recorded courses", desc: "Passive income from sales" },
    { icon: Award, title: "Tip bonuses", desc: "Student appreciation" },
    { icon: Sparkles, title: "Special workshops", desc: "Premium pricing" },
    { icon: Users, title: "Corporate training", desc: "Upskilling programs" },
    { icon: TrendingUp, title: "Certifications", desc: "High-value courses" },
  ]

  const communityFeatures = [
    "Connect with fellow educators",
    "Join global teacher discussions",
    "Share tips, ideas, and teaching tools",
    "Access exclusive training sessions"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <p className="text-blue-400 text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                TEACH ON SQUARE 1 AI
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Teach the World with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Square 1 Ai
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Reach thousands of students, earn globally, and let AI handle the heavy work so you can focus on what you do best: teaching.
            </p>
            <a
              href="#apply"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Become a Teacher
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Teach With Us */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal
            as="h2"
            size="lg"
            align="center"
            variant="default"
            textClassName="text-blue-900 mb-6 font-bold"
            containerClassName="mb-8"
            enableBlur={true}
            baseOpacity={0.1}
            staggerDelay={0.03}
          >
            Why Teach With Us?
          </ScrollReveal>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
            Square 1 Ai gives teachers a powerful, tech-driven platform to teach students across the world. 
            From smart classrooms to AI-generated study materials, we help teachers grow their income, 
            expand their audience, and build their teaching brand.
          </p>
        </div>
      </section>

      {/* AI Tools for Teachers */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Teach Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI</span>
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              Our platform generates everything a teacher needs — automatically.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {aiTools.map((tool, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-blue-500/50 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200">{tool}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-xl text-blue-300 font-semibold">
            This makes teaching faster, easier, and more efficient.
          </p>
        </div>
      </section>

      {/* Benefits for Teachers */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              What You Get
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-blue-100"
              >
                <benefit.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl text-center">
            <p className="text-lg text-blue-900 font-semibold">
               Flexible schedule teach anytime, anywhere
            </p>
          </div>
        </div>
      </section>

      {/* Who Can Teach */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Who Can Teach?
            </h2>
            <p className="text-lg text-slate-200 mb-8">
              Teachers from all backgrounds are welcome:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {whoCanTeach.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-slate-200 text-lg">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center p-8 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-xl">
            <p className="text-xl text-blue-300 font-semibold">
              If you have experience and passion — you can teach here.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Teach */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              What You Can Teach
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              Square 1 Ai supports courses in:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {subjects.map((subject, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-blue-100"
              >
                <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{subject}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center p-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
            <p className="text-2xl text-white font-bold">
              👉 Your course. Your style. Your global classroom.
            </p>
          </div>
        </div>
      </section>

      {/* Teacher Dashboard */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              A Complete Teaching Workspace
            </h2>
            <p className="text-lg text-slate-200">
              Everything you need in one clean dashboard.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardFeatures.map((feature, index) => (
              <div 
                key={index}
                className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-blue-500/50 transition-colors text-center"
              >
                <Layout className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <span className="text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Earning */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
              Start Earning
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              Teachers earn through:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {earningMethods.map((method, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-blue-100"
              >
                <method.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-blue-900 mb-2">{method.title}</h3>
                <p className="text-slate-600">{method.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
            <p className="text-lg text-blue-900 font-semibold">
              💼 Competitive earnings with transparent revenue split.
            </p>
          </div>
        </div>
      </section>

      {/* Community for Teachers */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Community for Teachers <span className="text-cyan-400">(Teacher Circle)</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {communityFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg"
              >
                <MessageCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-200 text-lg">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center p-8 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-xl">
            <p className="text-xl text-blue-300 font-semibold">
              You teach the world — we support you.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="apply" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Teach the World?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Join thousands of educators building the future of learning.
          </p>
          
          {!formSubmitted ? (
            <div className="max-w-md mx-auto p-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Apply to Teach on Square 1 Ai</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  setFormSubmitted(true)
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <select
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Teaching Area</option>
                  <option value="school">School (K-12)</option>
                  <option value="university">University</option>
                  <option value="professional">Professional/Certification</option>
                  <option value="tech">Tech & Programming</option>
                  <option value="business">Business & Finance</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Tell us about your teaching experience..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Apply to Teach
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl animate-fade-in">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">Thank You for Applying!</h3>
              <p className="text-lg text-blue-700 mb-8">
                Welcome to the Square 1 Ai teacher community! We're excited to partner with you. You'll receive early
                access updates and exclusive beta invites soon. Keep an eye on your inbox! 📧
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors"
              >
                Back to Home
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
