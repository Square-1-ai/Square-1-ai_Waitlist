"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight, ChevronLeft, Upload, ArrowLeft } from "lucide-react"
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

export default function TeacherWaitlistForm({ onSubmit }: { onSubmit: () => void }) {
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
  consent: false,
  })

  const totalSteps = 4

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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

  {/* Video upload removed */}
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
        body: JSON.stringify({ type: 'teacher', data: formData }),
      });
      
      const result = await res.json();
      
      if (res.ok) {
        onSubmit();
      } else {
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

  const earlyAccessOptions = [
    "Teacher dashboard preview",
    "AI Study Pack generator",
    "Marketing tools for teachers",
    "Revenue insights",
  ]

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
                        className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                      />
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
                        className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                      />
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
                          className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                        />
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
                          className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="internetConnection" className="text-white">Internet Connection Quality <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.internetConnection}
                        onValueChange={(value) => handleInputChange("internetConnection", value)}
                        required
                      >
                        <SelectTrigger id="internetConnection" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
                          <SelectValue placeholder="Select your connection quality" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="strong" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Strong (fiber or 4G/5G)</SelectItem>
                          <SelectItem value="moderate" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Moderate (3G or shared Wi-Fi)</SelectItem>
                          <SelectItem value="weak" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Weak (limited access or unstable connection)</SelectItem>
                        </SelectContent>
                      </Select>
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heardAbout" className="text-white">How did you hear about Square 1 Ai? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.heardAbout}
                        onValueChange={(value) => handleInputChange("heardAbout", value)}
                        required
                      >
                        <SelectTrigger id="heardAbout" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
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
                        className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teachingLevel" className="text-white">What level do you teach? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.teachingLevel}
                        onValueChange={(value) => handleInputChange("teachingLevel", value)}
                        required
                      >
                        <SelectTrigger id="teachingLevel" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience" className="text-white">How many years of teaching experience do you have? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.yearsExperience}
                        onValueChange={(value) => handleInputChange("yearsExperience", value)}
                        required
                      >
                        <SelectTrigger id="yearsExperience" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="0-2" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">0–2 years</SelectItem>
                          <SelectItem value="3-5" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">3–5 years</SelectItem>
                          <SelectItem value="6-10" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">6–10 years</SelectItem>
                          <SelectItem value="10+" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taughtOnline" className="text-white">Have you taught online before? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.taughtOnline}
                        onValueChange={(value) => handleInputChange("taughtOnline", value)}
                        required
                      >
                        <SelectTrigger id="taughtOnline" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="yes" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">No</SelectItem>
                        </SelectContent>
                      </Select>
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
                        className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                      />
                      <p className="text-xs text-white/70">
                        Helps us tailor student matching
                      </p>
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
                        <SelectTrigger id="createStudyPacks" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="yes" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Yes</SelectItem>
                          <SelectItem value="no" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">No</SelectItem>
                          <SelectItem value="maybe" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Maybe later</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <SelectTrigger id="availabilityToStart" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/30">
                          <SelectItem value="immediately" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Immediately</SelectItem>
                          <SelectItem value="within-month" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Within a month</SelectItem>
                          <SelectItem value="within-3-months" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Within 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenueSplit" className="text-white">What's your preferred teacher revenue split? <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.revenueSplit}
                        onValueChange={(value) => handleInputChange("revenueSplit", value)}
                        required
                      >
                        <SelectTrigger id="revenueSplit" className="h-11 border-white/30 bg-white/20 text-white [&>span]:text-white data-[placeholder]:text-white/60 [&_svg]:!text-white [&_svg]:!opacity-100">
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
                        className="h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60"
                      />
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
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, consent: checked === true }))}
                      required
                      className="mt-1 border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-900"
                    />
                    <Label htmlFor="consent" className="text-sm font-normal cursor-pointer leading-relaxed text-white">
                      I agree to receive updates, early access info, and beta invites from Square 1 Ai. <span className="text-red-500">*</span>
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
                    disabled={!formData.consent}
                    className="ml-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 text-white"
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
