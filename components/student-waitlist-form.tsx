"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight, ChevronLeft, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
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
import TypingText from "@/components/ui/typing-text"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function StudentWaitlistForm({ onSubmit }: { onSubmit: (data: any, errorType?: string) => void }) {
  const [step, setStep] = useState(1)
  
  // Extract ref_id from URL on component mount
  const getRefIdFromUrl = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('ref_id') || '';
    }
    return '';
  };
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Common Sectionon
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
    referralCode: getRefIdFromUrl(),
    earlyAccess: [] as string[],
    consent: false,
  })

  const totalSteps = 4

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (stepNumber === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required"
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
      if (!formData.country.trim()) {
        newErrors.country = "Country is required"
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required"
      }
      if (!formData.internetConnection) {
        newErrors.internetConnection = "Internet connection quality is required"
      }
      if (formData.devices.length === 0) {
        newErrors.devices = "Please select at least one device"
      }
      if (!formData.heardAbout) {
        newErrors.heardAbout = "Please select how you heard about us"
      }
    } else if (stepNumber === 2) {
      if (!formData.educationLevel) {
        newErrors.educationLevel = "Education level is required"
      }
      if (formData.subjects.length === 0) {
        newErrors.subjects = "Please select at least one subject"
      }
      if (!formData.learningPreference) {
        newErrors.learningPreference = "Please select a learning preference"
      }
      if (!formData.takenOnlineCourses) {
        newErrors.takenOnlineCourses = "Please select an option"
      }
      if (formData.whyInterested.length === 0) {
        newErrors.whyInterested = "Please select at least one reason"
      }
      if (!formData.motivation.trim()) {
        newErrors.motivation = "Please share what motivates you to learn"
      }
    } else if (stepNumber === 3) {
      if (!formData.competitions) {
        newErrors.competitions = "Please select an option"
      }
      if (!formData.hoursPerWeek) {
        newErrors.hoursPerWeek = "Please select hours per week"
      }
      if (!formData.willingToPay) {
        newErrors.willingToPay = "Please select a payment range"
      }
      if (formData.earlyAccess.length === 0) {
        newErrors.earlyAccess = "Please select at least one early access option"
      }
    } else if (stepNumber === 4) {
      if (!formData.consent) {
        newErrors.consent = "Please agree to the terms to continue"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleArrayChange = (name: "devices" | "subjects" | "whyInterested" | "earlyAccess", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }))
    // Clear error for this field when user makes a selection
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const nextStep = async () => {
    // On step 1, check if email is already registered
    if (step === 1 && formData.email) {
      try {
        // Check if email already exists using lightweight check endpoint
        const checkRes = await fetch('/api/waitlist/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, type: 'student' }),
        });
        const result = await checkRes.json();

        if (checkRes.ok && result.exists) {
          // Email already registered, go to thank you page
          alert('This email is already registered. Redirecting to your referral info...');
          onSubmit(formData, 'duplicate');
          return;
        }
      } catch (err) {
        // If check fails, proceed normally
        console.error('Email check error:', err);
      }
    }

    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
        setErrors({});
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please accept the terms and conditions to continue.');
      return;
    }
    
    try {
      const res = await fetch('/api/waitlist/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'student', data: formData }),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        onSubmit(formData);
      } else if (result.error && result.error.includes('already registered')) {
        // Pass errorType to parent for duplicate
        onSubmit(formData, 'duplicate');
      } else {
        // Show specific error message from server
        alert(result.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error. Please check your connection and try again.');
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
    <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            href={`/${formData.referralCode ? `?ref_id=${formData.referralCode}` : ''}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          {/* Form */}
          <div className="w-full">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                <TypingText text="Become a Student of Square 1 Ai" typingSpeed={50} showCursor={false} />
              </h2>
              <p className="text-sm text-muted-foreground mb-4">Step {step} of {totalSteps}</p>
              <Progress value={getProgressPercentage()} className="h-2 [&_[data-slot=progress-indicator]]:bg-cyan-400" />
            </div>

            <Card className="border border-white/20 shadow-2xl bg-white/10 backdrop-blur-xl backdrop-saturate-150">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-white">
              {step === 1 && "Basic Information"}
              {step === 2 && "Student Profile"}
              {step === 3 && "Learning Preferences"}
              {step === 4 && "Almost There!"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success/Error Alerts */}
              {submitSuccess && (
                <Alert className="bg-green-500/20 border-green-500/50 text-white">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-white">
                    Successfully joined the waitlist! We'll be in touch soon.
                  </AlertDescription>
                </Alert>
              )}
              {submitError && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-200">
                    {submitError}
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Step 1: Common Section */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                        className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                          errors.fullName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-white">Country <span className="text-red-500">*</span></Label>
                        <Input
                          id="country"
                          type="text"
                          placeholder="Your country"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          required
                          className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                            errors.country ? "border-red-500" : ""
                          }`}
                        />
                        {errors.country && (
                          <p className="text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.country}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-white">City <span className="text-red-500">*</span></Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                          className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                            errors.city ? "border-red-500" : ""
                          }`}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.city}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="internetConnection" className="text-white">Internet Connection Quality <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.internetConnection}
                        onValueChange={(value) => handleInputChange("internetConnection", value)}
                        required
                      >
                        <SelectTrigger id="internetConnection" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.internetConnection ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select your connection quality" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="strong" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Strong (fiber or 4G/5G)</SelectItem>
                          <SelectItem value="moderate" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Moderate (3G or shared Wi-Fi)</SelectItem>
                          <SelectItem value="weak" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Weak (limited access or unstable connection)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.internetConnection && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.internetConnection}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Preferred Device for Joining Square 1 Ai <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {["Smartphone", "Laptop / Desktop", "Tablet", "Shared school or community computer"].map(
                          (device) => (
                            <div key={device} className="flex items-center space-x-2">
                              <Checkbox
                                id={`device-${device}`}
                                checked={formData.devices.includes(device)}
                                onCheckedChange={() => handleArrayChange("devices", device)}
                                className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                              />
                              <Label
                                htmlFor={`device-${device}`}
                                className="text-sm font-normal cursor-pointer text-white"
                              >
                                {device}
                              </Label>
                            </div>
                          ),
                        )}
                      </div>
                      {errors.devices && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.devices}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heardAbout" className="text-white">How did you hear about Square 1 Ai? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.heardAbout}
                        onValueChange={(value) => handleInputChange("heardAbout", value)}
                        required
                      >
                        <SelectTrigger id="heardAbout" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.heardAbout ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="instagram" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Instagram</SelectItem>
                          <SelectItem value="tiktok" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">TikTok</SelectItem>
                          <SelectItem value="youtube" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">YouTube</SelectItem>
                          <SelectItem value="referral" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Referral</SelectItem>
                          <SelectItem value="teacher" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Teacher</SelectItem>
                          <SelectItem value="school" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">School</SelectItem>
                          <SelectItem value="other" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.heardAbout && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.heardAbout}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Student Profile */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="educationLevel" className="text-white">What's your current level of education? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.educationLevel}
                        onValueChange={(value) => handleInputChange("educationLevel", value)}
                        required
                      >
                        <SelectTrigger id="educationLevel" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.educationLevel ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select your level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="primary" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Primary (Grade 1–5)</SelectItem>
                          <SelectItem value="secondary" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Secondary (Grade 6–13 / O/L / A/L)</SelectItem>
                          <SelectItem value="university" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">University Student</SelectItem>
                          <SelectItem value="graduate" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Graduate / Professional</SelectItem>
                          <SelectItem value="working" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Working Professional</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.educationLevel && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.educationLevel}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Which subjects or areas are you most interested in learning? <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subjectOptions.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={formData.subjects.includes(subject)}
                              onCheckedChange={() => handleArrayChange("subjects", subject)}
                              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                            />
                            <Label
                              htmlFor={`subject-${subject}`}
                              className="text-sm font-normal cursor-pointer text-white"
                            >
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.subjects && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.subjects}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Do you prefer: <span className="text-red-500">*</span></Label>
                      <RadioGroup
                        value={formData.learningPreference}
                        onValueChange={(value) => handleInputChange("learningPreference", value)}
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="live" id="live" className="border-white/30 text-white" />
                          <Label htmlFor="live" className="font-normal cursor-pointer text-white">
                            Live interactive classes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="recorded" id="recorded" className="border-white/30 text-white" />
                          <Label htmlFor="recorded" className="font-normal cursor-pointer text-white">
                            Pre-recorded video lessons
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" className="border-white/30 text-white" />
                          <Label htmlFor="both" className="font-normal cursor-pointer text-white">
                            Both
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.learningPreference && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.learningPreference}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="takenOnlineCourses" className="text-white">Have you taken online courses before? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.takenOnlineCourses}
                        onValueChange={(value) => handleInputChange("takenOnlineCourses", value)}
                        required
                      >
                        <SelectTrigger id="takenOnlineCourses" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.takenOnlineCourses ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="yes" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.takenOnlineCourses && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.takenOnlineCourses}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Why are you interested in joining Square 1 Ai? <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {whyInterestedOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`why-${option}`}
                              checked={formData.whyInterested.includes(option)}
                              onCheckedChange={() => handleArrayChange("whyInterested", option)}
                              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                            />
                            <Label
                              htmlFor={`why-${option}`}
                              className="text-sm font-normal cursor-pointer text-white"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.whyInterested && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.whyInterested}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation" className="text-white">What motivates you to learn? <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="motivation"
                        placeholder="Share what drives your learning journey..."
                        value={formData.motivation}
                        onChange={(e) => handleInputChange("motivation", e.target.value)}
                        required
                        rows={4}
                        className={`resize-none border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                          errors.motivation ? "border-red-500" : ""
                        }`}
                      />
                      {errors.motivation && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.motivation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Learning Preferences */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="competitions" className="text-white">Would you like to join competitions or community challenges? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.competitions}
                        onValueChange={(value) => handleInputChange("competitions", value)}
                        required
                      >
                        <SelectTrigger id="competitions" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.competitions ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="yes" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Yes, absolutely</SelectItem>
                          <SelectItem value="maybe" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Maybe later</SelectItem>
                          <SelectItem value="no" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.competitions && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.competitions}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hoursPerWeek" className="text-white">How many hours per week do you plan to dedicate to learning? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.hoursPerWeek}
                        onValueChange={(value) => handleInputChange("hoursPerWeek", value)}
                        required
                      >
                        <SelectTrigger id="hoursPerWeek" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.hoursPerWeek ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select hours per week" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="<3" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Less than 3 hours</SelectItem>
                          <SelectItem value="3-6" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">3–6 hours</SelectItem>
                          <SelectItem value="6-10" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">6–10 hours</SelectItem>
                          <SelectItem value="10+" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">10+ hours</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.hoursPerWeek && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.hoursPerWeek}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="willingToPay" className="text-white">How much would you roughly be willing to pay for monthly access? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.willingToPay}
                        onValueChange={(value) => handleInputChange("willingToPay", value)}
                        required
                      >
                        <SelectTrigger id="willingToPay" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.willingToPay ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="free" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Free only</SelectItem>
                          <SelectItem value="under2500" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Under LKR 2,500</SelectItem>
                          <SelectItem value="2500-5000" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">LKR 2,500–5,000/month</SelectItem>
                          <SelectItem value="5000-7500" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">LKR 5,000–7,500/month</SelectItem>
                          <SelectItem value="above10000" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Above LKR 10,000</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.willingToPay && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.willingToPay}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referralCode" className="text-white">Referral Code (Optional)</Label>
                      <Input
                        id="referralCode"
                        type="text"
                        placeholder="Enter referral code (Invite 10 friends and get 25% off!)"
                        value={formData.referralCode}
                        onChange={(e) => handleInputChange("referralCode", e.target.value)}
                        className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                      />
                      <p className="text-xs text-white/70">
                        Invite 10 of your friends! Get 25% off when they join.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Would you like early access to: <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {earlyAccessOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`early-${option}`}
                              checked={formData.earlyAccess.includes(option)}
                              onCheckedChange={() => handleArrayChange("earlyAccess", option)}
                              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                            />
                            <Label
                              htmlFor={`early-${option}`}
                              className="text-sm font-normal cursor-pointer text-white"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {errors.earlyAccess && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.earlyAccess}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Consent */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in text-center">
                  <div className="text-6xl mb-6">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    You're All Set!
                  </h3>
                  <p className="text-white/80 mb-8">
                    Thank you for joining the Square 1 Ai student waitlist. You'll receive early access updates and
                    exclusive beta invites soon. Keep an eye on your inbox! 📧
                  </p>
                  <Separator className="bg-white/20" />
                  <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg border border-white/20">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({ ...prev, consent: checked === true }))
                        if (errors.consent) {
                          setErrors((prev) => {
                            const newErrors = { ...prev }
                            delete newErrors.consent
                            return newErrors
                          })
                        }
                      }}
                      required
                      className="mt-1 border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                    />
                    <Label htmlFor="consent" className="text-sm font-normal cursor-pointer leading-relaxed text-white">
                      I agree to receive updates, early access info, and beta invites from Square 1 Ai. <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.consent}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <Separator className="my-6 bg-white/20" />
              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className="flex items-center gap-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-blue-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>

                {step < totalSteps && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={nextStep}
                    className="flex items-center gap-2 ml-auto border-white/30 bg-white/10 text-white hover:bg-white hover:text-blue-900 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}

                {step === totalSteps && (
                  <Button
                    type="submit"
                    disabled={!formData.consent || isSubmitting}
                    className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Join the Waitlist!"}
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
