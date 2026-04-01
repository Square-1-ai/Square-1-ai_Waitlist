"use client"

import type React from "react"
import { useState, useEffect } from "react"
import worldCountries from "world-countries"
import { ChevronRight, ChevronLeft, ArrowLeft, AlertCircle, CheckCircle2, Loader2, CalendarIcon, Check, ChevronsUpDown, Sparkles } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import TypingText from "@/components/ui/typing-text"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { trackFormStepView, trackFormStepComplete, trackFormSubmit, trackFormError } from "@/lib/analytics"

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

async function getRecaptchaToken(action: string): Promise<string | null> {
  try {
    if (!window.grecaptcha || !RECAPTCHA_SITE_KEY) return null;
    return await new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
        resolve(token);
      });
    });
  } catch {
    return null;
  }
}

export default function StudentWaitlistForm({ onSubmit }: { onSubmit: (data: any, errorType?: string) => void }) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  
  // Extract ref_id from URL on component mount
  const getRefIdFromUrl = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('ref_id') || '';
    }
    return '';
  };
  
  const [dobOpen, setDobOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Common Section
    fullName: "",
    dob: "",
    email: "",
    country: "",
    city: "",
    heardAbout: "",
    // Parent info (for minors)
    parentName: "",
    // Student Profile
    educationLevel: "",
    subjects: [] as string[],
    learningPreference: "",
    takenOnlineCourses: "",
    whyInterested: [] as string[],
    referralCode: getRefIdFromUrl(),
    // GDPR Consent
    dataProcessingConsent: false,
    newsletter: false,
  })

  const isMinor = (): boolean => {
    if (!formData.dob) return false;
    const today = new Date();
    const birth = new Date(formData.dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age < 18;
  }

  const totalSteps = 3

  // Step names for analytics tracking
  const stepNames: Record<number, string> = {
    1: 'Basic Information',
    2: 'Student Profile',
    3: 'Confirmation'
  }

  // Track step views when step changes
  useEffect(() => {
    trackFormStepView('student', step, stepNames[step] || `Step ${step}`);
  }, [step]);

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
      if (!formData.dob) {
        newErrors.dob = "Date of birth is required"
      }
      if (!formData.email.trim()) {
        newErrors.email = isMinor() ? "Parent email address is required" : "Email is required"
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
      if (isMinor() && !formData.parentName.trim()) {
        newErrors.parentName = "Parent name is required for students under 18"
      }
      if (!formData.country.trim()) {
        newErrors.country = "Country is required"
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required"
      }
      if (!formData.heardAbout) {
        newErrors.heardAbout = "Please select how you heard about us"
      }
      if (!formData.dataProcessingConsent) {
        newErrors.dataProcessingConsent = "You must consent to data processing to continue"
      }
    } else if (stepNumber === 2) {
      if (!formData.educationLevel) {
        newErrors.educationLevel = "Education level is required"
      }
      if (formData.subjects.length === 0) {
        newErrors.subjects = "Please select at least one subject"
      }
      if (!formData.takenOnlineCourses) {
        newErrors.takenOnlineCourses = "Please select an option"
      }
    }

    setErrors(newErrors)

    // Track validation errors if any
    if (Object.keys(newErrors).length > 0) {
      trackFormError('student', stepNumber, Object.keys(newErrors));
    }

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

  const handleArrayChange = (name: "subjects" | "whyInterested", value: string) => {
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
    if (step === 1 && formData.email) {
      if (!validateStep(1)) return;
      setIsCheckingEmail(true);
      try {
        const checkRes = await fetch('/api/waitlist/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, type: 'student' }),
        });

        if (!checkRes.ok) {
          toast({
            title: "Connection Error",
            description: "Unable to verify email. Please try again.",
            variant: "destructive"
          });
          setIsCheckingEmail(false);
          return;
        }

        const result = await checkRes.json();

        if (result.exists) {
          toast({
            title: "Email Already Registered",
            description: "This email is already registered. Redirecting to referral details.",
            variant: "default"
          });
          setIsCheckingEmail(false);
          onSubmit(formData, 'duplicate');
          return;
        }
      } catch {
        toast({
          title: "Connection Error",
          description: "Unable to verify email. Please check your connection.",
          variant: "destructive"
        });
        setIsCheckingEmail(false);
        return;
      }
      setIsCheckingEmail(false);
    }

    if (validateStep(step)) {
      // Track step completion
      trackFormStepComplete('student', step, stepNames[step] || `Step ${step}`);

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
    setIsSubmitting(true);
    
    try {
      // Get reCAPTCHA v3 token
      const recaptchaToken = await getRecaptchaToken('waitlist_submit');

      const res = await fetch('/api/waitlist/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'student',
          data: {
            ...formData,
            // Pass defaults for removed fields (DB columns still exist)
            internetConnection: null,
            devices: [],
            motivation: null,
            competitions: null,
            hoursPerWeek: null,
            willingToPay: null,
            earlyAccess: [],
            newsletterConsent: formData.newsletter
          },
          recaptchaToken
        }),
      });
      
      const result = await res.json();

      if (res.ok) {
        // Track successful submission
        trackFormSubmit('student', true);
        onSubmit(formData);
      } else if (result.error && result.error.includes('already registered')) {
        // Track duplicate email submission
        trackFormSubmit('student', false, 'duplicate_email');
        // Pass errorType to parent for duplicate
        onSubmit(formData, 'duplicate');
      } else {
        // Track failed submission
        trackFormSubmit('student', false, result.error || 'unknown_error');
        // Show specific error message from server
        toast({
          title: "Submission Failed",
          description: result.error || 'Submission failed. Please try again.',
          variant: "destructive"
        });
      }
    } catch {
      // Track network error
      trackFormSubmit('student', false, 'network_error');
      toast({
        title: "Network Error",
        description: 'Please check your connection and try again.',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
              {step !== totalSteps && (
                <>
                  <p className="text-sm text-muted-foreground mb-4">Step {step} of {totalSteps - 1}</p>
                  <Progress value={getProgressPercentage()} className="h-2 [&_[data-slot=progress-indicator]]:bg-cyan-400" />
                </>
              )}
            </div>

            <Card className="border border-white/20 shadow-2xl bg-white/10 backdrop-blur-xl backdrop-saturate-150">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-white">
              {step === 1 && "Basic Information"}
              {step === 2 && "Student Profile"}
              {step === 3 && "Almost There!"}
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
                      <Label htmlFor="dob-trigger" className="text-white">Date of Birth <span className="text-red-500">*</span></Label>
                      <Popover open={dobOpen} onOpenChange={setDobOpen}>
                        <PopoverTrigger asChild>
                          <button
                            id="dob-trigger"
                            type="button"
                            className={`h-11 w-full flex items-center justify-between rounded-md border px-3 text-sm transition-colors bg-white/20 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/30 ${errors.dob ? "border-red-500" : "border-white/30"} ${!formData.dob ? "text-white/60" : "text-white"}`}
                          >
                            <span>{formData.dob ? format(new Date(formData.dob + "T00:00:00"), "dd MMMM yyyy") : "Select your date of birth"}</span>
                            <CalendarIcon className="w-4 h-4 shrink-0 opacity-70" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-900 border-white/20" align="start">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={formData.dob ? new Date(formData.dob + "T00:00:00") : undefined}
                            onSelect={(date) => {
                              if (date) {
                                const y = date.getFullYear()
                                const m = String(date.getMonth() + 1).padStart(2, "0")
                                const d = String(date.getDate()).padStart(2, "0")
                                handleInputChange("dob", `${y}-${m}-${d}`)
                              }
                              setDobOpen(false)
                            }}
                            disabled={(date) => date > new Date()}
                            defaultMonth={formData.dob ? new Date(formData.dob + "T00:00:00") : new Date(new Date().getFullYear() - 15, 0)}
                            startMonth={new Date(1950, 0)}
                            endMonth={new Date()}
                            className="bg-slate-900 text-white [&_.rdp-day]:text-white [&_.rdp-day_button:hover]:bg-white/20 [&_.rdp-day_button[aria-selected=true]]:bg-cyan-500 [&_.rdp-nav_button]:text-white [&_.rdp-nav_button:hover]:bg-white/20 [&_.rdp-head_cell]:text-white/50 [&_.rdp-caption_label]:text-white [&_select]:bg-slate-800 [&_select]:text-white [&_select]:border-white/20 [&_select]:rounded [&_select]:px-1"
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.dob && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.dob}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        {isMinor() ? "Parent Email Address" : "Email Address"} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={isMinor() ? "parent@email.com" : "your@email.com"}
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {isMinor() && (
                        <p className="text-xs text-cyan-300/80">
                          Since you are under 18, please provide your parent or guardian's email address.
                        </p>
                      )}
                      {errors.email && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {isMinor() && (
                      <div className="space-y-2 animate-fade-in">
                        <Label htmlFor="parentName" className="text-white">Parent / Guardian Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="parentName"
                          type="text"
                          placeholder="Enter parent or guardian's full name"
                          value={formData.parentName}
                          onChange={(e) => handleInputChange("parentName", e.target.value)}
                          required
                          className={`h-11 border-white/30 bg-white/20 text-white placeholder:text-white/60 ${
                            errors.parentName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.parentName && (
                          <p className="text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.parentName}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-white">Country <span className="text-red-500">*</span></Label>
                        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                          <PopoverTrigger asChild>
                            <button
                              id="country"
                              type="button"
                              aria-label="Select your country"
                              className={`h-11 w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm border-white/30 bg-white/20 text-white ${!formData.country ? "text-white/60" : ""} ${errors.country ? "border-red-500" : ""}`}
                            >
                              <span className={formData.country ? "text-white" : "text-white/60"}>
                                {formData.country || "Select your country"}
                              </span>
                              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 text-white" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search country..." />
                              <CommandList className="max-h-60">
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {worldCountries
                                    .map((c) => c.name.common)
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((name) => (
                                      <CommandItem
                                        key={name}
                                        value={name}
                                        onSelect={(val) => {
                                          handleInputChange("country", val === formData.country ? "" : val)
                                          setCountryOpen(false)
                                        }}
                                      >
                                        <Check className={`mr-2 h-4 w-4 ${formData.country === name ? "opacity-100" : "opacity-0"}`} />
                                        {name}
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
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

                    {/* GDPR Consent - Mandatory */}
                    <div className="space-y-2">
                      <div className={`flex items-start gap-3 p-4 rounded-lg border ${errors.dataProcessingConsent ? "border-red-500" : "border-white/10"}`}>
                        <Checkbox
                          id="dataProcessingConsent"
                          checked={formData.dataProcessingConsent}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({ ...prev, dataProcessingConsent: checked === true }))
                            if (errors.dataProcessingConsent) {
                              setErrors((prev) => {
                                const newErrors = { ...prev }
                                delete newErrors.dataProcessingConsent
                                return newErrors
                              })
                            }
                          }}
                          className="mt-0.5 shrink-0 border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-purple-900"
                        />
                        <label htmlFor="dataProcessingConsent" className="text-sm font-normal cursor-pointer leading-relaxed text-white">
                          I consent to Square 1 Ai collecting and processing my personal data as described in the{" "}
                          <Link href="/privacy-policy" target="_blank" className="text-cyan-300 hover:text-cyan-200 underline">Privacy Policy</Link>
                          {" "}and{" "}
                          <Link href="/terms-of-use" target="_blank" className="text-cyan-300 hover:text-cyan-200 underline">Terms of Use</Link>
                          . <span className="text-red-400">*</span>
                        </label>
                      </div>
                      {errors.dataProcessingConsent && (
                        <p className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.dataProcessingConsent}
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
                      <Label className="text-white">Do you prefer: <span className="text-white/60">(Optional)</span></Label>
                      <RadioGroup
                        value={formData.learningPreference}
                        onValueChange={(value) => handleInputChange("learningPreference", value)}
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
                      <Label className="text-white">Why are you interested in joining Square 1 Ai? <span className="text-white/60">(Optional)</span></Label>
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
                        Invite your friends! Get up to 20% off on first course.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-6">
                        <Sparkles className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      You're All Set!
                    </h3>
                    <p className="text-white/80 mb-8">
                      Thank you for joining the Square 1 Ai student waitlist. You'll receive early access updates and
                      exclusive beta invites soon. Keep an eye on your inbox!
                    </p>
                  </div>

                  {/* Newsletter Consent - Optional */}
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-white/10">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({ ...prev, newsletter: checked === true }))
                      }}
                      className="mt-0.5 shrink-0 border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-purple-900"
                    />
                    <label htmlFor="newsletter" className="text-sm font-normal cursor-pointer leading-relaxed text-white">
                      I agree to receive updates from Square 1 Ai. View our{" "}
                      <Link href="/privacy-policy" target="_blank" className="text-cyan-300 hover:text-cyan-200 underline">Privacy Policy</Link>
                      . <span className="text-white/60">(Optional)</span>
                    </label>
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
                    disabled={isCheckingEmail}
                    className="flex items-center gap-2 ml-auto border-white/30 bg-white/10 text-white hover:bg-white hover:text-blue-900 transition-colors disabled:opacity-50"
                  >
                    {isCheckingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        {step === 2 ? 'Submit' : 'Next'}
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}

                {step === totalSteps && (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
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
