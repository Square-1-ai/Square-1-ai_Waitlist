"use client"

import { useState } from "react"
import TeacherWaitlistForm from "@/components/teacher-waitlist-form"
import Footer from "@/components/footer"

export default function TeacherWaitlistPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = async (formData?: any) => {
    setFormSubmitted(true);

    if (formData) {
      try {
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            name: formData.fullName,
            role: 'teacher',
            newsletter: formData.newsletter,
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Newsletter subscription failed:', errorData);
        } else {
          console.log('Newsletter subscription successful');
        }
      } catch (err) {
        console.error('Newsletter subscription error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {!formSubmitted && <TeacherWaitlistForm onSubmit={handleFormSubmit} />}
      {formSubmitted && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 px-4">
          <div className="text-center max-w-md animate-fade-in">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Thank You for Joining!</h2>
            <p className="text-lg text-blue-700 mb-8">
              Welcome to the Square 1 Ai teacher waitlist! We're excited to partner with you. You'll receive early
              access updates and exclusive beta invites soon. Keep an eye on your inbox! 📧
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors"
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
