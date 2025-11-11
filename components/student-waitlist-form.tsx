"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function StudentWaitlistForm({ onSubmit }: { onSubmit: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    internetConnection: "",
    devices: [] as string[],
    heardAbout: "",
    educationLevel: "",
    interests: "",
    learningMode: "",
    takenOnlineCourses: "",
    motivation: "",
    competitions: "",
    hoursPerWeek: "",
    willingToPay: "",
    referralCode: "",
    studentPreferences: [] as string[],
    communityChoice: "",
    notifyOnLive: false,
    consent: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleDeviceChange = (device: string) => {
    setFormData((prev) => ({
      ...prev,
      devices: prev.devices.includes(device) ? prev.devices.filter((d) => d !== device) : [...prev.devices, device],
    }))
  }

  const handlePreferenceChange = (pref: string) => {
    setFormData((prev) => ({
      ...prev,
      studentPreferences: prev.studentPreferences.includes(pref)
        ? prev.studentPreferences.filter((p) => p !== pref)
        : [...prev.studentPreferences, pref],
    }))
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.consent) {
      onSubmit()
    }
  }

  const getProgressPercentage = () => {
    return (step / 4) * 100
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-blue-900">Student Waitlist</h2>
            <span className="text-sm font-medium text-blue-700">Step {step} of 4</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Let's Start With Your Basic Info</h3>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    placeholder="Your country"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Your city"
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Internet Connection Quality *</label>
                <select
                  name="internetConnection"
                  value={formData.internetConnection}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select your connection quality</option>
                  <option value="strong">Strong (fiber or 4G/5G)</option>
                  <option value="moderate">Moderate (3G or shared Wi-Fi)</option>
                  <option value="weak">Weak (limited access)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-3">Preferred Devices *</label>
                <div className="space-y-2">
                  {["Smartphone", "Laptop / Desktop", "Tablet"].map((device) => (
                    <label key={device} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.devices.includes(device)}
                        onChange={() => handleDeviceChange(device)}
                        className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-blue-700">{device}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  How did you hear about Square 1 Ai? *
                </label>
                <select
                  name="heardAbout"
                  value={formData.heardAbout}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="referral">Referral</option>
                  <option value="teacher">Teacher</option>
                  <option value="school">School</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Learning Goals */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Tell us about your learning goals</h3>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Current Level of Education *</label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select your level</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="higher">Higher Education</option>
                  <option value="professional">Professional/Working</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Subjects or Areas of Interest *</label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Math, Science, Languages"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Preferred Learning Mode *</label>
                <select
                  name="learningMode"
                  value={formData.learningMode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="live">Live interactive classes</option>
                  <option value="recorded">Pre-recorded video lessons</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Have you taken online courses before? *
                </label>
                <select
                  name="takenOnlineCourses"
                  value={formData.takenOnlineCourses}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Why are you interested in joining Square 1 Ai? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  required
                  placeholder="Share your motivation..."
                  rows={4}
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Would you like to join competitions or challenges? *
                </label>
                <select
                  name="competitions"
                  value={formData.competitions}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="maybe">Maybe later</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Hours per week planned for learning *
                </label>
                <input
                  type="number"
                  name="hoursPerWeek"
                  value={formData.hoursPerWeek}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 5"
                  min="0"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Willingness to Pay (Monthly) *</label>
                <select
                  name="willingToPay"
                  value={formData.willingToPay}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select a range</option>
                  <option value="free">Free only</option>
                  <option value="under10">Under $10</option>
                  <option value="10-20">$10-20</option>
                  <option value="20-50">$20-50</option>
                  <option value="50plus">$50+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Referral Code (Optional)</label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  placeholder="Enter referral code (Invite 10 friends and get 25% off!)"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-3">Early Access Preferences</label>
                <div className="space-y-2">
                  {["AI Study Packs", "Live Class Demos", "Competitions", "Student Community"].map((pref) => (
                    <label key={pref} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.studentPreferences.includes(pref)}
                        onChange={() => handlePreferenceChange(pref)}
                        className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-blue-700">{pref}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Community & Preferences */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Join Our Community</h3>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Join the Square 1 Ai Community *</label>
                <select
                  name="communityChoice"
                  value={formData.communityChoice}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="discord">Discord</option>
                  <option value="slack">Slack</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="all">All of the above</option>
                </select>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="notifyOnLive"
                  checked={formData.notifyOnLive}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-blue-700">Notify me when the platform goes live</span>
              </label>

              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500 mt-1 flex-shrink-0"
                  />
                  <span className="text-blue-700 text-sm">
                    I agree to receive updates, early access info, and beta invites from Square 1 Ai. *
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Thank You Preview */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">You're All Set!</h3>
              <p className="text-blue-700 mb-6">
                Thank you for joining the Square 1 Ai student waitlist. You'll receive early access updates and
                exclusive beta invites soon. Keep an eye on your inbox! 📧
              </p>
              <p className="text-sm text-blue-600">Ready to submit?</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-blue-100">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border border-blue-300 text-blue-600 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 4 && (
              <button
                type="submit"
                disabled={!formData.consent}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Join the Waitlist!
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
