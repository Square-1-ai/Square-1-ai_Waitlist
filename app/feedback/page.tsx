"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/footer"
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from "@/components/ui/three-d-scroll-trigger"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  
  // Sample feedback data - Replace with actual data from your backend
  const existingFeedback = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      category: "UI/UX Feedback",
      message: "The interface is incredibly intuitive! The AI-powered learning features are exactly what students need. Looking forward to the full launch!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      category: "Feature Request",
      message: "Love the concept! Would be great to see more collaborative features for group study sessions. The platform has huge potential.",
      date: "5 days ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 4,
      category: "General Feedback",
      message: "Really impressed with the personalized learning paths. The AI study packs are a game-changer for exam preparation!",
      date: "1 week ago"
    },
    {
      id: 4,
      name: "David Park",
      rating: 5,
      category: "Content Suggestion",
      message: "As a teacher, I'm excited about the tools for educators. The ability to create custom AI-powered content will revolutionize how we teach.",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Jessica Williams",
      rating: 5,
      category: "General Feedback",
      message: "Amazing platform! The AI tutoring is like having a personal mentor available 24/7. This will change education forever.",
      date: "2 weeks ago"
    },
    {
      id: 6,
      name: "Alex Thompson",
      rating: 4,
      category: "Feature Request",
      message: "The competition features are fantastic for motivation. Would love to see more team challenges and collaborative projects!",
      date: "2 weeks ago"
    }
  ]

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

      {/* Existing Feedback Section */}
      <section className="relative pb-8 md:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            What Others Are Saying
          </h2>
          <ThreeDScrollTriggerContainer>
            <ThreeDScrollTriggerRow baseVelocity={2} direction={1} className="mb-4">
              {existingFeedback.slice(0, 2).map((feedback) => (
                <Dialog key={feedback.id}>
                  <DialogTrigger asChild>
                    <button className="bg-slate-800 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-blue-500/50 transition-all duration-300 mr-4 w-[400px] flex-shrink-0 cursor-pointer text-left">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{feedback.name}</h3>
                          <p className="text-sm text-slate-400">{feedback.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                          {feedback.category}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-normal">
                        {feedback.message}
                      </p>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Send us your feedback</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Help us improve Square 1 Ai by sharing your thoughts and suggestions.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your country"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="Share your thoughts, suggestions, or concerns..."
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        Send Feedback
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              ))}
            </ThreeDScrollTriggerRow>
            <ThreeDScrollTriggerRow baseVelocity={2} direction={-1} className="mb-4">
              {existingFeedback.slice(2, 4).map((feedback) => (
                <Dialog key={feedback.id}>
                  <DialogTrigger asChild>
                    <button className="bg-slate-800 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-blue-500/50 transition-all duration-300 mr-4 w-[400px] flex-shrink-0 cursor-pointer text-left">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{feedback.name}</h3>
                          <p className="text-sm text-slate-400">{feedback.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                          {feedback.category}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-normal">
                        {feedback.message}
                      </p>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Send us your feedback</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Help us improve Square 1 Ai by sharing your thoughts and suggestions.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your country"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="Share your thoughts, suggestions, or concerns..."
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        Send Feedback
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              ))}
            </ThreeDScrollTriggerRow>
            <ThreeDScrollTriggerRow baseVelocity={2} direction={1}>
              {existingFeedback.slice(4).map((feedback) => (
                <Dialog key={feedback.id}>
                  <DialogTrigger asChild>
                    <button className="bg-slate-800 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-blue-500/50 transition-all duration-300 mr-4 w-[400px] flex-shrink-0 cursor-pointer text-left">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{feedback.name}</h3>
                          <p className="text-sm text-slate-400">{feedback.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                          {feedback.category}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-normal">
                        {feedback.message}
                      </p>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Send us your feedback</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Help us improve Square 1 Ai by sharing your thoughts and suggestions.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your country"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="Share your thoughts, suggestions, or concerns..."
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                        Send Feedback
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              ))}
            </ThreeDScrollTriggerRow>
          </ThreeDScrollTriggerContainer>
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
