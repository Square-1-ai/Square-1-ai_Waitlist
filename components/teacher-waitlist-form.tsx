"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function TeacherWaitlistForm({ onSubmit }: { onSubmit: () => void }) {
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
    subjects: "",
    teachingLevel: "",
    yearsExperience: "",
    classTypePreference: "",
    taughtOnline: "",
    platformsUsed: "",
    curriculums: "",
    createStudyPacks: "",
    availabilityToStart: "",
    revenueSplit: "",
    paymentMethod: "",
    teacherPreferences: [] as string[],
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
      teacherPreferences: prev.teacherPreferences.includes(pref)
        ? prev.teacherPreferences.filter((p) => p !== pref)
        : [...prev.teacherPreferences, pref],
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
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-cyan-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-blue-900">Teacher Waitlist</h2>
            <span className="text-sm font-medium text-blue-700">Step {step} of 4</span>
          </div>
          <div className="w-full bg-cyan-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
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
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
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
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
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
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
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
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
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
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
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
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
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
                        className="w-5 h-5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
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
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Teaching Experience */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Tell us about your teaching experience</h3>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Subjects or Topics You Teach *</label>
                <input
                  type="text"
                  name="subjects"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Mathematics, Physics, Language Arts"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Teaching Level *</label>
                <select
                  name="teachingLevel"
                  value={formData.teachingLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select a level</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="university">University</option>
                  <option value="professional">Professional</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Years of Experience *</label>
                <select
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select a range</option>
                  <option value="0-2">0–2 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="6-10">6–10 years</option>
                  <option value="10plus">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Class Type Preference *</label>
                <select
                  name="classTypePreference"
                  value={formData.classTypePreference}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="live">Live</option>
                  <option value="recorded">Pre-recorded</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Have you taught online before? *</label>
                <select
                  name="taughtOnline"
                  value={formData.taughtOnline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Platforms Used (if yes)</label>
                <input
                  type="text"
                  name="platformsUsed"
                  value={formData.platformsUsed}
                  onChange={handleInputChange}
                  placeholder="e.g., Zoom, Google Meet, Udemy"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Countries/Curriculums Taught *</label>
                <input
                  type="text"
                  name="curriculums"
                  value={formData.curriculums}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., US, IB, IGCSE"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Interested in Creating AI Study Packs? *
                </label>
                <select
                  name="createStudyPacks"
                  value={formData.createStudyPacks}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="maybe">Maybe later</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Business Details */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Business Details & Preferences</h3>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Availability to Start *</label>
                <select
                  name="availabilityToStart"
                  value={formData.availabilityToStart}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="immediately">Immediately</option>
                  <option value="month">Within a month</option>
                  <option value="months">Within 3 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Preferred Revenue Split *</label>
                <select
                  name="revenueSplit"
                  value={formData.revenueSplit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                >
                  <option value="">Select an option</option>
                  <option value="70/30">70/30</option>
                  <option value="65/35">65/35</option>
                  <option value="60/40">60/40</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Preferred Payment Method *</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Bank Transfer, PayPal, Crypto"
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-3">Early Access Preferences</label>
                <div className="space-y-2">
                  {["Teacher Dashboard Preview", "AI Study Pack Generator", "Marketing Tools", "Revenue Insights"].map(
                    (pref) => (
                      <label key={pref} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.teacherPreferences.includes(pref)}
                          onChange={() => handlePreferenceChange(pref)}
                          className="w-5 h-5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
                        />
                        <span className="text-blue-700">{pref}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Join the Square 1 Ai Community *</label>
                <select
                  name="communityChoice"
                  value={formData.communityChoice}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-blue-50"
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
                  className="w-5 h-5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span className="text-blue-700">Notify me when the platform goes live</span>
              </label>

              <div className="bg-cyan-50 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="w-5 h-5 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500 mt-1 flex-shrink-0"
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
                Thank you for joining the Square 1 Ai teacher waitlist. We're excited to partner with you. You'll
                receive early access updates and exclusive beta invites soon. Keep an eye on your inbox! 📧
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
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 4 && (
              <button
                type="submit"
                disabled={!formData.consent}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
