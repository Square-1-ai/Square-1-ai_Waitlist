"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight, ChevronLeft, GraduationCap, Upload } from "lucide-react"
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
import TeacherAnimation from "@/components/teacher-animation"

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
    teachingSample: null as File | null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      teachingSample: file,
    }))
  }

  const handleArrayChange = (name: "devices" | "earlyAccess", value: string) => {
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

  const earlyAccessOptions = [
    "Teacher dashboard preview",
    "AI Study Pack generator",
    "Marketing tools for teachers",
    "Revenue insights",
  ]

  return (
    <section className="py-8 md:py-12 px-4 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Side - Animation */}
          <div className="hidden lg:flex h-full min-h-[600px] items-center justify-center">
            <div className="relative w-full h-full max-w-lg">
              <TeacherAnimation />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-cyan-600" />
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Teacher Waitlist
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Step {step} of {totalSteps}</p>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">
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

              {/* Step 2: Teaching Experience */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="subjects">Subjects or Topics You Teach *</Label>
                      <Input
                        id="subjects"
                        type="text"
                        placeholder="e.g., Physics, Economics, AI, English"
                        value={formData.subjects}
                        onChange={(e) => handleInputChange("subjects", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teachingLevel">What level do you teach? *</Label>
                      <Select
                        value={formData.teachingLevel}
                        onValueChange={(value) => handleInputChange("teachingLevel", value)}
                        required
                      >
                        <SelectTrigger id="teachingLevel" className="h-11">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">How many years of teaching experience do you have? *</Label>
                      <Select
                        value={formData.yearsExperience}
                        onValueChange={(value) => handleInputChange("yearsExperience", value)}
                        required
                      >
                        <SelectTrigger id="yearsExperience" className="h-11">
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0–2 years</SelectItem>
                          <SelectItem value="3-5">3–5 years</SelectItem>
                          <SelectItem value="6-10">6–10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>What kind of classes are you open to teaching? *</Label>
                      <RadioGroup
                        value={formData.classTypePreference}
                        onValueChange={(value) => handleInputChange("classTypePreference", value)}
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="live" id="live" />
                          <Label htmlFor="live" className="font-normal cursor-pointer">
                            Live classes (interactive)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="recorded" id="recorded" />
                          <Label htmlFor="recorded" className="font-normal cursor-pointer">
                            Pre-recorded lessons
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
                      <Label htmlFor="taughtOnline">Have you taught online before? *</Label>
                      <Select
                        value={formData.taughtOnline}
                        onValueChange={(value) => handleInputChange("taughtOnline", value)}
                        required
                      >
                        <SelectTrigger id="taughtOnline" className="h-11">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.taughtOnline === "yes" && (
                      <div className="space-y-2">
                        <Label htmlFor="platformsUsed">
                          What platforms have you used for online teaching?
                        </Label>
                        <Input
                          id="platformsUsed"
                          type="text"
                          placeholder="e.g., Zoom, Google Meet, Microsoft Teams, etc."
                          value={formData.platformsUsed}
                          onChange={(e) => handleInputChange("platformsUsed", e.target.value)}
                          className="h-11"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="curriculums">
                        Which countries or curriculums have you taught under? *
                      </Label>
                      <Input
                        id="curriculums"
                        type="text"
                        placeholder="e.g., US, IB, IGCSE, Sri Lanka"
                        value={formData.curriculums}
                        onChange={(e) => handleInputChange("curriculums", e.target.value)}
                        required
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Helps us tailor student matching
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="createStudyPacks">
                        Would you be interested in creating your own AI Study Pack content (notes, quizzes, etc.)? *
                      </Label>
                      <Select
                        value={formData.createStudyPacks}
                        onValueChange={(value) => handleInputChange("createStudyPacks", value)}
                        required
                      >
                        <SelectTrigger id="createStudyPacks" className="h-11">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="maybe">Maybe later</SelectItem>
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
                      <Label htmlFor="availabilityToStart">When are you available to start teaching on Square 1 Ai? *</Label>
                      <Select
                        value={formData.availabilityToStart}
                        onValueChange={(value) => handleInputChange("availabilityToStart", value)}
                        required
                      >
                        <SelectTrigger id="availabilityToStart" className="h-11">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediately">Immediately</SelectItem>
                          <SelectItem value="within-month">Within a month</SelectItem>
                          <SelectItem value="within-3-months">Within 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenueSplit">What's your preferred teacher revenue split? *</Label>
                      <Select
                        value={formData.revenueSplit}
                        onValueChange={(value) => handleInputChange("revenueSplit", value)}
                        required
                      >
                        <SelectTrigger id="revenueSplit" className="h-11">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="70/30">70% Teacher / 30% Platform</SelectItem>
                          <SelectItem value="65/35">65% Teacher / 35% Platform</SelectItem>
                          <SelectItem value="60/40">60% Teacher / 40% Platform</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Use this to gauge teacher expectations before finalizing pricing model.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">What's your preferred payment method? *</Label>
                      <Input
                        id="paymentMethod"
                        type="text"
                        placeholder="e.g., Bank transfer, PayPal, etc."
                        value={formData.paymentMethod}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teachingSample">Please upload your teaching sample (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="teachingSample"
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                          className="h-11 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        A 2-minute video clip introducing yourself or teaching a topic (for vetting)
                      </p>
                      {formData.teachingSample && (
                        <p className="text-sm text-green-600 flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          {formData.teachingSample.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label>Would you like to receive early access to: *</Label>
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
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    You're All Set!
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for joining the Square 1 Ai teacher waitlist. We're excited to partner with you. You'll
                    receive early access updates and exclusive beta invites soon. Keep an eye on your inbox! 📧
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
              <div className="flex gap-4">
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
                    onClick={nextStep}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}

                {step === totalSteps && (
                  <Button
                    type="submit"
                    disabled={!formData.consent}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50"
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
