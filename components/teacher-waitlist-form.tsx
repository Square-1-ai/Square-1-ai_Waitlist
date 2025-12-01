"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight, ChevronLeft, Upload, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
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

export default function TeacherWaitlistForm({ onSubmit }: { onSubmit: (data?: any) => void }) {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Common Section
    fullName: "",
    email: "",
    country: "",
    city: "",
    internetConnection: "",
    devices: [] as string[],
    heardAbout: "",
  // Teacher Profile
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
  earlyAccess: [] as string[],
  newsletter: false,
  teachingSample: undefined as File | undefined,
  })

  const totalSteps = 4

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateFile = (file: File | null): boolean => {
    if (!file) return true // File is optional
    const maxSize = 100 * 1024 * 1024 // 100MB
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
    if (file.size > maxSize) return false
    if (!allowedTypes.includes(file.type)) return false
    return true
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
      if (!formData.subjects.trim()) {
        newErrors.subjects = "Subjects are required"
      }
      if (!formData.teachingLevel) {
        newErrors.teachingLevel = "Teaching level is required"
      }
      if (!formData.yearsExperience) {
        newErrors.yearsExperience = "Years of experience is required"
      }
      if (!formData.classTypePreference) {
        newErrors.classTypePreference = "Please select a class type preference"
      }
      if (!formData.taughtOnline) {
        newErrors.taughtOnline = "Please select an option"
      }
      if (!formData.curriculums.trim()) {
        newErrors.curriculums = "Curriculums are required"
      }
      if (!formData.createStudyPacks) {
        newErrors.createStudyPacks = "Please select an option"
      }
    } else if (stepNumber === 3) {
      if (!formData.availabilityToStart) {
        newErrors.availabilityToStart = "Please select availability"
      }
      if (!formData.revenueSplit) {
        newErrors.revenueSplit = "Please select a revenue split preference"
      }
      if (!formData.paymentMethod.trim()) {
        newErrors.paymentMethod = "Payment method is required"
      }
      if (formData.teachingSample && !validateFile(formData.teachingSample)) {
        if (formData.teachingSample.size > 100 * 1024 * 1024) {
          newErrors.teachingSample = "File size must be less than 100MB"
        } else {
          newErrors.teachingSample = "Please upload a valid video file (MP4, WebM, MOV, AVI)"
        }
      }
      if (formData.earlyAccess.length === 0) {
        newErrors.earlyAccess = "Please select at least one early access option"
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

  // Helper to toggle array fields (devices, earlyAccess)
  const handleArrayChange = (field: string, value: string) => {
    setFormData((prev: typeof formData) => {
      const arr = Array.isArray(prev[field as keyof typeof prev]) ? prev[field as keyof typeof prev] as string[] : [];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  // Navigation helpers for multi-step form
  const nextStep = () => setStep((s: number) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s: number) => Math.max(s - 1, 1));

  // Video upload removed
  const getProgressPercentage = () => {
    return (step / totalSteps) * 100
  }

  // Handle file input for teaching sample
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      teachingSample: file || undefined,
    }));
  };

  const earlyAccessOptions = [
    "Teacher dashboard preview",
    "AI Study Pack generator",
    "Marketing tools for teachers",
    "Revenue insights",
  ]

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    // Validate current step before proceeding
    if (!validateStep(step)) {
      return;
    }

    // If not on last step, go to next step
    if (step < totalSteps) {
      nextStep();
      return;
    }

    // On last step, submit the form
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'teacher', data: formData }),
      });

      const result = await response.json();
      
      if (response.ok) {
        onSubmit(formData);
      } else if (result.error && result.error.includes('already registered')) {
        alert('This email is already registered on the waitlist.');
        onSubmit(formData);
      } else {
        alert(result.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
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
                <TypingText text="Become a Teacher of Square 1 Ai" typingSpeed={50} showCursor={false} />
              </h2>
              <p className="text-sm text-muted-foreground mb-4">Step {step} of {totalSteps}</p>
              <Progress value={getProgressPercentage()} className="h-2 [&_[data-slot=progress-indicator]]:bg-cyan-400" />
            </div>

            <Card className="border border-white/20 shadow-2xl bg-white/10 backdrop-blur-xl backdrop-saturate-150">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-white">
              {step === 1 && "Basic Information"}
              {step === 2 && "Teaching Experience"}
              {step === 3 && "Business Details"}
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

              {/* Step 2: Teaching Experience */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="subjects" className="text-white">Subjects or Topics You Teach <span className="text-red-500">*</span></Label>
                      <Input
                        id="subjects"
                        type="text"
                        placeholder="e.g., Physics, Economics, AI, English"
                        value={formData.subjects}
                        onChange={(e) => handleInputChange("subjects", e.target.value)}
                        required
                        className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                          errors.subjects ? "border-red-500" : ""
                        }`}
                      />
                      {errors.subjects && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.subjects}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teachingLevel" className="text-white">What level do you teach? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.teachingLevel}
                        onValueChange={(value) => handleInputChange("teachingLevel", value)}
                        required
                      >
                        <SelectTrigger id="teachingLevel" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.teachingLevel ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="primary" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Primary</SelectItem>
                          <SelectItem value="secondary" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Secondary</SelectItem>
                          <SelectItem value="university" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">University</SelectItem>
                          <SelectItem value="professional" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Professional</SelectItem>
                          <SelectItem value="corporate" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.teachingLevel && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.teachingLevel}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience" className="text-white">How many years of teaching experience do you have? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.yearsExperience}
                        onValueChange={(value) => handleInputChange("yearsExperience", value)}
                        required
                      >
                        <SelectTrigger id="yearsExperience" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.yearsExperience ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="0-2" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">0–2 years</SelectItem>
                          <SelectItem value="3-5" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">3–5 years</SelectItem>
                          <SelectItem value="6-10" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">6–10 years</SelectItem>
                          <SelectItem value="10+" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.yearsExperience && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.yearsExperience}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">What kind of classes are you open to teaching? <span className="text-red-500">*</span></Label>
                      <RadioGroup
                        value={formData.classTypePreference}
                        onValueChange={(value) => handleInputChange("classTypePreference", value)}
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="live" id="live" className="border-white/30 text-white" />
                          <Label htmlFor="live" className="font-normal cursor-pointer text-white">
                            Live classes (interactive)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="recorded" id="recorded" className="border-white/30 text-white" />
                          <Label htmlFor="recorded" className="font-normal cursor-pointer text-white">
                            Pre-recorded lessons
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" className="border-white/30 text-white" />
                          <Label htmlFor="both" className="font-normal cursor-pointer text-white">
                            Both
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.classTypePreference && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.classTypePreference}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taughtOnline" className="text-white">Have you taught online before? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.taughtOnline}
                        onValueChange={(value) => handleInputChange("taughtOnline", value)}
                        required
                      >
                        <SelectTrigger id="taughtOnline" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.taughtOnline ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="yes" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.taughtOnline && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.taughtOnline}
                        </p>
                      )}
                    </div>

                    {formData.taughtOnline === "yes" && (
                      <div className="space-y-2">
                        <Label htmlFor="platformsUsed" className="text-white">
                          What platforms have you used for online teaching?
                        </Label>
                        <Input
                          id="platformsUsed"
                          type="text"
                          placeholder="e.g., Zoom, Google Meet, Microsoft Teams, etc."
                          value={formData.platformsUsed}
                          onChange={(e) => handleInputChange("platformsUsed", e.target.value)}
                          className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="curriculums" className="text-white">
                        Which countries or curriculums have you taught under? <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="curriculums"
                        type="text"
                        placeholder="e.g., US, IB, IGCSE, Sri Lanka"
                        value={formData.curriculums}
                        onChange={(e) => handleInputChange("curriculums", e.target.value)}
                        required
                        className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                          errors.curriculums ? "border-red-500" : ""
                        }`}
                      />
                      <p className="text-xs text-white/70">
                        Helps us tailor student matching
                      </p>
                      {errors.curriculums && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.curriculums}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="createStudyPacks" className="text-white">
                        Would you be interested in creating your own AI Study Pack content (notes, quizzes, etc.)? <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.createStudyPacks}
                        onValueChange={(value) => handleInputChange("createStudyPacks", value)}
                        required
                      >
                        <SelectTrigger id="createStudyPacks" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.createStudyPacks ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="yes" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">No</SelectItem>
                          <SelectItem value="maybe" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Maybe later</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.createStudyPacks && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.createStudyPacks}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Business Details */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="availabilityToStart" className="text-white">When are you available to start teaching on Square 1 Ai? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.availabilityToStart}
                        onValueChange={(value) => handleInputChange("availabilityToStart", value)}
                        required
                      >
                        <SelectTrigger id="availabilityToStart" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.availabilityToStart ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="immediately" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Immediately</SelectItem>
                          <SelectItem value="within-month" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Within a month</SelectItem>
                          <SelectItem value="within-3-months" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Within 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.availabilityToStart && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.availabilityToStart}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenueSplit" className="text-white">What's your preferred teacher revenue split? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.revenueSplit}
                        onValueChange={(value) => handleInputChange("revenueSplit", value)}
                        required
                      >
                        <SelectTrigger id="revenueSplit" className={`h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100 ${
                          errors.revenueSplit ? "border-red-500" : ""
                        }`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="70/30" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">70% Teacher / 30% Platform</SelectItem>
                          <SelectItem value="65/35" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">65% Teacher / 35% Platform</SelectItem>
                          <SelectItem value="60/40" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">60% Teacher / 40% Platform</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-white/70">
                        Use this to gauge teacher expectations before finalizing pricing model.
                      </p>
                      {errors.revenueSplit && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.revenueSplit}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod" className="text-white">What's your preferred payment method? <span className="text-red-500">*</span></Label>
                      <Input
                        id="paymentMethod"
                        type="text"
                        placeholder="e.g., Bank transfer, PayPal, etc."
                        value={formData.paymentMethod}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        required
                        className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                          errors.paymentMethod ? "border-red-500" : ""
                        }`}
                      />
                      {errors.paymentMethod && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.paymentMethod}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teachingSample" className="text-white">Please upload your teaching sample (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="teachingSample"
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                          className="h-11 border-white/30 bg-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                        />
                      </div>
                      <p className="text-xs text-white/70">
                        A 2-minute video clip introducing yourself or teaching a topic (for vetting)
                      </p>
                      {formData.teachingSample && (
                        <p className="text-sm text-cyan-400 flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          {formData.teachingSample.name}
                        </p>
                      )}
                      {errors.teachingSample && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.teachingSample}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white">Would you like to receive early access to: <span className="text-red-500">*</span></Label>
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
                    Thank you for joining the Square 1 Ai teacher waitlist. We're excited to partner with you. You'll
                    receive early access updates and exclusive beta invites soon. Keep an eye on your inbox! 📧
                  </p>
                  <Separator className="bg-white/20" />
                  <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg border border-white/20">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({ ...prev, newsletter: checked === true }))
                      }}
                      className="mt-1 border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                    />
                    <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer leading-relaxed text-white">
                      I agree to receive updates, early access info, and beta invites from Square 1 Ai.
                    </Label>
                  </div>
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
                    disabled={isSubmitting}
                    className="ml-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 text-white"
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
