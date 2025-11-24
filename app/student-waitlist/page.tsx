"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import StudentWaitlistForm from "@/components/student-waitlist-form"
import Footer from "@/components/footer"

export default function StudentWaitlistPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        router.push("/")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [formSubmitted, router])

  return (
    <div className="min-h-screen bg-[#141e30]">
      {!formSubmitted && (
        <div className="text-white">
          <StudentWaitlistForm onSubmit={() => setFormSubmitted(true)} />
        </div>
      )}
      {formSubmitted && (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#141e30]">
          <div className="text-center max-w-md animate-fade-in text-white">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold mb-4">Thank You for Joining!</h2>
            <p className="text-lg mb-8">
              Welcome to the Square 1 Ai student waitlist! You'll receive early access updates and exclusive beta
              invites soon. Keep an eye on your inbox! 📧
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
