"use client"

import { useState } from "react"
import StudentWaitlistForm from "@/components/student-waitlist-form"
import Footer from "@/components/footer"

export default function StudentWaitlistPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {!formSubmitted && <StudentWaitlistForm onSubmit={() => setFormSubmitted(true)} />}
      {formSubmitted && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4">
          <div className="text-center max-w-md animate-fade-in">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Thank You for Joining!</h2>
            <p className="text-lg text-blue-700 mb-8">
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
