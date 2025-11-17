"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    message: "",
    aiToolsExpectation: "",
    learningProgressTracking: "",
    courseTypes: "",
    favoriteCourses: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Feedback submitted:", formData)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        country: "",
        message: "",
        aiToolsExpectation: "",
        learningProgressTracking: "",
        courseTypes: "",
        favoriteCourses: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            We Value Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Feedback
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Help us improve Square 1 Ai by sharing your thoughts, suggestions, and experiences.
          </p>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="relative pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Share Your Feedback
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 sm:p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20 text-green-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Thank You!</h3>
                <p className="text-slate-300 text-base sm:text-lg">
                  Your feedback has been submitted successfully. We appreciate your input!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Country Field */}
                <div>
                  <label htmlFor="country" className="block text-white font-semibold mb-2">
                    Country <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your country"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Your Feedback <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share your thoughts, suggestions, or concerns..."
                  />
                </div>

                {/* AI Tools Expectation Field */}
                <div>
                  <label htmlFor="aiToolsExpectation" className="block text-white font-semibold mb-2">
                    How do you expect AI tools to make your learning experience easier?
                  </label>
                  <textarea
                    id="aiToolsExpectation"
                    name="aiToolsExpectation"
                    value={formData.aiToolsExpectation}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share your expectations about AI tools in learning..."
                  />
                </div>

                {/* Learning Progress Tracking Field */}
                <div>
                  <label htmlFor="learningProgressTracking" className="block text-white font-semibold mb-2">
                    How would you like to track and monitor your learning progress?
                  </label>
                  <textarea
                    id="learningProgressTracking"
                    name="learningProgressTracking"
                    value={formData.learningProgressTracking}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe how you'd like to track your learning progress..."
                  />
                </div>

                {/* Course Types Field */}
                <div>
                  <label htmlFor="courseTypes" className="block text-white font-semibold mb-2">
                    What types of courses are you interested in?
                  </label>
                  <textarea
                    id="courseTypes"
                    name="courseTypes"
                    value={formData.courseTypes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about the types of courses you're interested in..."
                  />
                </div>

                {/* Favorite Courses Field */}
                <div>
                  <label htmlFor="favoriteCourses" className="block text-white font-semibold mb-2">
                    Which specific courses or topics do you enjoy the most?
                  </label>
                  <textarea
                    id="favoriteCourses"
                    name="favoriteCourses"
                    value={formData.favoriteCourses}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Share your favorite courses or topics..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Submit Feedback
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Your feedback helps us create a better learning experience for everyone. Thank you for being part of our community!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
