"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/footer"

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
].sort()

export default function FeedbackPage() {
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
    aiToolsExpectation: "",
    learningProgressTracking: "",
    courseTypes: "",
    favoriteCourses: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      })
    }
    if (error) {
      setError(null)
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.country.trim()) {
      errors.country = "Country is required"
    }

    if (!formData.message.trim()) {
      errors.message = "Feedback message is required"
    }

    if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    if (formData.message.trim().length < 10) {
      errors.message = "Feedback message must be at least 10 characters"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: "Email Already Used",
            description: data.error || "This email has already submitted feedback",
            variant: "destructive"
          })
          setError(data.error)
        } else {
          throw new Error(data.error || "Failed to submit feedback. Please try again.")
        }
        return
      }

      toast({
        title: "Success!",
        description: "Feedback submitted successfully! Thank you for your input.",
        variant: "default"
      })
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          country: "",
          message: "",
          aiToolsExpectation: "",
          learningProgressTracking: "",
          courseTypes: "",
          favoriteCourses: "",
        })
        setFieldErrors({})
        setError(null)
      }, 3000)
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : "An error occurred while submitting your feedback. Please try again."
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive"
      })
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
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
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}

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
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      fieldErrors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600"
                    }`}
                    placeholder="Enter your name"
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      fieldErrors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600"
                    }`}
                    placeholder="Enter your email"
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Country Field */}
                <div>
                  <label htmlFor="country" className="block text-white font-semibold mb-2">
                    Country <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 pr-10 bg-slate-900/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer ${
                        fieldErrors.country
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-600"
                      }`}
                    >
                      <option value="" disabled className="bg-slate-900 text-slate-400">
                        Select your country
                      </option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country} className="bg-slate-900 text-white">
                          {country}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                  {fieldErrors.country && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.country}</p>
                  )}
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
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                      fieldErrors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-600"
                    }`}
                    placeholder="Share your thoughts, suggestions, or concerns..."
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
                  )}
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
                  disabled={isSubmitting}
                  className="w-full group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Feedback
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
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
