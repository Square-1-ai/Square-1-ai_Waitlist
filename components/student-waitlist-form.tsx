"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import StudentWaitlistAnimation from "@/components/student-waitlist-animation"

export default function StudentWaitlistForm({ onSubmit }: { onSubmit: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Common Section
    fullName: "",
    email: "",
    country: "",
    city: "",
    internetConnection: "",
    devices: [] as string[],
    heardAbout: "",
    // Student Profile
    educationLevel: "",
    subjects: [] as string[],
    learningPreference: "",
    takenOnlineCourses: "",
    whyInterested: [] as string[],
    motivation: "",
    competitions: "",
    hoursPerWeek: "",
    willingToPay: "",
    referralCode: "",
    earlyAccess: [] as string[],
    consent: false,
  })

  const totalSteps = 4

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (name: "devices" | "subjects" | "whyInterested" | "earlyAccess", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }))
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
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
    return (step / totalSteps) * 100
  }

  const subjectOptions = [
    "Science & Math",
    "Business, Accounting & Economics",
    "Technology, AI & Data Science",
    "Languages",
    "Arts & Humanities",
    "Test Prep (IELTS, SAT, GRE, etc.)",
  ]

  const whyInterestedOptions = [
    "Learn new subjects",
    "Improve grades",
    "Prepare for university",
    "Upskill for career",
    "Explore AI & technology",
  ]

  const earlyAccessOptions = [
    "AI Study Packs",
    "Live class demos",
    "Competitions",
    "Student community",
  ]

  return (
    <section className="py-8 md:py-12 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Side - Animations */}
          <div className="hidden lg:flex h-full min-h-[600px] items-center justify-center">
            <div className="relative w-full h-full max-w-lg">
              <StudentWaitlistAnimation />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Student Waitlist
              </h2>
              <p className="text-sm text-muted-foreground mb-4">Step {step} of {totalSteps}</p>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">
              {step === 1 && "Basic Information"}
              {step === 2 && "Student Profile"}
              {step === 3 && "Learning Preferences"}
              {step === 4 && "Almost There!"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Common Section */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          type="text"
                          placeholder="Your country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="internetConnection">Internet Connection Quality *</Label>
                      <Select
                        value={formData.internetConnection}
                        onValueChange={(value) => handleInputChange("internetConnection", value)}
                        required
                      >
                        <SelectTrigger id="internetConnection" className="h-11">
                          <SelectValue placeholder="Select your connection quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strong">Strong (fiber or 4G/5G)</SelectItem>
                          <SelectItem value="moderate">Moderate (3G or shared Wi-Fi)</SelectItem>
                          <SelectItem value="weak">Weak (limited access or unstable connection)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Preferred Device for Joining Square 1 Ai *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {["Smartphone", "Laptop / Desktop", "Tablet", "Shared school or community computer"].map(
                          (device) => (
                            <div key={device} className="flex items-center space-x-2">
                              <Checkbox
                                id={`device-${device}`}
                                checked={formData.devices.includes(device)}
                                onCheckedChange={() => handleArrayChange("devices", device)}
                              />
                              <Label
                                htmlFor={`device-${device}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {device}
                              </Label>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heardAbout">How did you hear about Square 1 Ai? *</Label>
                      <Select
                        value={formData.heardAbout}
                        onValueChange={(value) => handleInputChange("heardAbout", value)}
                        required
                      >
                        <SelectTrigger id="heardAbout" className="h-11">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Student Profile */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="educationLevel">What's your current level of education? *</Label>
                      <Select
                        value={formData.educationLevel}
                        onValueChange={(value) => handleInputChange("educationLevel", value)}
                        required
                      >
                        <SelectTrigger id="educationLevel" className="h-11">
                          <SelectValue placeholder="Select your level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary (Grade 1–5)</SelectItem>
                          <SelectItem value="secondary">Secondary (Grade 6–13 / O/L / A/L)</SelectItem>
                          <SelectItem value="university">University Student</SelectItem>
                          <SelectItem value="graduate">Graduate / Professional</SelectItem>
                          <SelectItem value="working">Working Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Which subjects or areas are you most interested in learning? *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subjectOptions.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={formData.subjects.includes(subject)}
                              onCheckedChange={() => handleArrayChange("subjects", subject)}
                            />
                            <Label
                              htmlFor={`subject-${subject}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Do you prefer: *</Label>
                      <RadioGroup
                        value={formData.learningPreference}
                        onValueChange={(value) => handleInputChange("learningPreference", value)}
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="live" id="live" />
                          <Label htmlFor="live" className="font-normal cursor-pointer">
                            Live interactive classes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="recorded" id="recorded" />
                          <Label htmlFor="recorded" className="font-normal cursor-pointer">
                            Pre-recorded video lessons
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both" className="font-normal cursor-pointer">
                            Both
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="takenOnlineCourses">Have you taken online courses before? *</Label>
                      <Select
                        value={formData.takenOnlineCourses}
                        onValueChange={(value) => handleInputChange("takenOnlineCourses", value)}
                        required
                      >
                        <SelectTrigger id="takenOnlineCourses" className="h-11">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Why are you interested in joining Square 1 Ai? *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {whyInterestedOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`why-${option}`}
                              checked={formData.whyInterested.includes(option)}
                              onCheckedChange={() => handleArrayChange("whyInterested", option)}
                            />
                            <Label
                              htmlFor={`why-${option}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">What motivates you to learn? *</Label>
                      <Textarea
                        id="motivation"
                        placeholder="Share what drives your learning journey..."
                        value={formData.motivation}
                        onChange={(e) => handleInputChange("motivation", e.target.value)}
                        required
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Learning Preferences */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="competitions">Would you like to join competitions or community challenges? *</Label>
                      <Select
                        value={formData.competitions}
                        onValueChange={(value) => handleInputChange("competitions", value)}
                        required
                      >
                        <SelectTrigger id="competitions" className="h-11">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, absolutely</SelectItem>
                          <SelectItem value="maybe">Maybe later</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hoursPerWeek">How many hours per week do you plan to dedicate to learning? *</Label>
                      <Select
                        value={formData.hoursPerWeek}
                        onValueChange={(value) => handleInputChange("hoursPerWeek", value)}
                        required
                      >
                        <SelectTrigger id="hoursPerWeek" className="h-11">
                          <SelectValue placeholder="Select hours per week" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<3">Less than 3 hours</SelectItem>
                          <SelectItem value="3-6">3–6 hours</SelectItem>
                          <SelectItem value="6-10">6–10 hours</SelectItem>
                          <SelectItem value="10+">10+ hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="willingToPay">How much would you roughly be willing to pay for monthly access? *</Label>
                      <Select
                        value={formData.willingToPay}
                        onValueChange={(value) => handleInputChange("willingToPay", value)}
                        required
                      >
                        <SelectTrigger id="willingToPay" className="h-11">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free only</SelectItem>
                          <SelectItem value="under2500">Under LKR 2,500</SelectItem>
                          <SelectItem value="2500-5000">LKR 2,500–5,000/month</SelectItem>
                          <SelectItem value="5000-7500">LKR 5,000–7,500/month</SelectItem>
                          <SelectItem value="above10000">Above LKR 10,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                      <Input
                        id="referralCode"
                        type="text"
                        placeholder="Enter referral code (Invite 10 friends and get 25% off!)"
                        value={formData.referralCode}
                        onChange={(e) => handleInputChange("referralCode", e.target.value)}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Invite 10 of your friends! Get 25% off when they join.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label>Would you like early access to: *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {earlyAccessOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`early-${option}`}
                              checked={formData.earlyAccess.includes(option)}
                              onCheckedChange={() => handleArrayChange("earlyAccess", option)}
                            />
                            <Label
                              htmlFor={`early-${option}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Consent */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in text-center">
                  <div className="text-6xl mb-6">🎉</div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    You're All Set!
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for joining the Square 1 Ai student waitlist. You'll receive early access updates and
                    exclusive beta invites soon. Keep an eye on your inbox! 📧
                  </p>
                  <Separator />
                  <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consent: checked === true }))}
                      required
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm font-normal cursor-pointer leading-relaxed">
                      I agree to receive updates, early access info, and beta invites from Square 1 Ai. *
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <Separator className="my-6" />
              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>

                {step < totalSteps && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={nextStep}
                    className="flex items-center gap-2 ml-auto"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}

                {step === totalSteps && (
                  <Button
                    type="submit"
                    disabled={!formData.consent}
                    className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                  >
                    Join the Waitlist!
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
